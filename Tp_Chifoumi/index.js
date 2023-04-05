const readline = require("readline");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const { PIERRE, PAPIER, CISEAU } = process.env;

// Initialise le jeu
const initGame = async () => {
  const writeStream = fs.createWriteStream("chifumi.txt");
  process.stdout.write("Combien de parties entre les ordis : ");
  
  
  return await new Promise((resolve, reject) => {
    process.stdin.on("data", (input) => {
        const answer = input.toString().trim();
        let borne = answer;
        // gestion simplette d'une erreur de saisie de l'utilisateur
        if(answer.includes("stop")){
            console.log("Have a great day!");
            process.exit(0);
        }
        else if (isNaN(answer)) {
          console.log("pas sympa, j'initialise à 10 naah !");
          borne = 10;
        } else borne = parseInt(answer);

        for (let i = 0; i < borne; i++) {
          // On écrit les valeurs sur notre fichier selon la borne
          writeStream.write(
            `${getRandomValues()}-${getRandomValues()}${
              i !== borne - 1 ? "\n" : ""
            }`
          );
        }
        writeStream.end();
        writeStream.on("finish", () => {
          resolve();
        });
      
    })
  });
};

// Fonction mettant en place les regles du chifumi.
const game = async () => {
  await initGame();
  const parties = [];
  const rl = readline.createInterface({
    input: fs.createReadStream("chifumi.txt"),
  });
  rl.on("line", (line) => {
    // Génère un tableau 2 dimensions contenant les deux valeurs d'une ligne
    parties.push(line.split("-"));
  });
  rl.on("close", () => {
    // Quand il a fini le tab parties => commencement des parties
    let tableauScore = {
      joueur1: 0,
      joueur2: 0,
    };
    for (let i = 0; i < parties.length; i++) {
      console.log(`Ordi 1 joue ${parties[i][0]}`);
      console.log(`Ordi 2 joue ${parties[i][1]}`);
      //   Vérifie le gagnant selon les règles du chifumi
      const res = issues(parties[i]);
      if (res === 0)
        tableauScore = { ...tableauScore, joueur1: tableauScore.joueur1 + 1 };
      else if (res === 1)
        tableauScore = { ...tableauScore, joueur2: tableauScore.joueur2 + 1 };
      console.log(`   >>> ${resultWinner(res)}\n`);
    }
    console.table(tableauScore);
    if(tableauScore.joueur1 > tableauScore.joueur2)
        console.log("Le joueur 1 a gagné")
    else if(tableauScore.joueur1 < tableauScore.joueur2)
        console.log("Le joueur 2 a gagné")
    else console.log("Egalité parfaite !")
    game();
  });
};

// Retourne le gagnant selon les règles du chifumi
// Si les 2 ont la même valeur retourne null
const issues = (tab) => {
  if (tab[0] === tab[1]) return null;
  else if (tab[0] === PIERRE) {
    if (tab[1] === CISEAU) return 0;
    else if (tab[1] === PAPIER) return 1;
  } else if (tab[0] === CISEAU) {
    if (tab[1] === PIERRE) return 1;
    else if (tab[1] === PAPIER) return 0;
  } else if (tab[0] === PAPIER) {
    if (tab[1] === PIERRE) return 0;
    else if (tab[1] === CISEAU) return 1;
  }
};

// retourne les résultats de la game
const resultWinner = (res) => {
  return res ? `C'est l'ordi ${res + 1} qui gagne` : "égalité !";
};

// Retourne Pierre/papier ou ciseau aléatoirement
getRandomValues = () => {
  const rand = Math.floor(Math.random() * 3);
  switch (rand) {
    case 0:
      return PIERRE;
    case 1:
      return PAPIER;
    case 2:
      return CISEAU;
    default:
      return PIERRE;
  }
};

getRegex = (str) => {
  let regexFinal = "";
  for (let i = 0; i < str.length; i++) regexFinal += `${str[i]}\\s*`;
  return new RegExp(regexFinal, "i");
};



game();
