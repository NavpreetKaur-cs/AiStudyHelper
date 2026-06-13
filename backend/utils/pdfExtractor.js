const fs = require("fs");
const pdfParse = require("pdf-parse").default;

const extractTextFromPDF = async (filePath) => {
    try {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        
        let text = data.text || "";
        text = text.replace(/\f/g, "\n").replace(/\0/g, "");
        text = text.replace(/[ \t]+/g, " ").replace(/\n\n+/g, "\n\n").trim();
        
        return text;
    } catch (err) {
        console.log("PDF ERROR:", err.message);
        return "";
    }
};

module.exports = extractTextFromPDF;