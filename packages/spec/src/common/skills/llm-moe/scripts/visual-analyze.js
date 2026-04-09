import { parseArgs } from 'util';
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const options = {
  image: { type: 'string' },
  prompt: { type: 'string', default: 'Identify any UI bugs, visual overlaps, missing images, or cut-off text in this screenshot. Return a concise analysis.' },
};

const args = parseArgs({ args: process.argv.slice(2), options }).values;

if (!args.image || !fs.existsSync(args.image)) {
  console.error("Error: --image path is required and must exist.");
  process.exit(1);
}

// Ensure the API key is set
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error(JSON.stringify({
    success: false,
    error: "GEMINI_API_KEY environment variable is missing."
  }));
  process.exit(1);
}

async function analyze() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.VISUAL_MODEL || "gemma-4-31b-it";
    const model = genAI.getGenerativeModel({ model: modelName });

    const imageBytes = fs.readFileSync(args.image).toString("base64");
    
    // Validate image format based on extension (simple approximation)
    const ext = args.image.split('.').pop().toLowerCase();
    const mimeType = ext === 'png' ? 'image/png' : (ext === 'webp' ? 'image/webp' : 'image/jpeg');

    const result = await model.generateContent([
      { text: args.prompt },
      {
        inlineData: {
          data: imageBytes,
          mimeType: mimeType
        }
      }
    ]);

    const analysisText = result.response.text();
    
    console.log(JSON.stringify({
      success: true,
      file: args.image,
      analysis: analysisText
    }, null, 2));

  } catch (error) {
    console.error(JSON.stringify({
      success: false,
      file: args.image,
      error: error.message
    }, null, 2));
    process.exit(1);
  }
}

analyze();
