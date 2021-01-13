var http = require('http'),
    fs = require('fs');
    const port = process.env.port || 3000;
    const hostname = '0.0.0.0'


fs.readFile('TherapistHome.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });

});