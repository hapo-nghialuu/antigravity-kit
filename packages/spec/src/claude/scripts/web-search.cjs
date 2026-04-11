#!/usr/bin/env node
/**
 * Web Search via Gemini API + Google Search Grounding
 * Fallback search tool for models without native WebSearch capability.
 *
 * Usage:
 *   node web-search.cjs "your search query here"
 *   node web-search.cjs --multi "query1" "query2" "query3"
 *
 * Requires: GEMINI_API_KEY in .claude/.env or environment
 *
 * Output: JSON-structured search results with sources and citations.
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// ---------------------------------------------------------------------------
// ENV Resolution: .claude/.env → process.env
// ---------------------------------------------------------------------------
function resolveApiKey() {
  // Priority 1: Already in environment
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;

  // Priority 2: Project-local .claude/.env
  const envPaths = [
    path.join(process.cwd(), '.claude', '.env'),
    path.join(process.cwd(), '..', '.claude', '.env'),
  ];

  for (const envPath of envPaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
        if (match) return match[1].trim().replace(/^["']|["']$/g, '');
      }
    } catch { /* skip */ }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Gemini API Call with Google Search Grounding
// ---------------------------------------------------------------------------
function callGemini(apiKey, query, model) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      contents: [{ parts: [{ text: query }] }],
      tools: [{ googleSearch: {} }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 4096,
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(`Gemini API Error: ${json.error.message}`));
            return;
          }
          resolve(json);
        } catch (e) {
          reject(new Error(`Failed to parse Gemini response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Parse Grounding Metadata → Structured Output
// ---------------------------------------------------------------------------
function parseResponse(geminiResponse, query) {
  const candidate = geminiResponse.candidates?.[0];
  if (!candidate) return { query, error: 'No candidates returned' };

  const text = candidate.content?.parts?.map(p => p.text).join('\n') || '';
  const meta = candidate.groundingMetadata || {};

  // Extract source URLs from groundingChunks
  const sources = (meta.groundingChunks || []).map(chunk => ({
    title: chunk.web?.title || 'Unknown',
    url: chunk.web?.uri || '',
  }));

  // Extract search queries used by the model
  const searchQueries = meta.webSearchQueries || [];

  return {
    query,
    answer: text,
    searchQueriesUsed: searchQueries,
    sources,
    sourceCount: sources.length,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const isMulti = args[0] === '--multi';
  const queries = isMulti ? args.slice(1) : [args.join(' ')];

  if (queries.length === 0 || (queries.length === 1 && !queries[0])) {
    console.error(JSON.stringify({
      error: 'Usage: node web-search.cjs "your query" | node web-search.cjs --multi "q1" "q2"'
    }));
    process.exit(1);
  }

  const apiKey = resolveApiKey();
  if (!apiKey) {
    console.error(JSON.stringify({
      error: 'GEMINI_API_KEY not found. Set it in .claude/.env or environment variable.'
    }));
    process.exit(1);
  }

  // Use model from env or default to gemini-2.5-flash
  const model = process.env.SEARCH_MODEL || 'gemini-2.5-flash';

  const results = [];

  for (const query of queries) {
    try {
      const raw = await callGemini(apiKey, query, model);
      results.push(parseResponse(raw, query));
    } catch (err) {
      results.push({ query, error: err.message });
    }
  }

  // Output as JSON for agent consumption
  const output = isMulti ? results : results[0];
  console.log(JSON.stringify(output, null, 2));
}

main();
