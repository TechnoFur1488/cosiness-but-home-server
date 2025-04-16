const Router = require("express")
const router = new Router()

router.post("/")
router.get("/")
router.put("/:id")
router.delete("/:id")

module.exports = router