const http = require('http');
const path = require('path');
const fs = require('fs');

// Create Server Object
const server = http.createServer((request, response) => {
    /**
    if(request.url === '/'){
        response.write(200, { "Content-Type": "text/html" })
        //             ^ html status code 200 (aka all good)
        response.end("<h1>Hello guys</h1>")
    }*/
    
    /**
    // Accessing home page
    if(request.url === '/'){
        fs.readFile(
            path.join(__dirname, 'public', 'homepage.html'),
            (err, content) => {
                if (err) throw err;
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end(content);
            }
        )
    }
    // Accessing about page
    if(request.url === '/about'){
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
            (err, content) => {
                if (err) throw err;
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end(content);
            }
        )
    }*/
    // -------------------------------------------------------------------------------------------------------------
    // Build the file Path
    let filePath = path.join(
        __dirname,
        'public',
        request.url === '/' ? 'index.html' : request.url
    );
    // ^ if req.url is '/', then load index.html. otherwise, load the provided url
    console.log(filePath);

    // Build the file extension
    let fileExt = path.extname(filePath);

    let contentType = 'text/html';
    // Check extension and set initial content type
    switch(fileExt){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if(err){
            // uh oh theres error
            if(err.code == "ENOENT"){
                //page not found
                fs.readFile(path.join(__dirname, "public", '404.html'), (err, content) => {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.end(content, "utf-8");
                })
            } else{
                response.writeHead(500);
                response.end(`Server Error: ${err.code}`);
            }
        } else{
            //Success
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, "utf-8");
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));