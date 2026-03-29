import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5001;


const corsOptions = {
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST", "PUT"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Listening on port ${port}. Let's go!`);
});
