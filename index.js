var http          = require('http');
var formidable    = require('formidable');
var dt            = require('./myfirstmodule');
var fs            = require('fs');
var rl            = require('readline');
var events        = require('events');
var eventemitter  = new events.EventEmitter();
var myfilename    = "";
var mylines       = [];
const PORT        = process.env.PORT || 5000


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
            res.write('<p>field name: ' + name + '</p>');
            res.write('<p>field: ' + field + '</p>');
        })
        .on('file', function(name,file) {
            console.log('Got file:', name);
            res.write('<p>file name: ' + name + '</p>');
            res.write('<p>file.name: ' + file.name + '</p>');
            res.write('<p>file.path: ' + file.path + '</p>');
            myfilename = file.path;
            mylines = fs.readFileSync(myfilename, 'utf-8').split('\n').filter(Boolean);
            res.write('<p>mylines.length: ' + mylines.length + '</p>');
            for (ii=0; ii < mylines.length; ii++) {
                var trimstr = mylines[ii].trim();
                if (trimstr.length > 0) {
                   res.write('<p>' + ii + ': ' + trimstr + '</p>');
                   var temp = trimstr.split(' ');
                   var cardcount;
                   var cardname = '';
                   for (xx=0; xx < temp.length; xx++) {
                       if (xx==0)
                           cardcount = temp[0];
                       else if (xx==1) {
                           cardname  = temp[1];
                       }
                       else {
                           cardname += ' ';
                           cardname += temp[xx];
                       }
                   }
                   res.write('<p>count=' + cardcount + ' cardname=' + cardname + '</p>');
                }
                else {
                   res.write('<p>' + ii + ': WHITESPACE FORGET IT</p>');
                }
            }

        })
        .on('error', function(err) {
            console.log('Got error: ');
            console.log(err);
            res.write('<p>got an error check console log</p>');
            res.end();
        })
        .on('end', function() {
            console.log('Got end');
            res.write('<p>done</p>');
            res.end();
        });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<label for="filetoupload">filetoupload</label>');
    res.write('<input type="file" name="filetoupload_name" id="filetoupload_id"><br>');
    res.write('<label for="aaa_id">aaa</label>');
    res.write('<input type="text" name="aaa_name" id="aaa_id"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(PORT); 


