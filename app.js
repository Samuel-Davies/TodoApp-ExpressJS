const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js') //local module
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todolistDB');


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", 'ejs')

app.use(express.static('public'));
app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

// storing data with mongoose

const itemsSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, 'left out name']
    }, 
    
});  

// model for schema

const Item = mongoose.model('Item', itemsSchema);




app.get('/', async(req, res)=>{

    let day = date.getDate();
    const defaultItems = await Item.find();

    // handling multiple creation of decument on app ran
    if(defaultItems.length === 0){
        await Item.create([
            {
                name: 'cook'
            }, 
            {
                name: 'Bath'
            }
        ]);
        res.redirect('/');
    }else{
        res.render('list', {
            listTile : day,
            items: defaultItems
    
        });
    }
   
    
    
  

});

app.post('/', async (req, res)=>{

    // getting parsed data 
    const itemName = req.body.newItem;

    // Putting the parsed data into collection
    await Item.create({
        name: itemName
    })

    res.redirect('/');

    // if(req.body.list === 'Work'){
    //     workItems.push(item);
    //     res.redirect('/work');
    // }else{

    //     items.push(item);
    //     res.redirect('/');
    // }

});


app.get('/work', (req, res)=>{
    res.render('list', {
        listTile: 'Work List',
        items: workItems,
        

    });
});

app.post('/work', (req, res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work', );
});

// app.request('/work')
//     .get((req,res) => {})
//     .post