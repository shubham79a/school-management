import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';
import schoolRouter from './routes/schoolRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/school",schoolRouter)

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({ db_result: rows[0].result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.get("/",(req,res)=>{
    res.send("Welcome to the server");
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});