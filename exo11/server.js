const pug = require("pug");
const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: true
};

try{
    const compileTemplate = pug.compileFile('./view/template.pug');
    const result = compileTemplate({loggedUser});
    // res.writeHead(200, {"Content-Type" : "text/plain"});
    console.log(result)
}catch(e){
    // res.writeHead(500, {"Content-Type" : "text/plain"});
    console.log(e.message)
    return;
}
