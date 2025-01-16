const adminSchema = require("../model/firstSchema")

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.userLogin = async (req, res) => {
    res.redirect("/dashboard")

    // let admin = await adminSchema.findOne({ email: req.body.email })
    // if (admin) {
    //     if (admin.password == req.body.password) {
    //         res.cookie("adminData", admin)
    //         res.redirect("/dashboard")
    //     }
    //     else {
    //         res.redirect("/")
    //     }
    // }
    // else {
    //     res.redirect("/")
    // }
}
module.exports.logout = (req, res) => {
    // res.clearCookie("adminData")
    req.session.destroy()
    res.redirect("/")
}

module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}


module.exports.addAdmin = (req, res) => {
    res.render("addAdmin", { data: null, isEdit: false })

    // req.cookies.adminData ? res.render("addAdmin") : res.redirect("/")
}
module.exports.addAdminData = async (req, res) => {
    await adminSchema.create(req.body)
        .then((data) => {
            res.redirect("/addAdmin")
        })
}


module.exports.viewAdmin = async (req, res) => {
    await adminSchema.find({})
        .then((data) => {
            res.render("viewAdmin", { data })
        })
}


module.exports.editAdminData = async (req, res) => {
    let data = await adminSchema.findById(req.query.id)
    res.render("addAdmin", { data, isEdit: true })

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