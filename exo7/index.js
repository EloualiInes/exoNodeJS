const fs = require("fs");
const readline = require("readline");
const json = JSON.parse(fs.readFileSync("./Data/students.json"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  let studentFind = false;
  if (line.includes("stop")) {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  }
  const answer = line.trim();
  for (let i = 0; i < json.students.length; i++) {
    let regex = new RegExp(`${json.students[i].name}\s*`, "i");
    if (regex.test(answer.trim())) {
      const average = moyenne(json.students[i].notes);
      console.log(
        `${json.students[i].name} : ${
          average !== -1 ? average : "Moyenne inconnue"
        }/20`
      );
      studentFind = true;
    }
  }
  if (!studentFind) console.log("Aucun étudiant avec ce nom");
  console.log("Une autre recherche ? ");
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0); // arrêt du processus
});

moyenne = (tab) => {
  let tabValide = true;
  let sum = 0;
  if (Array.isArray(tab)) {
    let tabValide = true;
    for (let i = 0; i < tab.length; i++) {
      if (Array.isArray(tab[i]) || isNaN(tab[i])) {
        tabValide = false;
        break;
      }
      sum += tab[i];
    }
  }
  if (tabValide) return sum / tab.length;
  return -1;
};
