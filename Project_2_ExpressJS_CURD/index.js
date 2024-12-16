const express = require("express")
const port = 2008

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded())

let Book = [
    {
        id: "1", price: "22.00", quantity: "1", category: "fiction",
        img: "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book5-copyright.jpg",
        name: "Long Road to Deep Silence", 
        author: "Richard Mann", 
        rate: "4", date: "August 1, 2017",
        pdf: "https://www.scribd.com/document/465460020/The-Long-Road-pdf"
    },
    {
        id: "2",  price: "20.00", quantity: "1", category: "fiction",
        img: "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book13-copyright.jpg",
        name: "Wildflower", 
        author: "Drew Berrymore",
        rate: "3", date: "September 12, 2022",
        pdf: "https://www.scribd.com/document/3324970/Wild-Flower"
    },
    {
        id: "3",  price: "25.00", quantity: "1", category: "fiction",
        img: "https://www.gutenberg.org/cache/epub/74904/images/coversmall.jpg",
        name: "A real Cinderella", 
        author: "Nina Rhoades",
        rate: "5", date: "December 15, 2024",
        pdf: "https://www.gutenberg.org/cache/epub/74904/pg74904-images.html"
    },

    {
        id: "4",  price: "15.98", quantity: "1", category: "children",
        img: "https://m.media-amazon.com/images/I/710gWG5nHzL._SY466_.jpg",
        name: "Littel Puppy", 
        author: "Michael Wong",
        rate: "4", date: "September 13, 2016",
        pdf: "https://www.amazon.in/dp/B0DL76QN6L?tag=cuelinkss26560-21&geniuslink=true&asin=B0DL76QN6L&revisionId=&format=4&depth=1"
    },

    {
        id: "5",  price: "20.22", quantity: "1", category: "thriller",
        img: "https://manybooks.net/sites/default/files/styles/220x330sc/public/2024-06/91l6RAz9eyL._SL1500_.jpg?itok=G2DESiVc",
        name: "Reaper Washington County", 
        author: "Steven Banner",
        rate: "5", date: "July 25,2023",
        pdf: "https://manybooks.net/book/397153/read#epubcfi(/6/2[cover-ed047dd1-965a-47cf-9c74-c8fa4e3436d9]!/4/1:0)"
    },

    {
        id: "6",  price: "28.00", quantity: "1", category: "romance",
        img: "https://manybooks.net/sites/default/files/styles/220x330sc/public/2024-10/81vHxrusMQL._SL1500_.jpg?itok=CC7Bs13m",
        name: "Luck and Love", 
        author: "Jody Gorran",
        rate: "3", date: "September 17, 2024",
        pdf: "https://manybooks.net/book/397804/read"
    },
]

let Cart = []

app.get ("/", (req, res) => {
    res.render("index", { Book, Cart })
})

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date)
}

app.post("/bookAdd", (req, res) => {
    // console.log(req.body)
    req.body.id = String(Book.length + 1)
    req.body.date = formatDate(req.body.date)
    Book.push(req.body)
    res.redirect("/")
})

const formatDateForInput = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

app.get("/bookEdit/:id", (req, res) => {
    let singleData = Book.find((item) => item.id == req.params.id)
    if (singleData) {
        singleData.date = formatDateForInput(singleData.date)
    }
    res.render("edit", {singleData})
})

app.post("/bookUpdate", (req, res) => {
    Book.map((e, i) => {
        if(e.id == req.body.id){
            (e.id = req.body.id),
            (e.img = req.body.img),
            (e.name = req.body.name),
            (e.author = req.body.author),
            (e.price = req.body.price),
            (e.date = formatDate(req.body.date)),
            (e.rate = req.body.rate)
        }
        else{
            e
        }
    })

    res.redirect("/")
})

app.get("/bookDelete", (req, res) => {
    // console.log(req.query)
    let Book_Delete = Book.filter((e) => e.id !== req.query.id)
    Book = Book_Delete
    res.redirect("/")
})


app.post("/cartAdd", (req, res) => {
    // console.log(req.body)
    const exist_book = Cart.find((item) => item.name === req.body.name)
    
    if(exist_book){
        exist_book.quantity = Number(exist_book.quantity || 1) + 1
    }
    else{
        req.body.id = String(Cart.length + 1)
        Cart.push(req.body)
    }

    res.redirect("/")
})

app.post("/cartEdit/:id", (req, res) => {
    const cart_save = Cart.find(item => item.id === req.params.id)
    
    if (cart_save) {
        cart_save.quantity = req.body.quantity
        cart_save.rate = req.body.rate
    }

    res.redirect("/")
})

app.get("/cartDelete", (req, res) => {
    // console.log(req.query)
    let cart_delete = Cart.filter((e) => e.id !== String(req.query.id))
    Cart = cart_delete
    res.redirect("/")
});


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + port)
})