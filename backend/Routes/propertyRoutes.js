import express from "express"
import { propertyList } from "../Controllers/propertyControler.js"

const propertyRouter = express.Router()

propertyRouter.get('/list', propertyList)


export default propertyRouter