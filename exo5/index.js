const dotenv = require("dotenv");
dotenv.config();

const students = [
    { name: 'ALAN', note: '11', address: 'Paris', mention : null },
    { name: 'ALICE', note: '17', address: 'Paris', mention : null },
    { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
    { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
    { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
    { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
    { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
    { name: 'SONIA', note: '18', address: 'Paris', mention : null },
    { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
  ];

updateMentionStudents = (tab) => {
    if(!checks(tab)) throw new Error("Veuillez fournir un tableau d'objet valide");

    for(let i = 0; i < tab.length; i++){
        let nbC = parseInt(tab[i].note,10)
        if(nbC >= 10 && nbC < 12) tab[i].mention = process.env.P;
        if(nbC >= 12 && nbC < 14) tab[i].mention = process.env.AB;
        if(nbC >= 14 && nbC < 16) tab[i].mention = process.env.B;
        if(nbC >= 16) tab[i].mention = process.env.TB;
    }
    return tab;
}

checks = (tab) => {
    if (Array.isArray(tab)) {
        let tabValide = true;
        for (let i = 0; i < tab.length; i++) {
          if (typeof tab[i] !== 'object' || Array.isArray(tab[i]) || !tab[i].note || isNaN(tab[i].note)) {
            tabValide = false;
            break;
          }
        }
        return tabValide;
    }
    return false
}

console.log(updateMentionStudents(students));