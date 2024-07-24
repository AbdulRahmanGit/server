import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post('/', async (req, res) => {
    const prompt = req.body.message;
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        
        res.send({ message: text });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong!' });
    }
});

app.listen("8000", () => console.log('Your server is running on PORT 8000'));
