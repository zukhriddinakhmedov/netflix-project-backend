import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mediasRouter from "./services/media/index.js"
import { join } from "path"


const server = express()

// ************************** MIDDLEWARES *********************
server.use(cors)
server.use(express.json())


// ****************************ENDPOINTS ***********************
server.use("/media", mediasRouter)




// ***************************** ERROR MIDDLEWARES *******************

const port = process.env.PORT

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log("Server running on port", port)
})