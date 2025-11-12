let bibliotheque = JSON.parse(localStorage.getItem("bibliotheque")) || [
  { code: 12, titre: "Clean Code", auteur: "Robert C. Martin", annee: 2008, disponible: true, prix: 150 },
  { code: 45, titre: "Eloquent JavaScript", auteur: "Marijn Haverbeke", annee: 2018, disponible: true, prix: 200 },
  { code: 88, titre: "You Don’t Know JS", auteur: "Kyle Simpson", annee: 2015, disponible: false, prix: 180 }
];

// Affichage du catalogue
function afficherCatalogue() {                                                                                     
  const tbody = document.querySelector("#liste-livres tbody");
 
  tbody.innerHTML = "";
  bibliotheque.forEach(livre => {
    tbody.innerHTML += `
      <tr>
        <td>${livre.code}</td>
        <td>${livre.titre}</td>
        <td>${livre.auteur}</td>
        <td>${livre.annee}</td>
        <td>${livre.prix} dh</td>
        <td>${livre.disponible ? "Oui" : "Non"}</td>
        <td><button onclick="supprimerLivre(${livre.code})">Supprimer</button></td>
      </tr>`;
  });

  document.getElementById("total").innerText = bibliotheque.length;
  document.getElementById("disponibles").innerText = bibliotheque.filter(l => l.disponible).length;
  document.getElementById("valeur").innerText = bibliotheque.reduce((t,l)=>t+l.prix,0) + " dh";
  document.getElementById("plus-cher").innerText = bibliotheque.reduce((max,l)=>l.prix>max.prix?l:max,{prix:0}).titre || "-";
}

//  Supprimer un livre
function supprimerLivre(code){
  bibliotheque = bibliotheque.filter(l => l.code !== code);
  localStorage.setItem("bibliotheque", JSON.stringify(bibliotheque));
  afficherCatalogue();
}

//  Ajouter un livre depuis le formulaire
document.addEventListener("DOMContentLoaded", () => {
  afficherCatalogue();
  const form = document.getElementById("form-livre");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nouveau = {
      code: +document.getElementById("code").value,
      titre: document.getElementById("titre").value,
      auteur: document.getElementById("auteur").value,
      annee: +document.getElementById("annee").value,
      prix: +document.getElementById("prix").value,
      disponible: document.getElementById("disponible").checked
    };
    bibliotheque.push(nouveau);
    localStorage.setItem("bibliotheque", JSON.stringify(bibliotheque));
    form.reset();
    alert("📘 Livre ajouté !");
    afficherCatalogue();
  });
});
