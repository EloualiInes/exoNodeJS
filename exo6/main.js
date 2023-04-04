const readline = require("readline");

const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
});
const students = ["Alan", "Sonia", "Sophie"];
questionStudent = () => {
    rl.question("Quel est ton nom étudiant ? ", (answer) => {
        for(let i = 0; i < students.length; i++){
            let regex = new RegExp(`${students[i]}\s*`, 'i')
            if(regex.test(answer.trim())) {
                console.log("Bonjour ",students[i]);
                rl.close();
                process.exit(0);
            }
        }
        questionStudent();
        
    })
}

questionStudent();