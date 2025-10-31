// 1. Créer un tableau de fruits
let fruits = ["pomme", "banane", "cerise"];
console.log("Tableau initial :", fruits);

// 2. Ajouter et supprimer
fruits.push("orange");
console.log("Après push :", fruits);

fruits.pop();
console.log("Après pop :", fruits);

// 3. Modifier un élément
fruits[1] = "kiwi";
console.log("Après modification :", fruits);

// 4. Ajouter au début et supprimer le premier
fruits.unshift("fraise");
console.log("Après unshift :", fruits);

fruits.shift();
console.log("Après shift :", fruits);

// 5. Utiliser splice pour insérer des éléments
fruits.splice(1, 0, "ananas");
console.log("Après splice :", fruits);

// 6. Parcours du tableau
console.log("Boucle for :");
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}

// 7. Tableau d’objets
let produits = [
  { nom: "Stylo", prix: 5 },
  { nom: "Cahier", prix: 15 },
  { nom: "Crayon", prix: 3 },
];

console.log("Liste des produits :");
produits.forEach((p) => console.log(`${p.nom} → ${p.prix} DH`));
