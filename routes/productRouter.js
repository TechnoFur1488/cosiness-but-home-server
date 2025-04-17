const Router = require("express")
const router = new Router()
const productController = require("../controllers/productController")

router.post("/", productController.create)
// router.get("/")
// router.put("/:id")
// router.delete("/:id")

module.exports = router