import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173",
    credentials: true}));

app.get('/', (req, res) => {
    res.send("API is running");
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on address http://localhost:${process.env.PORT}`);
});