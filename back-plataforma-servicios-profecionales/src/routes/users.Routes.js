const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");
const formProfessionals = require("../middlewares/formProfessionals")
const multer = require("multer")
const path = require("path");
const userMiddleware = require("../middlewares/userMiddleware")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.post("/register", usersControllers.register);
router.post("/login", usersControllers.login);
router.post("/registerProfessionals", upload.array("files"), formProfessionals, usersControllers.registerProfessionals);
router.put("/edit", userMiddleware, usersControllers.editUser);
router.get("/professionals",usersControllers.getTotalProfessionals)
router.get("/professionals/:id",usersControllers.getProfessionalId)


module.exports = router