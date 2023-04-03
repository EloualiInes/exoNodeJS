// ### 01 Exercice 

// 1. Créer un petit jeu en console : on doit deviner un nombre compris entre 1 et 100. Si l'utilisateur propose un nombre plus petit on lui indique qui l'est plus grand et réciproquement. 

// 2. L'utilisateur à 10 tentatives pour deviner le nombre caché, après le jeu s'arrête. Si l'utilisateur trouve le nombre avant cette borne, le jeu s'arrête également. 

// 3. Pensez à gérer également les erreurs de saisi dans le jeu.

    const nb = Math.floor(Math.random() * 100);

    process.stdout.write(`Trouvez un nombre entre 1 et 100 : `);
    
    let tentative = 0;
    process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null && tentative < 10) {
        if(isNaN(chunk)) { process.stdout.write(`Ce n'est pas un nombre. Veuillez écrire un nombre : `); continue;}
        else{
            if(parseInt(chunk) === nb){
                process.stdout.write(`Bravo ! Vous avez trouvé ! le nombre était bien : ${chunk}`);
                process.exit(0);
            }else if(parseInt(chunk) < nb ){
                process.stdout.write(`C'est plus que: ${chunk}`);
            }else{
                process.stdout.write(`C'est moins que: ${chunk}`);
            }
            tentative = tentative + 1;
        }
        
     
    }
  });