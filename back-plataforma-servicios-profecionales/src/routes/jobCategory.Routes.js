const {Router} = require("express");
const router = Router();
const jobCategoryControllers = require("../controllers/jobCategory");
const adminMiddleware = require("../middlewares/adminMiddleware");


router.post("/uploadCategory", adminMiddleware,jobCategoryControllers.uploadJobCategory);
router.get("/getCategory",jobCategoryControllers.getJobCategory);
router.delete("/deleteCategory", adminMiddleware, jobCategoryControllers.deleteCategory)
module.exports = router