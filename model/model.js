const {DataTypes} = require("sequelize")
const sequelize = require("../db.js")

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: true},
    phone: {type: DataTypes.INTEGER, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"}
})

const Cart = sequelize.define("cart", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Forever = sequelize.define("forever", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const CartProduct = sequelize.define("cart_product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const ForeverProduct = sequelize.define("forever_product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Order = sequelize.define("order", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mail: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    adress: {type: DataTypes.STRING, allowNull: false},
    // phone: {type: DataTypes.INTEGER, allowNull: false},
    delivery: {type: DataTypes.STRING, allowNull: false},
    pay: {type: DataTypes.STRING, allowNull: false}
})

const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: []},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    discount: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
    compound: {type: DataTypes.STRING, allowNull: false},
    warp: {type: DataTypes.STRING, allowNull: false},
    hight: {type: DataTypes.STRING, allowNull: false},
    hardness: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: []},
    decription: {type: DataTypes.TEXT, allowNull: true}
})

const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    grade: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    gradeText: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true}
})

const Catalog = sequelize.define("catalog", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasOne(Forever)
Forever.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Forever.hasMany(ForeverProduct)
ForeverProduct.belongsTo(Forever)

Product.hasOne(ForeverProduct)
ForeverProduct.belongsTo(Product)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Product.hasOne(CartProduct)
CartProduct.belongsTo(Product)

Catalog.hasMany(Product)
Product.belongsTo(Catalog)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Order.hasMany(Product)
Product.belongsTo(Order)

module.exports = {
    User,
    Order,
    Cart,
    Forever,
    CartProduct,
    ForeverProduct,
    Product,
    Rating,
    Catalog
}