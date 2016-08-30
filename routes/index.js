
var fs = require('fs'),
    url = require('url'),
    express = require('express'),
    pth = require("path"),
    router = express.Router();

router.get('/*', function(req, res, next) {

  var absPath, reqPath, path, stat, vData, enums;

  // Building read path
  absPath = '/tmp';
  reqPath = url.parse(req.url).pathname.replace(new RegExp(/%20/gi), ' ');
  path = absPath + reqPath;
  stat = fs.statSync(path);

  // Is directory
  if(stat.isDirectory()) {

      // Init view data
      vData = {};
      vData.items = new Array;
      vData.current = path;
      vData.absPath = absPath;
      vData.prev = '';
      for(var i = 0; i < reqPath.split('/').length - (reqPath.charAt(reqPath.length - 1) == '/' ? 2 : 1); i++)
        vData.prev +=  reqPath.split('/')[i] + '/'

      // Listing items in path
      fs.readdir(path, function(err, items){

        // Error ?
        if(err) {
          res.redirect('/landing/500');
          return;
        }

        // Log open event
        // TODO:..

        // Items list
        items.map(function(item){
          return {
            name: item,
            path: pth.join(reqPath, item).replace(new RegExp(/%20/gi), ' '),
            dir: fs.statSync(pth.join(path, item).replace(new RegExp(/%20/gi), ' ')).isDirectory()
          }
        }).forEach(function(item){
            vData.items.push(item);
        });

        // Rendering view
        res.render('index', vData);

      });
  }

  // Is file
  else if(stat.isFile()) {

    // Log download event
    // TODO:..

    res.setHeader('Content-disposition', 'attachment; filename=' + path.split('/')[path.split('/').length - 1]);
    fs.createReadStream(path).pipe(res);
  }

  // Path not found
  else {
    res.redirect('/landing/404');
  }
});

module.exports = router;
