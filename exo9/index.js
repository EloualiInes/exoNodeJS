const fs = require("fs");
const http = require("http");
const HOST = "localhost";
const PORT = 8000;

http.createServer((req,res) => {
    const url = req.url.replace('/', '');
    routes(url,req.url, res);
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})

const routes = (url,reqUrl, res) => {
    const query = reqUrl.split('/')[2];
    const query2 = reqUrl.split('?')[1];
    const search = new URLSearchParams(query2).get('q');

    console.log("query de", query);
    console.log("search de", search);
    if(url === "all"){
        const paths = [
            "/Data/alan.json", 
            "/Data/alice.json",
            "/Data/antoine.json",
            "/Data/bernard.json",
            "/Data/clarisse.json",
            "/Data/sonia.json",
            "/Data/sophie.json"
        ]
        readJSONFiles(paths,res);
    }
    if(url.includes("search") && (query || search)){
        console.log("query", query);
        console.log("search", search);
        if(query) readJSON(`/Data/${query}.json`, res)
        else readJSON(`/Data/${search.toLowerCase()}.json`, res)
    }
    if(url === ""){
        res.writeHead(200);
        const routes = [
            "alan", 
            "alice",
            "antoine",
            "bernard",
            "clarisse",
            "sonia",
            "sophie"
        ];
        res.end(afficheUserHtmlList(routes));
    }
}

// Je n'ai pas utilisé all => je l'ai vu qu'au dernier moment :'(
const readJSONFiles = (paths, res) => {
    const dataArray = [];
  
    paths.forEach(path => {
      fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("404 Page non trouvée");
            return;
        } else {
          const jsonData = JSON.parse(data);
          dataArray.push(jsonData);
        }
  
        if (dataArray.length === paths.length) {
          const responseJSON = JSON.stringify(dataArray);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(responseJSON);
        }
      });
    });
  };
  
  const readJSON = (path, res) => {
    fs.readFile(__dirname + path, (err, data) => {
        if(err) {
            res.writeHead(404);
            res.end("404 Page non trouvée");
            return;
        }
        res.writeHead(200,  { 'Content-Type': 'application/json' });
        res.end(data);
        return;
    })
  };


  afficheUserHtml = () => {
    return `
        <!Doctype html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Page test</title>
            </head>
            <body>
                <p> Bienvenue sur la page test</p>
                <ul>
                    <a href="/all">Toutes les données</a>
                </ul>
                <form action="/search" method="get">
                    <label for="search">Recherche :</label>
                    <input type="text" id="search" name="q" placeholder="Entrez votre recherche...">
                    <button type="submit">Rechercher</button>
                </form>

            </body>
        </html>
    `
}

afficheUserHtmlList = (routes) => {
    const routeList = routes.map(route => `<option value="${route}">${route}</option>`).join('');
    return `
        <!Doctype html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Page test</title>
            </head>
            <body>
                <p> Bienvenue sur la page test</p>
                <ul>
                    <a href="/all">Toutes les données</a>
                </ul>
                <form action="/search" method="get">
                    <label for="route">Sélectionnez une page :</label>
                    <select id="search" name="q">
                    ${routeList}
                    </select>
                    <button type="submit">Aller à la page</button>
                </form>

            </body>
        </html>
    `
}
