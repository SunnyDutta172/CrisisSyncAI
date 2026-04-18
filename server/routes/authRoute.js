import {register,login} from "../controllers/authControllers.js"
import express from "express";
import { getMe } from "../controllers/getMe.js";
const routes =express.Router();
routes.post("/register",register);
routes.post("/login",login);
routes.get("/me", getMe);

export default routes;
