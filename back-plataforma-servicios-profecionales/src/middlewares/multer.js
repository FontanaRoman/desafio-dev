const multer = require("multer");
const path = require("path");

const configureMulter = (uploadDestination) => {

    const absoluteRut = `../public/${uploadDestination}`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, absoluteRut));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage: storage });
    return upload;

};

module.exports = configureMulter;