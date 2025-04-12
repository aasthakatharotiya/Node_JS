const schema = require("../model/categorySchema")
const fs = require("fs")
const path = require("path")

module.exports.addCategory = async (req, res) => {
    req.body.img = req.file.filename
    await schema.create(req.body)
        .then(() => {
            res.status(200).json({ msg: "Data Added Successfully!" })
        })
}

module.exports.viewCategory = async (req, res) => {
    await schema.find({})
        .then((data) => {
            res.status(200).json({ data })
        })
}

module.exports.deleteCategory = async (req, res) => {
    const singleData = await schema.findById(req.query.id)

    const imagePath = path.join(__dirname, "../uploads", singleData.img)
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
    }

    await schema.findByIdAndDelete(req.query.id)
        .then(() => {
            res.status(200).json({ msg: "Category Deleted Successfully" })
        })
}

module.exports.updateCategory = async (req, res) => {
    const singleData = await schema.findById(req.body.id)
    let image = singleData.img

    if (req.file) {
        const oldImagePath = path.join(__dirname, "../uploads", singleData.img)

        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
        }

        image = req.file.filename
    }

    req.body.img = image


    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then(() => {
            res.status(200).json({ msg: "Category Updated Successfully" })
        })
}
