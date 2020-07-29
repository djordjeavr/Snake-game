var express =require('express');
var app =express();
const path = require('path');
var port =process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/dist/index.html'));

})
app.listen(port);
