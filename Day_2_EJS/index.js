const express = require("express")
const port = 1008

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded())

let student = [
    {id: "1", name: "Aastha", subject: "React_JS"},
    {id: "2", name: "Aashi", subject: "Node_JS"},
    {id: "3", name: "Aaisha", subject: "React_JS"}
]

// let student = []

app.get("/", (req, res) => {
    res.render("index", {student})
})

app.post("/addData", (req, res) => {
    console.log(req.body)
    req.body.id = String(student.length + 1)
    // req.body.id = String(Date.now())
    student.push(req.body)
    res.redirect("/")
})

app.get("/editData/:id", (req, res) => {
    let singleData = student.find((item) => item.id == req.params.id)
    res.render("edit", {singleData})
})

app.post("/updateData", (req, res) => {
    student.map((e, i) => {
        if(e.id == req.body.id){
            (e.id = req.body.id),
            (e.name = req.body.name),
            (e.subject = req.body.subject)
        }
        else{
            e
        }
    })

    res.redirect("/")
})

app.get("/deleteData", (req, res) => {
    console.log(req.query)
    let deleteRecord = student.filter((e) => e.id !== req.query.id) 
    //Query = Pass ID to the URL
    student = deleteRecord
    res.redirect("/")
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + 1008)
})