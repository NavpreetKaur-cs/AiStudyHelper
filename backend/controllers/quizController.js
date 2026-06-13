const axios = require('axios');
const { GEMINI_KEY, GEMINI_URL } = require("../config/gemini");
const extractTextFromPDF = require("../utils/pdfExtractor");

const generateObjectiveQuiz = async (req, res) => {
    let text = "";

    if (req.file) {
        text = await extractTextFromPDF(req.file.path);
    } else {
        text = req.body.text;
    }

    const prompt = `
    Create a multiple choice quiz (MCQs) from the following text.

    Rules:
    - 4 options per question
    - Only one correct answer
    - Provide answer key at end

    Text:
    ${text}
    `;

    try {
        const response = await axios.post(
            `${GEMINI_URL}?key=${GEMINI_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        const result = response.data.candidates[0].content.parts[0].text;

        res.json({ type: "objective", quiz: result });

    } catch (err) {
        res.status(500).json({ error: "Objective quiz failed" });
    }
};

const generateSubjectiveQuiz = async (req, res) => {
    let text = "";

    if (req.file) {
        text = await extractTextFromPDF(req.file.path);
    } else {
        text = req.body.text;
    }

    const prompt = `
    Create subjective/theory questions from the following text.

    Rules:
    - Open-ended questions
    - No MCQs
    - Include model answers at end

    Text:
    ${text}
    `;

    try {
        const response = await axios.post(
            `${GEMINI_URL}?key=${GEMINI_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        const result = response.data.candidates[0].content.parts[0].text;

        res.json({ type: "subjective", quiz: result });

    } catch (err) {
        res.status(500).json({ error: "Subjective quiz failed" });
    }
};

module.exports = { generateObjectiveQuiz, generateSubjectiveQuiz };