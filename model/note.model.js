const mongoose = require ('mongoose')

const NoteSchema = mongoose.Schema({
    fname:String,
    lname:String
})

module.exports = mongoose.model('notemodel', NoteSchema)
