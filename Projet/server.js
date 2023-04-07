const http = require("http");
const pug = require("pug");
const dotenv = require("dotenv");
dotenv.config();
const { convertStudentsFr } = require("./utils")
const HOST = process.env.APP_LOCALHOST;
const PORT = process.env.APP_PORT;
const students = [
    { name : "Sonia", birth : "2019-14-05"},
    { name : "Antoine", birth : "2000-12-05"},
    { name : "Alice", birth : "1990-14-09"},
    { name : "Sophie", birth : "2001-10-02"},
    { name : "Bernard", birth : "1980-21-08"}
];


http.createServer((req,res) => {
   
    routes(req, res)
    
}).listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})


const routes = (req, res) => {
    const url = req.url.replace('/', '');
    
    if(url === ""){
        displayPagePug(res, "./view/home.pug")
    }

    if(url === "add" && req.method === "POST"){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString("utf-8");
        });
        req.on('end', () => {
            const data = new URLSearchParams(body);
            const name = data.get('name');
            const date = data.get('date');
            
            students.push({
                name : name, birth : date
            })
            res.writeHead(302, { 'Location': '/' });
            console.log("students : ", students)
            res.end();
        });
    }
    if(url === "users"){
        const studentsFr = convertStudentsFr(students);
        const context = { studentsFr }
        displayPagePug(res, "./view/users.pug", context)
    }
}

const displayPagePug = (res, path, data = {}) => {
    console.log("data: ",data)
    try{
        const compileTemplate = pug.compileFile(path)
        const result = compileTemplate(data);
        res.writeHead(200, {"Content-Type" : "text/html; ;charset=utf8"});
        res.end(result)
    }catch(e){
        res.writeHead(500, {"Content-Type" : "text/plain"});
        res.end(e.message)
        return;
    }
}

