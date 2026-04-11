#!/usr/bin/env node
/**
 * Native Docs Fetcher
 * Aggregates extraction of `llms.txt` patterns from context7.com (Unified logic).
 * Usage: node docs-fetch.js "How to use Next.js App router"
 */

const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Docs-Fetcher' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', () => resolve({ status: 500, data: null }));
  });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('[Docs Fetcher] Error: Explicit query parameter required. (Example: node docs-fetch.js "next.js router")');
    process.exit(1);
  }

  const query = args.join(' ').toLowerCase();

  // Smart Detection (Keyword mapping index)
  const knownLibs = {
    'next.js': 'vercel/next.js',
    'nextjs': 'vercel/next.js',
    'react': 'facebook/react',
    'shadcn': 'shadcn-ui/ui',
    'shadcn/ui': 'shadcn-ui/ui',
    'astro': 'withastro/astro',
    'remix': 'remix-run/remix'
  };

  let targetRepo = '';
  for (const [key, repo] of Object.entries(knownLibs)) {
    if (query.includes(key)) {
      targetRepo = repo;
      break;
    }
  }

  // Heuristic string fallback matching for "docs for abc" sequences
  if (!targetRepo) {
    const fallbackMatch = query.match(/for ([a-z0-9-]+)/);
    if (fallbackMatch) targetRepo = `websites/${fallbackMatch[1]}`;
    else targetRepo = `websites/${query.split(' ')[0]}`; // Fallback primitive string assumption
  }

  const url = `https://context7.com/${targetRepo}/llms.txt`;
  console.log(`[Docs Fetcher] Interrogating Knowledge Archival Node at: ${url}`);

  const fallbackUrl = `https://raw.githubusercontent.com/${targetRepo}/main/README.md`;

  const result = await fetchUrl(url);

  if (result.status === 200 && result.data) {
    console.log('\n--- SUCCESSFUL PAYLOAD EXTRACTED ---');
    // Buffer restriction truncation
    console.log(result.data.substring(0, 3000));
    console.log('\n(Output truncated cleanly to minimize LLM Context Overload)');
  } else {
    console.warn(`[!] Architectural layout llms.txt missing at: ${url}`);
    console.log(`[+] Executing GitHub default branch failover (README.md mapping): ${fallbackUrl}`);
    const fbResult = await fetchUrl(fallbackUrl);
    if (fbResult.status === 200 && fbResult.data) {
      console.log('\n--- PAYLOAD EXTRACTED (README.md) ---');
      console.log(fbResult.data.substring(0, 3000));
    } else {
      console.error('\n[FATAL] Documentation retrieval failure. No corresponding books identified within known databanks. Agent must fall back to utilizing standard WebSearch mapping via DuckDuckGo execution streams!');
      process.exit(1);
    }
  }
}

main();
