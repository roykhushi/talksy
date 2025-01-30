import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile); //protectRoute is the middleware to check if the user is authenticated tot update the profile or not

router.get("/check",protectRoute, checkAuth); //endpt to check if the user is authenticated or not when they've refreshed the page either for profile or sending msgs so the login page wouldnt been shown again nd again


export default router;