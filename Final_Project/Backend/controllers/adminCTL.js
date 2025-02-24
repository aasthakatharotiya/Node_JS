const admin_schema = require("../model/adminSchema")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Admin Register-Login 

module.exports.AdminRegister = async (req, res) => {
    let admin = await admin_schema.findOne({ email: req.body.email })
    if (admin) {
        return res.status(200).json({ msg: "Admin Already Exists !" })
    }

    req.body.img = req.file.filename
    req.body.password = await bcrypt.hash(req.body.password, 10)

    let newAdmin = await admin_schema.create(req.body)
    let token = jwt.sign({ adminData: newAdmin }, "rnw", { expiresIn: "1h" })
    // let token = jwt.sign({ adminData: admin }, "rnw", { expiresIn: "1h" })

    res.status(200).json({
        msg: "Admin Created",
        token,
        admin: {
            id: newAdmin._id,
            name: newAdmin.name,
            img: newAdmin.img,
            email: newAdmin.email,
            number: newAdmin.number,
            city: newAdmin.city,
            gender: newAdmin.gender,
        }
    })
}
module.exports.ViewAdminRegister = async (req, res) => {
    await admin_schema.find({})
        .then((data) => {
            res.status(200).json({ "data": data })
        })
}
module.exports.AdminLogin = async (req, res) => {
    let admin = await admin_schema.findOne({ email: req.body.email })
    if (!admin) {
        return res.status(200).json({ msg: "Admin Not Found !" })
    }

    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({ adminData: admin }, "rnw", { expiresIn: "1h" })
        res.status(200).json({
            msg: "Admin Logged in !",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                img: admin.img,
                email: admin.email,
                number: admin.number,
                city: admin.city,
                gender: admin.gender,
            }
        })
        console.log(token)
    }
    else {
        res.status(200).json({ msg: "Password is Wrong !" })
    }
}
module.exports.ViewAdminUser = async (req, res) => {
    await admin_schema.find({})
        .then((data) => {
            res.status(200).json({ data: data })
        })
}