import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const mediasJsonPath = join(dataFolderPath, "medias.json")
const mediasFolderPath = join(process.cwd(), "./public/img/media")

export const readMedias = () => readJSON(mediasJsonPath)
export const writeMedia = medias => writeJSON(mediasJsonPath, medias)

export const savePoster = (fileName, contentAsBuffer) => writeFile(join(mediasFolderPath, fileName), contentAsBuffer)