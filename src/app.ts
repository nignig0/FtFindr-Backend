import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { SearchRoutes } from "./routes/search";
import { supabase } from "./supabase";
import { authRouter } from "./routes/auth";
import { BookmarkRouter } from "./routes/bookmark";
import { HistoryRouter } from "./routes/history";



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
app.use('/search', SearchRoutes);
app.use('/auth', authRouter);
app.use('/bookmarks', BookmarkRouter);
app.use('/history', HistoryRouter);

app.listen(port, async () => {
    console.log(`Listening on port ${port}. Let's go!`);
});


