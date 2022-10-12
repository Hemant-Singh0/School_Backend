const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");

router.post("/createquestions", quizController.createQuestions);
router.get("/allquestions", quizController.allQuestions);
router.get("/getquestions/:id", quizController.getQuestions);
router.put("/updatequestions/:id", quizController.updateQuestions);
router.delete("/deletequestions/:id", quizController.deleteQuestions);

module.exports = router;
