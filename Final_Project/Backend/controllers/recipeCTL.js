const schema = require("../model/recipeSchema")
const fs = require("fs")
const path = require("path")

module.exports.addRecipe = async (req, res) => {
    req.body.img = req.file.filename
    await schema.create(req.body)
    .then(() => {
        res.status(200).json({"msg" : "Data Added Successfully !"})
    })
}

module.exports.viewRecipe = async (req, res) => {
    await schema.find({})
    .then((data) => {
        res.status(200).json({"data": data})
    })
}

module.exports.deleteRecipe = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    let imagePath = path.join(__dirname, "../uploads", singleData.img)
    fs.unlinkSync(imagePath)

    await schema.findByIdAndDelete(req.query.id)
    .then(() => {
        res.status(200).json({"msg": "Recipe Deleted Successfully"})
    })
}

module.exports.updateRecipe = async (req, res) => {
    let singleData = await schema.findById(req.body.id)
    let image = singleData.img

    if (req.file) {
        let oldImagePath = path.join(__dirname, "../uploads", singleData.img)

        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
        }

        image = req.file.filename
    }

    req.body.img = image

    await schema.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.status(200).json({"msg": "Recipe Update Successfully"})
    })
}