import express from 'express'
import cors from 'cors'
import env from 'dotenv'
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY
app.use(cors({ // Replace with your front-end domain
  methods: 'GET,POST', // Add the HTTP methods you're using
}));

app.post('/completions', async (req,res) =>{
    const options = {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user", content: req.body.message}],
            max_tokens:100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    }
    catch (error){
        console.error(error)
    }
})
app.listen("8000", () => console.log('Your server is running on PORT 8000'))
