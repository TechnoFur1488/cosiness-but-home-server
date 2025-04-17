const Router = require("express")
const router = new Router()
const catalogController = require("../controllers/catalogController")

router.post("/", catalogController.create)
router.get("/", catalogController.getAllCatalog)
router.put("/:id", catalogController.updateCatalog)
router.delete("/:id", catalogController.deleteCatalog)

module.exports = router