import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai'; // KEEP original for v3.2.1

dotenv.config();

const router = express.Router();

// ORIGINAL: For OpenAI v3.2.1
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    
    console.log('Received prompt:', prompt); // DEBUG LOG
    
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // ORIGINAL: For OpenAI v3.2.1
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    console.log('OpenAI response received'); // DEBUG LOG
    
    const image = response.data.data[0].b64_json;
    
    if (!image) {
      console.error('No image data received from OpenAI');
      return res.status(500).json({ message: "No image data received" });
    }

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('DALL-E API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: "Something went wrong",
      error: error.response?.data?.error?.message || error.message 
    });
  }
})

export default router;