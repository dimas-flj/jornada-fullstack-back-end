import { Router } from "express";
const router = Router();

/* GET home page. */
router.get("/", (req, res) => {
	res.send(JSON.parse('{"app_name": "Express Generator"}'));
});

export default router;
