import {register,login} from "../controllers/authControllers.js"
import express from "express";
const routes =express.Router();
routes.post("/register",register);
routes.post("/login",login);

export default routes;
