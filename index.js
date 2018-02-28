var http       = require('http');
var formidable = require('formidable');
var dt         = require('./myfirstmodule');
var fs         = require('fs');

const PORT     = process.env.PORT || 5000

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();

    //form.parse(req, function (err, fields, files) {
    //  var oldpath = files.filetoupload.path;
    //  res.write('oldpath at heroku is ');
    //  res.write(oldpath);
    //  res.end();

        //***** you do not know accessible filesystem at heroku machines *****
        //var newpath = '/home/max/nodejs_code/stark-ridge-73380/' + files.filetoupload.name;
        //fs.rename(oldpath, newpath, function (err) {
        //  if (err) throw err;
        //  res.write('File uploaded and moved!');
        //  res.end();
        //});
      
    //});

    //***** do not get confused these console.log are server-side *****

    form.parse(req)
        .on('field', function(name,field) {
            console.log('Got a field:', name);
            res.write('field name: ' + name);
            res.write('field value: ' + value);
        })
        .on('file', function(name,file) {
            console.log('Got file:', name);
            res.write('file name: ' + name);
            res.write('file value: ' + value);
        })
        .on('error', function(err) {
            console.log('Got error: ');
            console.log(err);
            res.write('got an error check console log');
            res.end();
        })
        .on('end', function() {
            console.log('Got end');
            res.write('done');
            res.end();
        });

  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="text" name="aaa_name" id="aaa_id"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(PORT); 
