const axios = require('axios');
const { GEMINI_URL, GEMINI_KEY } = require("../config/gemini");
const extractTextFromPDF = require("../utils/pdfExtractor");

const generateSummary = async (req, res) => {
    try {
        let text = "";

        if (req.file) {
            text = await extractTextFromPDF(req.file.path);
        } else {
            text = req.body.text;
        }

        if (!text) {
            return res.status(400).json({
                error: "No text or PDF provided"
            });
        }

        const prompt = `Generate a summary in easy, clean bullet points:\n${text}`;

        const response = await axios.post(
            `${GEMINI_URL}?key=${GEMINI_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            }
        );

        const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        res.json({ summary: result });

    } catch (err) {
        console.log(err);
        
        let errorMessage = "Failed to generate summary";
        let statusCode = 500;

        if (err.response?.status === 503) {
            errorMessage = "Gemini API is currently unavailable. Please try again in a few moments.";
            statusCode = 503;
        } else if (err.response?.status === 429) {
            errorMessage = "API rate limit exceeded. Please try again later.";
            statusCode = 429;
        } else if (err.response?.status === 401) {
            errorMessage = "Invalid API key. Please check configuration.";
            statusCode = 401;
        } else if (err.code === 'ECONNREFUSED') {
            errorMessage = "Cannot connect to API. Please check your connection.";
            statusCode = 503;
        }

        res.status(statusCode).json({
            error: errorMessage
        });
    }
};

module.exports = { generateSummary };