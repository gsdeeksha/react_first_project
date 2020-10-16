const express = require('express')
const bodyParser = require('body-parser')
const app= express()
const port= process.env.port||4000
const cors= require('cors')
const routes = require('./route/note.route')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
 app.use(cors());


const Dbconf = require('./config/database.config')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || Dbconf.url, {useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
console.log('connected to db successfully')
})
.catch(()=>{
    console.log('unable to connect to db ')    
})
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

}
app.use('/notes',routes)
app.listen(port, ()=>{console.log('listening on '+port)})