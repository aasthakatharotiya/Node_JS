const adminSchema = require("../model/firstSchema")

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.userLogin = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email })
    if (admin) {
        if (admin.password == req.body.password) {
            res.cookie("adminData", admin)
            res.redirect("/dashboard")
        }
        else {
            res.redirect("/")
        }
    }
    else {
        res.redirect("/")
    }
}
module.exports.logout = (req, res) => {
    res.clearCookie("adminData")
    res.redirect("/")
}

module.exports.dashboard = (req, res) => {
    req.cookies.adminData ? res.render("dashboard") : res.redirect("/")
}


module.exports.addAdmin = (req, res) => {
    req.cookies.adminData
        ? res.render("addAdmin", { data: null, isEdit: false })
        : res.redirect("/")
        
    // req.cookies.adminData ? res.render("addAdmin") : res.redirect("/")
}
module.exports.addAdminData = async (req, res) => {
    await adminSchema.create(req.body)
        .then((data) => {
            res.redirect("/addAdmin")
        })
}


module.exports.viewAdmin = async (req, res) => {
    if (req.cookies.adminData) {
        await adminSchema.find({})
            .then((data) => {
                res.render("viewAdmin", { data })
            })
    }
    else {
        res.redirect("/")
    }
}


module.exports.editAdminData = async (req, res) => {
    let data = await adminSchema.findById(req.query.id)
    req.cookies.adminData
        ? res.render("addAdmin", { data, isEdit: true })
        : res.redirect("/")

    // let data = await adminSchema.findById(req.query.id)
    // res.render("addAdmin", { data, isEdit: true })
}

module.exports.updateAdminData = async (req, res) => {
    await adminSchema.findByIdAndUpdate(req.body.id, req.body)
        .then((data) => {
            res.redirect("/viewAdmin")
        })
}

module.exports.deleteAdminData = async (req, res) => {
    await adminSchema.findByIdAndDelete(req.query.id)
        .then((data) => {
            res.redirect("/viewAdmin")
        })
}