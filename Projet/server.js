const http = require("http");
const pug = require("pug");
const HOST = "localhost";
const PORT = 8000;

http.createServer((req,res) => {
   
    routes(res, req)
    
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})

// Routes
const routes = (res, req) => {
    const url = req.url.replace('/', '');
    // if(url === ""){

    // }
}
