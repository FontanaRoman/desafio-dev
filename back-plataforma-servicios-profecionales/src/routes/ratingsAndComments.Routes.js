const {Router} = require("express");
const router = Router();
const ratingsAndCommentsControllers = require("../controllers/ratingsAndComments");
const userMiddleware = require("../middlewares/userMiddleware");

router.post("/newRatingAndComments/:user_id/:professionals_id", userMiddleware,ratingsAndCommentsControllers.newRatingsAndComments);
router.get("getRatingAndComments/:professionals_id");

module.exports = router