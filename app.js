const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js') //local module


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", 'ejs')

app.use(express.static('public'));
app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

app.get('/', (req, res)=>{

    // let today = new Date();
    // let currentDay = today.getDay();
    // let day = "";

    // switch (currentDay) {
    //     case 0:
    //         day = 'Sunday'; 
    //         break;
    //     case 1:
    //         day = 'Monday'; 
    //          break;
    //      case 2:
    //         day = 'Tuesday'; 
    //         break;
    //     case 3:
    //         day = 'Wednesday'; 
    //         break;
    //      case 4:
    //         day = 'Thursday'; 
    //         break;
    //     case 5:
    //         day = 'Friday';
    //         break;
    //     case 6:
    //         day = 'Saturday';
        
    //     default:
    //         day = 'Invalid input!!';
    //         break;
    // }

    // if (today.getDay() === 6 || today.getDay() === 0) {
    //     day = 'Weekend';
    // }else{
    //     day ='Weekday';
    // } 

    let day = date.getDate();
    
    
    res.render('list', {
        listTile : day,
        items: items

    });

});

app.post('/', (req, res)=>{

    console.log(req.body);
    item = req.body.newItem;

    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect('/work');
    }else{

        items.push(item);
        res.redirect('/');
    }

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