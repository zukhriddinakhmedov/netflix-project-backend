import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mediasRouter from "./services/media/index.js"
import { join } from "path"
import { badRequestHandler, unauthorisedErrorHandler, notFoundErrorHandler, internalServerErrorHandler } from "./errorHandlers.js"


const server = express()
    
const publicFolderPath = join(process.cwd(), "/public")
    // ************************** MIDDLEWARES *********************
    server.use(express.static(publicFolderPath))
    server.use(cors())
    server.use(express.json())
    
        // ****************************ENDPOINTS ***********************
    server.use("/media", mediasRouter)
     // ***************************** ERROR MIDDLEWARES *******************
    server.use(badRequestHandler)
    server.use(unauthorisedErrorHandler)
    server.use(notFoundErrorHandler)
    server.use(internalServerErrorHandler)

    const port = process.env.PORT
    
    console.table(listEndpoints(server))
    
    server.listen(port, () => {
        console.log("Server running on port", port)
    })