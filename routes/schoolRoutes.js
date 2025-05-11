import express from "express"
import { addSchool } from "../controllers/schoolCOntrollers.js"

const schoolRouter = express.Router()

schoolRouter.post('/add-school',addSchool)

export default schoolRouter;