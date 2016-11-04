const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

app.set('view engine','hbs');
//midleware logger
app.use((req,res,next)=> {
    var now = new Date().toString().slice(0,24);
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n',(err)=>{
        if(err) {
            console.log('Unable to append to file');
        }
    });
   next();
});

//midleware  without next() zatrzymuje aplikacje
// app.use((req, res)=> {
//   res.render('maintenance.hbs'); 
// });

app.use(express.static(__dirname+ '/public'));


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=> {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});
// app.get('/',(req,res)=> {
//     // res.send('<h1>Hello Express</h1>');
//     res.send({
//         name: 'mariusz',
//         likes: [
//             'biking',
//             'codingg'
//             ]
//     });
// });

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About page'
        });
});
app.get('/',(req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Our home page',
        welcomeMessage: 'Welcome to our page'
       
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

var port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('Server running on '+ port);
});







