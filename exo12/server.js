const http = require("http");
const pug = require("pug");
const HOST = "localhost";
const PORT = 8000;
const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false },
];

http.createServer((req,res) => {
   
    routes(res, req)
    
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})

// Routes
const routes = (res, req) => {
    const url = req.url.replace('/', '');
    if(url === ""){
        try{
            const compileTemplate = pug.compileFile('./view/main.pug');
            const result = compileTemplate({menuItems});
            res.writeHead(200, {"Content-Type" : "text/html; ;charset=utf8"});
            res.end(result)
        }catch(e){
            res.writeHead(500, {"Content-Type" : "text/plain"});
            res.end(e.message)
            return;
        }
    }
}
