const form = document.getElementById("box");
const fileInput = document.querySelector('input[type="file"]');
const textArea = document.querySelector("textarea");
const output = document.querySelector(".output");
const API_KEY = "http://localhost:5000/api/summary";

const formatOutput = (text) => {
    if (!text) return "";

    let html = text
        .split('\n')
        .map(line => {
            line = line.trim();
            if (!line) return '';
            
            line = line.replace(/^[\*\-•]\s/, '');
            
            return `<p>${line}</p>`;
        })
        .join('');

    return html;
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        output.innerHTML = "<p>Generating summary...</p>";

        const formData = new FormData();

        if (fileInput.files.length > 0) {
            formData.append("file", fileInput.files[0]);
        }

        if (textArea.value.trim()) {
            formData.append("text", textArea.value.trim());
        }

        const response = await fetch(
            API_KEY,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        const formatted = formatOutput(data.summary);
        output.innerHTML = formatted;

    } catch (err) {
        console.error(err);
        output.innerHTML = `<p style="color: #d32f2f; padding: 15px; background: #ffebee; border-radius: 8px; border-left: 4px solid #d32f2f;"><strong>Error:</strong> ${err.message}</p>`;
    }
});