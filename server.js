const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

  const readwrite = (file,contentType)=> {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch(page){
    case '/' :
      readwrite('index.html', 'text/html')
      break;
    case '/otherpage' :
      readwrite('otherpage.html', 'text/html')
      break;

    case '/otherotherpage' :
      readwrite('otherotherpage.html', 'text/html')
      break;
    case '/api' :
        let flipResults = "type 'flip' in the input box"
        if(params['student']== 'flip'){
          flipResults = Math.random() <= .5 ? 'heads' : 'tails'

        }
        res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
            name: flipResults
           
          }
          res.end(JSON.stringify(objToJson));
        
      break;

    case '/css/style.css':
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
      break;
    case '/js/main.js' :
        readwrite('js/main.js','text/javascript')
      break;
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });

  }


});

server.listen(8000);
