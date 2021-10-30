import { body } from "express-validator"

export const mediasValidation = [
    body("title").exists().withMessage("Please add a title for the movie"),
    body("year").exists().withMessage("Please add the year of the movie"),
    body("type").exists().withMessage("Please add a type of the movie"),
    body("poster").exists().withMessage("Please add an image for the movie")
]

export const reviewsValidation = [
    body("comment").exists().withMessage("Please add your thoughts"),
    body("rate").exists().withMessage("The maximun star you can give is 5")
]