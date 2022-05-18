const recupObjet = JSON.parse(localStorage.getItem("cadie"));
console.log(recupObjet);
function produitPanier(){
let content = "";
recupObjet.forEach(resultats => {
  console.log(recupObjet)
 
  content +=`<article class="cart__item" data-id="product-ID" data-color="product-color">
  <div class="cart__item__img">
    <img src="${resultats.photo}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${resultats.nom}</h2>
      <p>${resultats.couleur}</p>
      <p>${resultats.prix}</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${resultats.quantite} </p>
        <!--<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">-->
      </div>
      <div class="cart__item__content__settings__delete">
      <button class="deleteItem" onclick="btnSupprimer('`+resultats.id+`')">Supprimer</button>
      </div>
    </div>
  </div>
</article>`


});
cart__items.innerHTML = content;
}
produitPanier();

function btnSupprimer(id){
console.log(id);
for(var l = 0 ; l < recupObjet.quantite.length; l-- ) {
  return(l);
}
}


function search(cadie, id)
    {
      console.log(id);console.log(cadie);
        for(var i = 0 ; i <cadie.length ; i++){
          console.log(cadie[i].id);
            if (id == cadie[i].id) {console.log(i)
              return i};
            }
        {console.log(1)
          return -1};
    }