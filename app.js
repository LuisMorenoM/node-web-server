const express 	= require('express')
const exphbs 	= require('express-handlebars')
const app 		= express()

//lo puedo poner con html -> handlebars. Pero los archivos tendrian que ser .handlebars. Entonces a la hora de pasar el archivo mal
app.engine('html', exphbs({defaultLayout:'base'}))
app.set('view engine', 'html')


//*--- ROUTES ---*
//normal with layout
app.get('/', function(req, res, next) {  
    res.render('hola', {name:'luis'})
})

// a lading page without layout
app.get('/html', function(req, res, next) {  
    res.render('landingSinLayout', {layout:false})
})

// app.use('/', express.static('views'))
//*--- END ROUTES ---*


module.exports = app;  