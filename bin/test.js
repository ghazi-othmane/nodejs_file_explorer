var fs = require('fs');
var url = require('url');

var absPath, reqPath, path, vData;

// Building read path
absPath = '/tmp/';
reqPath = process.argv[2];
path = absPath + reqPath

// Listings files & dirs in path
fs.readdir(path, function(err, items){

    if(err) {
        console.log(err);
        return;
    }
    // Rendering files & dirs list
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }

});