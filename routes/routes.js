const Router = require("express")
const router = new Router()
const productRouter = require("./productRouter.js")
const catalogRouter = require("./catalogRouter.js")

router.use("/products", productRouter)
router.use("/catalog", catalogRouter)

module.exports = router