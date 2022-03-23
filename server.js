if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express =require('express')
const mongoose=require('mongoose')
const Article = require('./models/article')
const articleRouter= require('./routes/article')
const methodOverride =require('method-override')
var path = require('path');
const app=express()
const bcrypt = require('bcrypt')
const passport= require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport =require('./passport-config')


// initializePassport(passport,
//      email=> users.find(user=> user.email=== email)
// )
const users= []
mongoose.connect('mongodb://localhost/landing', {useNewUrlParser: true,useUnifiedTopology: true })
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
// app.use(flash())
// app.use(session({
//    secret: process.env.SESSION_SECRET,
//    resave: false,
// }))
app.use(methodOverride('_method'))

app.get('/', async (req, res)=>{
    const articles= await Article.find().sort()
    res.render('articles/index',{articles: articles})
})
app.get('/login',(req, res)=>{
    res.render('login')
})
app.post('/login', (req, res)=>{
    
})
app.get('/register',(req, res)=>{
    res.render('register')
})
app.post('/register', async(req, res)=>{
    try{
       const hashedPassword= await bcrypt.hash(req.body.password, 10)
       users.push({
           id: Date.now().toString(),
           name: req.body.name,
           email: req.body.email,
           password: hashedPassword
       })
       res.redirect('/login')
    }catch{
        res.redirect('/register')

    }

})
app.use('/articles',articleRouter)

app.listen(5000)