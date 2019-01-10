const app = require('./app');  
const port = 5050;

app.listen(port, function() {  
    console.log('We are live on ' + port, 'lets rock!');
});