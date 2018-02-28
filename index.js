var http       = require('http');
var formidable = require('formidable');
var dt         = require('./myfirstmodule');
var fs         = require('fs');

const PORT     = process.env.PORT || 5000

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      res.write('oldpath is');
      res.write(oldpath);
      res.end();
      
      //var newpath = '/home/max/nodejs_code/stark-ridge-73380/' + files.filetoupload.name;
      //fs.rename(oldpath, newpath, function (err) {
      //  if (err) throw err;
      //  res.write('File uploaded and moved!');
      //  res.end();
      //});
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(PORT); 
