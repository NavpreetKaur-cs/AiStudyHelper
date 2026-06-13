const dotenv = require('dotenv');
dotenv.config();

const GEMINI_KEY = process.env.GEMINI_KEY;

const GEMINI_URL ="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

module.exports= {
    GEMINI_KEY, GEMINI_URL
};

