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


// creating Schemas 

const itemSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, 'left out name']
    }, 
    
});  


const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

// model for schema

const Item = mongoose.model('Item', itemSchema);
const List = mongoose.model('List', listSchema);

// creating  default items 
async function createItems(){
    const data = await Item.create([
        {
            name: 'cook'
        }, 
        {
            name: 'Bath'
        }
    ]);
    return data;
}




app.get('/', async(req, res)=>{

    let day = date.getDate();
    const defaultItems = await Item.find();
    

    // handling multiple creation of decument on app ran
    if(defaultItems.length === 0){
        createItems();
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

});

app.post('/delete', async (req, res)=>{
    
    const itemToDelete = req.body.checkBox
    // console.log(itemToDelete);
    await Item.findByIdAndDelete(itemToDelete);
    res.redirect('/');
});


// work route

app.get('/:paramName', async(req, res)=>{
   const parsedParam = req.params.paramName

   const list = await List.create({
            name: parsedParam,
            items: []
 });

 console.log(list);

    // res.render('list', {
    //     listTile: 'Work List',
    //     items: [createItems()] 

    // });
});

app.post('/work', (req, res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work', );
});
