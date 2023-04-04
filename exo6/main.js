const readline = require("readline");

const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
});
const students = ["Alan", "Sonia", "Sophie"];
questionStudent = () => {
    rl.question("Quel est ton nom étudiant ? ", (answer) => {
        for(let i = 0; i < students.length; i++){
            let regex = new RegExp(students[i], 'i')
            if(regex.test(answer.trim())) {
                console.log("Bonjour ", answer.trim());
                rl.close();
                return;
            }
        }
        questionStudent();
        
    })
}

questionStudent();