const express = require("express");
const router = express.Router();


const {
    generateObjectiveQuiz,
    generateSubjectiveQuiz
} = require("../controllers/quizController");

const upload = require("../middleware/upload");

router.post("/objective", upload.single("file"), generateObjectiveQuiz);
router.post("/subjective", upload.single("file"), generateSubjectiveQuiz);

module.exports = router;