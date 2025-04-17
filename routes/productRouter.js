const Router = require("express")
const router = new Router()
const productController = require("../controllers/productController")
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post("/", upload.array("photo", 10), productController.create)
// router.get("/")
// router.put("/:id")
// router.delete("/:id")

module.exports = router