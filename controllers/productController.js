const { Product } = require("../model/model")
const path = require("path")
const { google } = require("googleapis")
const fs = require("fs")

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "..", "google-credentials.json"),
    scopes: ["https://www.googleapis.com/auth/drive"]
})

const drive = google.drive({ version: "v3", auth })

class ProductController {
    async create(req, res) {
        try {
            const { name, price, discount, compound, warp, hight, hardness, size, description, catalogId } = req.body
            const files = req.files

            if (!name || !price || !compound || !warp || !hight || !hardness || !size || !description || !catalogId) {
                return res.status(400).json({ message: "Не все поля заполнены" })
            }

            if (description.trim().length < 100) {
                return res.status(406).json({ message: "Описание не может быть меньше чем 100 симолов" })
            }

            // if(!photo) {
            //     return res.status(406).json({ message: "Не все поля заполнены" })
            // }

            const imageUrls = await Promise.all(files.map(async (file) => {
                const response = await drive.files.create({
                    requestBody: {
                        name: file.originalname || path.basename(file.path),
                        mimeType: file.mimetype,
                        parents: ["1ASQFg3_LUo7PplWvwSyNijnSEfqb1WTC"]
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fs.createReadStream(file.path)
                    }
                })
                await drive.permissions.create({
                    fileId: response.data.id,
                    requestBody: {
                        role: "reader",
                        type: "anyone"
                    }
                })

                return `https://drive.google.com/uc?export=view&id=${response.data.id}`
            }))

            const sizeArray = typeof size === "string" ? size.split(",") : Array.isArray(size) ? size : []
            
            const product = await Product.create({img: imageUrls, name, price, discount, compound, warp, hight, hardness, size: sizeArray, description, catalogId })

            files.forEach(file => {
                fs.unlinkSync(file.path)
            });
            
            return res.status(201).json({product, message: "Товар успешно создан"})
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }
}

module.exports = new ProductController()