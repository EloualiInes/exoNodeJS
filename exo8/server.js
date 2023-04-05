const http = require("http");
const HOST = "localhost";
const PORT = 8000;
const {afficheUserHtml,afficheMixUserHtml} = require("./src/utils");

const server = http.createServer((req, res) => {
    // Routes
    const url = req.url.replace('/', '');
    if(url === "shuffle"){
        res.end(afficheMixUserHtml());
        return;
    }
    res.end(afficheUserHtml())
})

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})