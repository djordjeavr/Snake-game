var express =require('express');
var app =express();
const path = require('path');
var port =process.env.PORT || 3000;

app.use(express.static('index.html'));
app.get('/',function(req,res){
    res.sendFile(path.join('index.html'));

})
app.listen(port);
