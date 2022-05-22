const recupObjet = JSON.parse(localStorage.getItem("cadie"));
console.log(recupObjet);
function produitPanier(){
let content = "";
if(recupObjet.length >0){
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
}else{
  content="<div> Panier vide</div>";
  document.getElementsByClassName("cart__price")[0].style.display = 'none';
  document.getElementsByClassName("cart__order")[0].style.display = 'none';
}

cart__items.innerHTML = content;
}
produitPanier();

function btnSupprimer(id){
console.log(id);
const index = search (recupObjet, id);
console.log(index);

recupObjet[index].quantite-=1
if(recupObjet[index].quantite == 0){
  recupObjet.splice(index, 1);
}
localStorage.setItem("cadie", JSON.stringify(recupObjet));
location.reload();
return false;
/*for(var l = 0 ; l < recupObjet.length; l++ ) {
  //console.log(recupObjet)
  if(recupObjet[l].quantite == 1){
    recupObjet.splice(l, 1);
    return(l);
   
    console.log(recupObjet);
  }
}*/
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