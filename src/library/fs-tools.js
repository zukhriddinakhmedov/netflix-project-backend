import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const mediasJsonPath = join(dataFolderPath, "medias.json")

export const readMedias = () => readJSON(mediasJsonPath)
export const writeMedia = medias => writeJSON(mediasJsonPath, medias)