import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

        console.log('Request body:', req.body);

        const result = await model.generateContent([
            { role: "user", content: req.body.message }
        ]);

        console.log('API result:', result);

        res.send(await result.response.text());  // Ensure you await the text() method
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error processing request');
    }
});

app.listen(8000, () => console.log('Your server is running on PORT 8000'));
