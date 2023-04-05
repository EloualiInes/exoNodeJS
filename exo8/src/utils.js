const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

getPosRandom = (borne) => {
    const rand = Math.floor(Math.random() * borne);
    return rand;
}

mixUser = () => {
    let usersCopy = [...users];
    for(let i = 0; i < users.length; i++){
        pos1 = getPosRandom(usersCopy.length);
        pos2 = getPosRandom(usersCopy.length);
        while(pos1 === pos2){
            pos1 = getPosRandom(usersCopy.length);
            pos2 = getPosRandom(usersCopy.length);
            
        }

        let tmp = usersCopy[pos1];
        usersCopy[pos1] = usersCopy[pos2];
        usersCopy[pos2] = tmp;

    }
    return usersCopy;
}

afficheUserHtml = (tab = users) => {
    const usersList = tab.map(user => `<li>${user}</li>`).join('');
    const content = `
        <!Doctype html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Page test</title>
            </head>
            <body>
                <p> Bienvenue sur la page test</p>
                <ul>
                    ${usersList}
                </ul>
            </body>
        </html>
    `
    return content;
}

afficheMixUserHtml = () => afficheUserHtml(mixUser());



module.exports = {
    afficheUserHtml,
    afficheMixUserHtml
}