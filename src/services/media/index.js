import express from "express"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { mediasValidation } from "./validation.js"
import { reviewsValidation } from "./validation.js"
import { readMedias, writeMedia } from "../../library/fs-tools.js"


const mediasRouter = express.Router()


mediasRouter.post("/", mediasValidation, async (req, res, next) => {
    try {
        const mediaValidation = validationResult(req)

        if (!mediaValidation.isEmpty()) {
            next(createHttpError(400, { mediaValidation }))
        } else {
            const newMedia = { ...req.body, createdAt: new Date(), imdbID: uniqid() }
            const media = await readMedias()

            media.push(newMedia)

            await writeMedia(media)
            res.status(201).send({ imdbID: newPost.imdbID })
        }
    } catch (error) {
        next(error)
    }
})
mediasRouter.get("/", async (req, res, next) => {
    try {
        const media = await readMedias()

        res.send(media)
    } catch (error) {
        next(error)
    }

})

mediasRouter.get("/:id", async (req, res, next) => {
    try {

    } catch (error) {

    }
})
mediasRouter.put("/:id", async (req, res, next) => {
    try {

    } catch (error) {

    }
})
mediasRouter.delete("/:id", async (req, res, next) => {
    try {

    } catch (error) {

    }
})

export default mediasRouter