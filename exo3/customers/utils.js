
// Prix TTC = HT + (HT x TVA)

getPriceTTCObject = (objectHt, TVA = 0.2) => {
    // Verification tab
    if(!isTabObject(objectHt)) throw new Error("Veuillez fournir un tableau d'objet valide");
    for(let i = 0; i < objectHt.length; i++){
        if(!objectHt[i].name || !objectHt[i].priceHT || isNaN(objectHt[i].priceHT)){
            throw new Error("Veuillez prendre un tableau d'objet valide");
        }
    }

    // ON ajoute le price TTC
    for(let i = 0; i < objectHt.length; i++){
        objectHt[i] = {...objectHt[i],
            priceTTC : parseFloat((objectHt[i].priceHT + (objectHt[i].priceHT * TVA)).toFixed(2))}
    }
    return objectHt;
}

getPriceTTC = (priceHT, TVA = 0.2) => {
    if(isNaN(priceHT) || isNaN(TVA)){
        throw new Error("Veuillez un nombre valide");
    }
    return parseFloat((priceHT + (priceHT * TVA)).toFixed(2));
}


isTabObject = (tab) => {
    if (Array.isArray(tab)) {
        let estTableauObjets = true;
        for (let i = 0; i < tab.length; i++) {
          if (typeof tab[i] !== 'object' || Array.isArray(tab[i])) {
            estTableauObjets = false;
            break;
          }
        }
        return estTableauObjets
    }
    return false
}

module.exports = {getPriceTTCObject, getPriceTTC}