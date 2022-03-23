const mongoose= require('mongoose')
const articleSchema= new mongoose.Schema({
    title:{
        type:  String,
        required: true
    },
    description:{
        type: String
    } 
})
 
module.exports = mongoose.model('Article', articleSchema)