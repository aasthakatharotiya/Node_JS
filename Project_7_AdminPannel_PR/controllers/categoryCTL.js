const schema = require("../model/firstSchema")
const catSchema = require("../model/catSchema")

module.exports.addCategory = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("addCategory", { viewUser, viewCategory })
}

module.exports.addCatData = async (req, res) => {
    req.body.img = req.file.path
    await catSchema.create(req.body)
        .then(() => {
            res.redirect("/category/addCategory")
        })
}