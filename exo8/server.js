const http = require("http");
const HOST = "localhost";
const PORT = 8000;
const {afficheUserHtml,afficheMixUserHtml} = require("./src/utils");

const server = http.createServer((req, res) => {
    // Routes
    const url = req.url.replace('/', '');
    if(url === "shuffle"){
        res.setHeader("Content-type","text/html;charset=utf8");
        res.end(afficheMixUserHtml());
        return;
    }
    if(url === ""){
        res.setHeader("Content-type","text/html;charset=utf8");
        res.end(afficheUserHtml())
        return;
    }
    
})

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})