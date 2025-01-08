const schema = require("../Model/firstSchema")
const fs = require("fs")

module.exports.firstPage = async (req, res) => {
    let data = await schema.find({})
    res.render("index", { data })
}

module.exports.addData = async (req, res) => {
    req.body.img = req.file.path
    await schema.create(req.body)
    .then((data) => {
        res.redirect("/")
    })
}

module.exports.editData = async (req, res) => {
    let data = await schema.findById(req.query.id)
    res.render("edit", { data })
}

module.exports.updateData = async(req, res) => {
    let image = ""
    let singleData = await schema.findById(req.body.id)
    req.file ? (image = req.file.path) : (image = singleData.img)
    req.file && fs.unlinkSync(singleData.img)

    req.body.img = image

    await schema.findByIdAndUpdate(req.body.id, req.body)
    .then((data) => {
        res.redirect("/")
    })
}

module.exports.deleteData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData.img)
    await schema.findByIdAndDelete(req.query.id)
    .then((data) => {
        res.redirect("/")
    })
}

module.exports.posterData = async (req, res) => {
    let data = await schema.findById(req.query.id)
    res.render("poster", { data })
}

module.exports.ticketData = async (req, res) => {
    let data = await schema.findById(req.query.id)
    res.render("Ticket", { data })
}