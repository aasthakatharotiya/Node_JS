const http = require("http")
const port = 1008

const serverHandler = (req, res) => {
    res.write("<h1>Server Started</h1>")
    res.end()
}

const server = http.createServer(serverHandler)

server.listen(port, (err) => {
    err ? console.log(err)
    : console.log("Server Started : " + port)
})