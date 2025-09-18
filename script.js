
//chapitre 7

let nombre1 = 10;
let nombre2 = 5;
let somme = nombre1 + nombre2;
console.log("La somme est : " + somme);

// chapitre 8 

function addition(a, b) {
  return a + b;
}

let somme1 = addition(8, 5);
console.log("La somme est : " + somme1);

//chapitre 9

let age = 20;

if (age < 18) {
  console.log("Vous êtes mineur.");
} else if (age === 18) {
  console.log("Vous venez d’atteindre la majorité !");
} else {
  console.log("Vous êtes majeur.");
}

//chapitre 10


for (let i = 1; i <= 10; i++) {
  if (i === 5) continue; // sauter le 5
  console.log("Nombre : " + i);
}





