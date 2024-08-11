import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post('/', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Correct the request structure as per the API's requirement
        const result = await model.generateContent({
            prompt: req.body.message, // Adjusted the field to match API expectations
        });
        console.log(result)
        res.send(result.response.text());
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

app.listen("8000", () => console.log('Your server is running on PORT 8000'));
