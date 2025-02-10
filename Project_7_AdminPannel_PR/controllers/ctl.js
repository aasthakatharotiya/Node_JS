const schema = require("../model/firstSchema")
const catSchema = require("../model/catSchema")
const mailer = require("../middleware/mailer")
const fs = require("fs")

module.exports.login = (req, res) => {
    res.render("login")
}

module.exports.userLogin = (req, res) => {
    req.flash("success", "Login Successfully !")
    res.redirect("/dashboard")
}

module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}

module.exports.profile = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("profile", { viewUser, viewCategory })
}

module.exports.dashboard = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("dashboard", { viewUser, viewCategory })
}

module.exports.documentation = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("documentation", { viewUser, viewCategory })
}

module.exports.collection = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("collection", { viewUser, viewCategory })
}

module.exports.about = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("about", { viewUser, viewCategory })
}

module.exports.contact = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("contact", { viewUser, viewCategory })
}

module.exports.chart = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("chart", { viewUser, viewCategory })
}

module.exports.addUser = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    res.render("addUser", { viewUser, viewCategory })
}

module.exports.addUserData = async (req, res) => {
    req.body.img = req.file.path
    await schema.create(req.body)
        .then(() => {
            res.redirect("/addUser")
        })
}

module.exports.editUserData = async (req, res) => {
    let viewUser = await schema.find({})
    let viewCategory = await catSchema.find({})
    let data = await schema.findById(req.query.id)
    res.render("editUser", { viewUser, viewCategory, data })
}

module.exports.updateUserData = async (req, res) => {
    let image = ""

    let singleData = await schema.findById(req.body.id)
    req.file ? (image = req.file.path) : (image = singleData.img)
    req.file && fs.unlinkSync(singleData.img)

    req.body.img = image

    await schema.findByIdAndUpdate(req.body.id, req.body)
    .then((data) => {
        res.redirect("/profile")
    })
}

module.exports.recoverPass = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    if (!admin) {
        return res.redirect("/")
    }

    let otp = Math.floor(Math.random() * 100000 + 900000)
    mailer.sendOtp(req.body.email, otp)

    req.session.otp = otp
    req.session.adminData = admin

    res.render("verifyPass")
}

module.exports.verifyPass = async (req, res) => {
    let otp = req.session.otp
    let admin = req.session.adminData

    if (req.body.otp == otp) {
        if (req.body.newPass == req.body.confirmPass) {
            let adminData = await schema.findByIdAndUpdate(admin._id, {
                password: req.body.newPass
            })

            adminData && res.redirect("/logout")
        }
        else {
            console.log("New Password and Confirm Password Must Be Same...")
        }
    }
    else {
        res.redirect("/")
    }
}

module.exports.changePass = (req, res) => {
    res.render("changePass")
}

module.exports.changePassword = async (req, res) => {
    let user = req.user
    if(user.password == req.body.oldPass){
        if(req.body.oldPass != req.body.newPass){
            if(req.body.newPass == req.body.confirmPass){
                let admin = await schema.findByIdAndUpdate(user.id, { password: req.body.newPass })
                admin && res.redirect("/logout")
            }
            else{
                console.log("New Password and Confirm Password Must Be Same...")
            }
        }
        else{
            console.log("Old Password and New Password Must be Different...")
        }
    }
    else{
        console.log("Old Password is Wrong...")
    }
}