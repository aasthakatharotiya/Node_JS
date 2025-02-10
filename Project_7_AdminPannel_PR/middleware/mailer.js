const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aastha.patel.0801@gmail.com",
        pass: "eshhvlhvsydhirnh"
    }
})

module.exports.sendOtp = (to, otp) => {
    let mailOptions = {
        from: "aastha.patel.0801@gmail.com",
        to: to,
        subject: "Your Password Reset OTP",
        text: `Your OTP is ${otp}`
    }

    transport.sendMail(mailOptions, (err) => {
        err ? console.log(err) : console.log("OTP Sended Successfully...")
    })
}