export const badRequestHandler = (err, req, res, next) => {
    if(err.status === 400) {
        res.status(400).send({message: err.errorList})
    }else{
        next(err)
    }
}
export const unauthorisedErrorHandler = (err, req, res, next) => {
    if(err.status === 401){
        res.status(401).send({message: "Sorry you are not authorised"})
    } else{
        next(err)
    }
}
export const notFoundErrorHandler = (err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).send({message: err.message || "Not found", success: false})
    }else{
        next(err)
    }
}
export const internalServerErrorHandler = (err, req, res, next) => {
    if(err.status === 500) {
        res.status(500).send({message: "Something wrong with the server side"})
    }else{
        next(err)
    }
}