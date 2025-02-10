const schema = require("../model/firstSchema")
const catSchema = require("../model/catSchema")
const productSchema = require("../model/productSchema")

module.exports.addProduct = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("addProduct", { viewUser, viewCategory })
}

module.exports.addProductData = async (req, res) => {
    req.body.img = req.file.path
    await productSchema.create(req.body)
        .then(() => {
            res.redirect("/product/addProduct")
        })
}

// module.exports.viewProduct = async (req, res) => {
//     let viewUser = await schema.find({})
//     let viewCategory = await catSchema.find({})
//     let viewProduct = await productSchema.find({})
//     .populate("categoryId")
//         res.render("viewProduct", { viewUser, viewCategory, viewProduct })
// }

module.exports.viewProduct = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    
    let filter = req.query.category ? { categoryId: req.query.category } : {}

    let viewProduct = await productSchema.find(filter).populate("categoryId")

    res.render("viewProduct", { viewUser, viewCategory, viewProduct })
}
