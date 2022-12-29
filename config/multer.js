const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

const carOwnerUpload = multer({ storage: storage }).single("carOwnerImage");
const HirerUpload = multer({ storage: storage }).single("hirerImage");
const CarUpload = multer({ storage: storage }).single("carImage");

module.exports = {
    carOwnerUpload,
    HirerUpload,
    CarUpload
}