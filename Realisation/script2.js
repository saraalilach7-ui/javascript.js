let bibliotheque = JSON.parse(localStorage.getItem("bibliotheque")) || [
    { code: 12, titre: "Clean Code", auteur: "Robert C. Martin", annee: 2008, disponible: true, prix: 150 },
    { code: 45, titre: "Eloquent JavaScript", auteur: "Marijn Haverbeke", annee: 2018, disponible: true, prix: 200 },
    { code: 88, titre: "You Don’t Know JS", auteur: "Kyle Simpson", annee: 2015, disponible: false, prix: 180 }
  ];
  
  // --- afficher le catalogue ---
  function afficherCatalogue(filtre = "") {
  const tbody = document.querySelector("#liste-livres tbody");
    tbody.innerHTML = "";
  
    // Filtrage par titre si nécessaire
    const livresFiltres = bibliotheque.filter(livre =>
      livre.titre.toLowerCase().includes(filtre.toLowerCase())
    );
  
    livresFiltres.forEach(livre => {
      tbody.innerHTML += `
        <tr>
          <td>${livre.code}</td>
          <td>${livre.titre}</td>
          <td>${livre.auteur}</td>
          <td>${livre.annee}</td>
          <td>${livre.prix} dh</td>
          <td>${livre.disponible ? "Oui" : "<span style='color:red;'>Réservé</span>"}</td>
          <td>
            <button onclick="supprimerLivre(${livre.code})">Supprimer</button>
            ${
              livre.disponible
                ? `<button onclick="reserverLivre(${livre.code})">📚 Réserver</button>`
                : ""
            }
          </td>
        </tr>`;
    });
  
    // Statistiques
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
  
  // --- Réserver un livre ---
  function reserverLivre(code) {
    const livre = bibliotheque.find(l => l.code === code);
    if (livre && livre.disponible) {
      livre.disponible = false;
      localStorage.setItem("bibliotheque", JSON.stringify(bibliotheque));
      afficherCatalogue(document.getElementById("recherche").value);
    }
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
  // --- Tri par titre ---
  let ordreCroissant = true;
  
  document.addEventListener("DOMContentLoaded", () => {
    afficherCatalogue();
  
    const trierBtn = document.getElementById("btn-trier");
    if (trierBtn) {
      trierBtn.addEventListener("click", () => {
        bibliotheque.sort((a, b) =>
          ordreCroissant
            ? a.titre.localeCompare(b.titre)
            : b.titre.localeCompare(a.titre)
        );
        ordreCroissant = !ordreCroissant;
        trierBtn.textContent = ordreCroissant ? "Trier (A → Z)" : "Trier (Z → A)";
        localStorage.setItem("bibliotheque", JSON.stringify(bibliotheque));
        afficherCatalogue(document.getElementById("recherche").value);
      });
    }
  
    // --- Recherche en direct ---
    const inputRecherche = document.getElementById("recherche");
    if (inputRecherche) {
      inputRecherche.addEventListener("input", () => {
        afficherCatalogue(inputRecherche.value);
      });
    }
  });
  
  