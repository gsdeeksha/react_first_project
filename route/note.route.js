const notes = require('../model/note.model')
const express= require('express')
const router = express.Router()

router.post('/add',(req,res)=>{
    const data={
        fname:"spoori",
        lname:"umesh"
    }
    const data1=req.body

    const newinst = new notes(data1)

    newinst.save()
    .then(()=>{console.log('new record added successfully')})
    .catch(()=>{console.log('unable to add new record' )})
});

router.get('/',(req,res)=>{
    notes.find()
    .then((data)=>{console.log('retrieved records successfully'+ res.json(data))})
    .catch(()=>{console.log('unable to retrieve records' )})
});

router.get('/:noteId',(req,res)=>{
    notes.findById(req.params.noteId)
    .then((data)=>{console.log('retrieved record successfully' +res.send(data))})
    .catch(()=>{console.log('unable to retrieve record' )})
});


router.put('/update/:noteId',(req,res)=>{
    notes.findByIdAndUpdate(req.params.noteId,{ fname : "updated",lname: "updated" })
    .then((data)=>{console.log('updated one record successfully'+data)})
    .catch(()=>{console.log('unable to update record')})
});


router.delete('/delete/:noteId',(req,res)=>{
    notes.findByIdAndDelete(req.params.noteId)
    .then((data)=>{console.log('deleted one record successfully'+data)})
    .catch((data)=>{console.log('couldnot delete record')})
});

router.get('/check',(req,res)=>{
    res.json({"message": "the api is working"});
})

module.exports = router