
// Prix TTC = HT + (HT x TVA)

module.exports.getPriceTTC = (objectHt, TVA = 0.2) => {
    // Verification tab
    for(let i = 0; i < objectHt.length; i++){
        if(!objectHt[i].name || !objectHt[i].priceHT || isNaN(objectHt[i].priceHT)){
            throw new Error("Veuillez prendre un tableau d'objet valide");
        }
    }

    // ON ajoute le price TTC
    for(let i = 0; i < objectHt.length; i++){
        objectHt[i] = {...objectHt[i],
            priceTTC : objectHt[i].priceHT + (objectHt[i].priceHT * TVA)}
    }
    return objectHt;
}