import { Router } from "express";
import { postRegistration, postLogin, postLogout, getUserInfo, deleteAccount } from "../controllers/UserController.js";
import { auth } from "../helpers/auth.js";

const router = Router();

// Routes for user registration and login
router.post("/register", postRegistration);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/profile", auth, getUserInfo)
router.delete("/delete/", auth, deleteAccount)


export default router;
