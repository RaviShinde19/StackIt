import { Answer } from "../models/answer.models.js";
import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createAnswer = asyncHandler(async (req,res) => {
    const { content, questionId } = req.body;

    if (!content || !questionId) {
        throw new ApiError(400, "Content and questionId are required");
    }

    const question = await Question.findById(questionId);
    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    const answer = await Answer.create({
        content,
        question: questionId,
        author: req.user._id
    });

    res.status(201).json(new ApiResponse(201, answer, "Answer posted successfully"));
})

export {
    createAnswer
}