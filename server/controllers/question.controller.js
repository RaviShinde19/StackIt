import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createQuestion = asyncHandler(async (req,res) => {
    const { title, description, tags } = req.body;

    if (!title || !description || !Array.isArray(tags) || tags.length === 0) {
    throw new ApiError(400, "All fields (title, description, tags) are required");
    }

    const question = await Question.create({
    title,
    description,
    tags,
    askedBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, question, "Question created successfully"));
})

export {
    createQuestion
}