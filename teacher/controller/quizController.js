const req = require("express/lib/request");
const Question = require("../model/quizControllerModel");

const createQuestions = async (req, res) => {
  try {
    const { description } = req.body;
    const { alternatives } = req.body;

    const user = {
      description,
      alternatives,
    };

    const contact = await Question.create(user);
    res.send({ message: "Questions Added Successfully", data: contact });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: error.message,
    });
  }
};

const allQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.send({ message: "Get  Successfully", data: questions });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: error.message,
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    const _id = req.params.id;
    const question = await (await Question.findOne({ _id }))
      .populate("subjects")
      .execPopulate();
    if (!question) {
      return res.status(404).send({
        message: "Questions not found with this id " + _id,
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: "Get Questions Successfully",
        data: question,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: error.message,
    });
  }
};

const updateQuestions = async (req, res) => {
  try {
    const _id = req.params.id;
    const { description, alternatives } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        description,
        alternatives,
      });
      return res
        .status(201)
        .send({ message: "Questions Added Successfully", data: question });
    } else {
      question.description = description;
      question.alternatives = alternatives;
      await question.save();
      return res.status(200).send({
        status: 200,
        message: "Questions Update Successfully",
        data: question,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: error.message,
    });
  }
};

const deleteQuestions = async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.deleteOne({ _id });

    if (question.deletedCount === 0) {
      return res.status(404).send({
        message: "Questions not found with this id " + _id,
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: "Delete Questions Successfully",
        data: question,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try after some time",
      error: error.message,
    });
  }
};

module.exports = {
  createQuestions,
  allQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions,
};
