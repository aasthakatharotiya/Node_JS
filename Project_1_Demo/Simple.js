const http = require("http")
const port = 2008

// https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif
// https://i.pinimg.com/originals/7c/1d/ab/7c1dab157f34e603487b5d0b057da448.gif

const PortHandler = (req, res) => {
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Document</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                }

                div {
                    height: 100vh;
                    width: 100%;
                    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif");
                    background-size: 100% 140%;
                    background-repeat: no-repeat;
                    background-position: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                @keyframes glow {
                    0% {
                        text-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 20px #4CAF50;
                    }
                    50% {
                        text-shadow: 0 0 20px #FF5722, 0 0 40px #FF5722, 0 0 60px #FF5722;
                    }
                    100% {
                        text-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 20px #4CAF50;
                    }
                }

                h1 {
                    font-family: 'Arial, sans-serif';
                    font-size: 60px;
                    color: white;
                    animation: glow 3s infinite;
                }
                
                button{
                    height: 55px;
                    padding: 0px 20px;
                    background: linear-gradient(45deg, #ff6ec4, #7873f5, #4CAF50);
                    color: white;
                    font-size: 25px;
                    font-weight: bolder;
                    border: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>Welcome To My Page</h1>
                <a href="https://christmas-wheat.vercel.app/" target="_blank">
                    <button>See Web Page</button>
                </a>
            </div>
        </body>
        </html>
    `)
    res.end()
}

const server = http.createServer(PortHandler)

server.listen(port, (err) => {
    err ? console.log(err)
        : console.log("Server Started On Port : " + port)
})