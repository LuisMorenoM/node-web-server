const express 	= require('express')
const exphbs 	= require('express-handlebars')
const app 		= express()

// creating a instance
let hbs = exphbs.create({
	defaultLayout:'base',
	extname: '.html'
})
// changing the engine to .html
app.engine('html', hbs.engine);
app.set('view engine', 'html')

app.use(express.static(__dirname + '/public'))

//*--- ROUTES ---*

//normal with layout
app.get('/', function(req, res, next) {  
    res.render('home', {name:'Ricky'})
})

// a lading page without layout
app.get('/html', function(req, res, next) {  
    res.render('nolayout', {layout:false})
})
//*--- END ROUTES ---*


module.exports = app;  