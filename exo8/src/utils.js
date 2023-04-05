const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

getPosRandom = (borne) => Math.floor(Math.random() * borne);

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
                    ${usersList}
                </ul>
            </body>
        </html>
    `
}

afficheMixUserHtml = () => afficheUserHtml(mixUser());



module.exports = {
    afficheUserHtml,
    afficheMixUserHtml
}