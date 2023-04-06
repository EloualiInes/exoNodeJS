const http = require("http");
const pug = require("pug");
const HOST = "localhost";
const PORT = 8000;

http.createServer((req,res) => {
    const url = req.url.replace('/', '');
    if(url === ""){
        // With RENDER file
        // pug.renderFile('./view/template.pug', {user : {isAdmin : false}}, (err, data) => {
        //     if(err) {
        //         res.writeHead(500, {"Content-Type" : "text/plain"});
        //         res.end(err.message);
        //         return;
        //     };
        //     res.writeHead(200, {"Content-Type" : "text/plain"});
        //     res.end(data)
        // });

        // With compileFile
        try{
            const compileTemplate = pug.compileFile('./view/template.pug');
            const result = compileTemplate({user : {isAdmin : true}});
            res.writeHead(200, {"Content-Type" : "text/plain"});
            res.end(result)
        }catch(e){
            res.writeHead(500, {"Content-Type" : "text/plain"});
            res.end(e.message);
            return;
        }
    }
    
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})