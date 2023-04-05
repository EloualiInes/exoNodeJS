// 1. Lisez le fichier à l'aide de la méthode asynchrone.

// 1.(bis) Pour la suite utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.

// 2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.

// 3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.

// 4. Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.
// 5. Ordonnez maintenant l'ensemble des données dans le tableau.

const fs = require("fs");
const nameFile = "students.txt";

// 1 --  Lecture async
// fs.readFile("students.txt", "utf-8", (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })

//  2 Lecture async 

const readFileSync = (file) => {
    // Méthode synchrone
    try{
        const data = fs.readFileSync(file, "utf-8");
        return data;

    }catch(e){
        console.error(e)
    }
}
// // readFileSync(nameFile);

// Get toutes les notes supérieur à 17.
const getNotes = () => {
    const data = readFileSync(nameFile);
    // met chq ligne dans un tableau
    const lines = data.split("\n");
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        // Extrait les 2 premiers caracteres
        const note = lines[i].slice(0, 2);
        if(!isNaN(note) && parseInt(note, 10) > 17){
            // Donne l'index du premier espace contenue dans la portion apres les notes
            const firstSpaceIndex = lines[i].indexOf(' ', 3);
            // On extrait le nom
            const name = lines[i].slice(3, firstSpaceIndex);
            res.push({
                name : name,
                note : parseInt(note, 10),
            } )
        }
    }
    console.log(res);
    return res;
}

// getNotes();

// --- 3 best student

const bestStudent = () => {
    const data = readFileSync(nameFile);
    const lines = data.split("\n");
    let bestStudent = {
        name : "", 
        note : 0
    };
    for (let i = 0; i < lines.length; i++) {
        const note = lines[i].slice(0, 2);
        if(!isNaN(note) && parseInt(note, 10) > bestStudent.note){
            // Donne l'index du premier espace contenue dans la portion apres les notes
            const firstSpaceIndex = lines[i].indexOf(' ', 3);
            // On extrait le nom
            const nameBest = lines[i].slice(3, firstSpaceIndex);
            bestStudent = {
                name : nameBest,
                note : parseInt(note, 10)
            }
        }
    }
    console.log(bestStudent);
    return bestStudent.name;
}
// bestStudent();

// 4 - Tous les etudiants dans un tab d'objet

const getStudents = () => {
    const data = readFileSync(nameFile);
    const lines = data.split("\n");
    const res = []
    for (let i = 1; i < lines.length; i++) {
        const extractInfo = lines[i].split(" ");
        res.push({
            name : extractInfo[1],
            notes : parseInt(extractInfo[0], 10),
            address : extractInfo[2]
        })
    }
    // console.log(res);
    return res;
}
// getStudents();

// 5 -- Ordonner via les notes

const triCroissant = (tab) => {
    if(tab.length > 0){
        return tab.sort(function(a, b) {
            return a.notes - b.notes;
        });
        
    }
    return tab;
}
// console.log(triCroissant(getStudents()));

// 6 / 7 - Add elements in file and read 
const tab = [{
    name : "Sonia",
    notes : 18,
    address : "Paris"
}, {
    name : "Clarisse",
    notes : 17,
    address : "Marseille"
}];

const addStudent = (tab) => {
    console.log("tab :", tab)
    for(let i = 0; i < tab.length; i++){
        try{
            if(tab[i].notes && tab[i].name && tab[i].address){
                let data = `\n${tab[i].notes} ${tab[i].name.toUpperCase()} ${tab[i].address}`
                fs.appendFileSync(nameFile, data);
                console.log(`${data} saved`);
            }
        }catch(e){
            console.error(e);
        }
        
    }
    
}


// addStudent(tab);
// readFileSync(nameFile)