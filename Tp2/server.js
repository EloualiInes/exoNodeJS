const fs = require("fs");
const http = require("http");
const HOST = "localhost";
const PORT = 8000;
const students = [
    { name : "Sonia"},
    { name : "Antoine"}
];

const server = http.createServer((req,res) => {
    const url = req.url.replace('/', '');
    if (req.method === 'POST' && url === "") {
        let body = '';
        req.on('data', data => {
            body += data.toString("utf-8");
        });
    
        req.on('end', () => {
            const dataArr = body.split('&');
            const jsonData = {};
            dataArr.forEach((item) => {
            const pair = item.split('=');
            const key = decodeURIComponent(pair[0]);
            const value = decodeURIComponent(pair[1]);
            jsonData[key] = value;
            });
            students.push(jsonData);
            console.log(students)
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(students));
        });
    }
    else if (url === '') {
        fs.readFile('./view/home.html', 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading home.html');
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
          }
        });
    }
    else if (url === "bootstrap") {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
        res.write(css);
        res.end();
    
        return;
      }
    
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})