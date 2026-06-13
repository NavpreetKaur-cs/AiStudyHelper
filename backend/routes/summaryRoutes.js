const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { generateSummary } = require("../controllers/summaryController");

router.post("/", upload.single("file"), generateSummary);

module.exports = router;