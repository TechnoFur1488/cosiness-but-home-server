const { Product } = require("../model/model")

class ProductController {
    async create(req, res) {
        try {
            const { img, name, price, discount, compound, warp, hight, hardness, size, description } = req.body
            // const { img } = req.files

            if (!name || !price || !discount || !compound || !warp || !hight || !hardness || !size || !description || !catalogId) {
                return res.status(400).json({ message: "Не все поля заполнены" })
            }

            if (description.trim().length < 100) {
                return res.status(406).json({ message: "Описание не может быть меньше чем 100 симолов" })
            }
            
            const product = await Product.create({img, name, price, discount, compound, warp, hight, hardness, size, description })
            
            return res.status(200).json({product, message: "Товар успешно создан"})
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }
}

module.exports = new ProductController()