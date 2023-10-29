import express from "express";
import { loginValidationRules, signupValidationRules, validate } from "../middleware/validator";
import { createUser, getAllUsers, login } from "../controllers/user";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
//.
router.post("/signup", signupValidationRules(), validate, async (req:any, res:any) => {
  try {
    const { email, password, userName, displayName, role } = req.body;
    if (!email || !password || !userName || !displayName || !role) {
      return res.status(400).json({ error: "All fields required." });
    }
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/login", loginValidationRules(), validate, (req:any, res:any) => {
  if (req.body.email && req.body.password) {
    login(req.body.email, req.body.password).then((data) => {
      res.status(200).send(data)
    }).catch((error) => {
      res.status(400).send(error)
    })
  } else {
    res.status(404).send("email and password are required")
  }
})
router.get('/', authenticate, (req, res, next) => {
    getAllUsers().then(data => {
      res.status(200).send(data)
    }).catch(error => {
      res.status(404).send(error)
    })
  });
export default router;
