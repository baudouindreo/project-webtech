// Import Node url module
const url = require('url')
const qs = require('querystring')
const fs = require('fs');

module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname 
        const params = qs.parse(route.query)  

    res.writeHead(200, {'Content-Type': 'text/plain'})

    if (path === '/') {
        // Route: /
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<p>Visit <a href="/hello">/hello</a> to use the /hello route.</p>');
        res.end();
    } else if (path === '/hello') {
        // Route: /hello
        res.writeHead(200, {'Content-Type': 'text/plain'});

        if ('name' in params) {
            const name = params['name'];
            if (name.toLowerCase() === 'yourname') {
                res.write('Hello, I am the creator of this application.');
            } else {
                res.write('Hello ' + name);
            }
    
        } else {
            res.write('Hello anonymous');
        }

        res.end();

    } else if (path === '/about') {
        // Route: /about
        const aboutFilePath = path.join(__dirname, 'content', 'about.json');

        // Use fs.readFile to read the content of about.json
        fs.readFile(aboutFilePath, 'utf8', (err, data) => {
            if (err) {
                // Handle error, for example, send a 500 Internal Server Error
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Internal Server Error');
                res.end();
                return;
            }

            // Parse the JSON data
            const aboutData = JSON.parse(data);

            // Respond with JSON content
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(aboutData, null, 2)); // The third argument (2) is for indentation
            res.end();
        });
    
    } else {
        // Route: Not Found
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found');
        res.end();
    }
    
    res.end()
    }
}