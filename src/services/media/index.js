import express from "express"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { mediasValidation } from "./validation.js"
import { reviewsValidation } from "./validation.js"
import { readMedias, writeMedia } from "../../library/fs-tools.js"


const mediasRouter = express.Router()

mediasRouter.get("/", async (req, res, next) => {
    try {
        const media = await readMedias()
     
        res.send(media)
    } catch (error) {
        console.log(error)
        next(error)
    }

})
mediasRouter.post("/", mediasValidation, async (req, res, next) => {
    try {
        const notValidated = validationResult(req)
            
        if (!notValidated.isEmpty()) {
            next(createHttpError(400, { notValidated }))
        } else {
            const newMedia = { ...req.body, createdAt: new Date(), imdbID: uniqid() }
            const medias = await readMedias()
            
            medias.push(newMedia)

            await writeMedia(medias)
            res.status(201).send({ imdbID: newMedia.imdbID })
        }
    } catch (error) {
        next(error)
    }
})

mediasRouter.get("/:imdbID", async (req, res, next) => {
    try {
     const medias = await readMedias()

     const media = medias.find(media=>media.imdbID === req.params.imdbID)
     if(media){
         res.send(media)
     }else{
         next(createHttpError(404), `Media with id of ${req.params.imdbID} is not found`)
     }
    } catch (error) {
        next(error)
    }
})
mediasRouter.put("/:imdbID", async (req, res, next) => {
    try {
const medias = await readMedias()
const index = medias.findIndex(media => media.imdbID === req.params.imdbID)
const mediaToEdit = medias[index]

const updatedParams = req.body
const updatedMedia = {...mediaToEdit, ...updatedParams}

medias[index] = updatedMedia
await writeMedia(medias)
res.send(updatedMedia)
    } catch (error) {
next(error)
    }
})
mediasRouter.delete("/:imdbID", async (req, res, next) => {
    try {
const medias = await readMedias()
const notDeletedMedia = medias.filter(media => media.imdbID !== req.params.imdbID)
await writeMedia(notDeletedMedia)
res.status(204).send()
    } catch (error) {
next(error)
    }
})

export default mediasRouter