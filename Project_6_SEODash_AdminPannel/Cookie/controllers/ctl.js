const schema = require("../model/firstSchema")
const fs = require("fs")

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.userLogin = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })
    if(admin){
        if(admin.password == req.body.password){
            res.cookie("adminData", admin)
            res.redirect("/dashboard")
        }
        else{
            res.redirect("/")
        }
    }
    else{
        res.redirect("/")
    }
}


module.exports.logout = (req, res) => {
    res.clearCookie("adminData")
    res.redirect('/')
}


module.exports.register = (req, res) => {
    req.cookies.adminData 
    ? res.render("register")
    : res.redirect("/")
}
module.exports.userRegister = async (req, res) => {
    req.body.img = `uploads/user.png`
    await schema.create(req.body)
    .then((data) => {
        res.redirect("/dashboard")
    })
}


module.exports.dashboard = (req, res) => {
    req.cookies.adminData 
    ? res.render("dashboard")
    : res.redirect("/")
}


module.exports.addAdmin = (req, res) => {
    req.cookies.adminData
    ? res.render("addAdmin", { data: null, isEdit: false })
    : res.redirect("/")
}
module.exports.viewAdmin = async (req, res) => {
    if(req.cookies.adminData){
        await schema.find({})
        .then((data) => {
            res.render("viewAdmin", { data })
        })
    }
    else{
        res.redirect("/")
    }
}


module.exports.addAdminData = async (req, res) => {
    req.body.img = req.file.path
    await schema.create(req.body)
    .then((data) => {
        res.redirect("/addAdmin")
    })
}
module.exports.editAdminData = async (req, res) => {
    let data = await schema.findById(req.query.id)
    req.cookies.adminData
    ? res.render("addAdmin", { data, isEdit: true })
    : res.redirect("/")
}
module.exports.updateAdminData = async (req, res) => {
    let singleData = await schema.findById(req.body.id)
    
    // let image = ""
    // req.file ? (image = req.file.path) : (image = singleData.img)
    // req.file && fs.unlinkSync(singleData.img)

    let image = req.file ? req.file.path : singleData.img

    if (req.file && singleData.img && fs.existsSync(singleData.img)) {
        fs.unlinkSync(singleData.img)
    }

    req.body.img = image

    await schema.findByIdAndUpdate(req.body.id, req.body)
    .then((data) => {
        res.redirect("/viewAdmin")
    })
}
module.exports.deleteAdminData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData.img)
    await schema.findByIdAndDelete(req.query.id)
    .then((data) => {
        res.redirect("/viewAdmin")
    })
}


module.exports.card = async (req, res) => {
    if(req.cookies.adminData){
        await schema.find({})
        .then((data) => {
            res.render("card", { data })
        })
    }
    else{
        res.redirect("/")
    }
}