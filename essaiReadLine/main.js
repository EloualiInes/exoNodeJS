const fs = require("fs");
const readline = require("readline");

// ---------- EXEMPLE COURS
const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

rl.setPrompt("Aloha > ");
rl.prompt()

rl.on("line", (line) => {
    switch(line.trim()){
        case "Hello" : 
            console.log("world");
            break;
        case "Quoi":
            console.log("feur ! ahah");
            break;
        default : 
            console.log("Say what ? I might have heard ", line.trim());
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log("Bye, have a good day !");
    process.exit(0);
})


// --------- TESTS PERSO

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// const randomNumber = Math.floor(Math.random() * 100) + 1;
// devinette = () => {
//   rl.question("Devinez un nombre entre 1 et 100 : ", (answer) => {
//     const response = parseInt(answer, 10);

//     if (isNaN(response)) {
//       console.log("Veuillez entrer un nombre valide.");
//       devinette();
//     } else if (response < 1 || response > 100) {
//       console.log("Le nombre doit être entre 1 et 100.");
//       devinette();
//     } else if (response < randomNumber) {
//       console.log("Le nombre est plus grand.");
//       devinette();
//     } else if (response > randomNumber) {
//       console.log("Le nombre est plus petit.");
//       devinette();
//     } else {
//       console.log("Bravo, vous avez deviné le bon nombre !");
//       rl.close();
//     }
//   });
// };

// devinette();

// Créer un flux de lecture avec readline
// const readStream = fs.createReadStream('exampleName.txt');
// const rl = readline.createInterface({
//   input: readStream
// });

// // Créer un flux d'écriture vers un nouveau fichier
// const writeStream = fs.createWriteStream('output.txt');

// rl.on('line', (line) => {
//     const transformedLine = `name : ${line}\n`;
//     writeStream.write(transformedLine);
// });

// // Écouter l'événement 'end' du flux de lecture pour afficher un message lorsque la lecture est terminée
// readStream.on('end', () => {
//   console.log('Lecture terminée.');
// });
