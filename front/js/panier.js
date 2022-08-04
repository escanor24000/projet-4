const recupObjet = JSON.parse(localStorage.getItem("cadie"));
console.log(recupObjet);
function produitPanier(){
let content = "";
let totprix = 0;
let totquantite=0;
if(recupObjet!=null && recupObjet.length > 0){
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
        <p id=${resultats.id}></p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <label>Qté :  </label>
          <input id="${resultats.id}_price" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${resultats.quantite}" onchange="recalculate(event)">
        </div>
        <div class="cart__item__content__settings__delete">
        <button class="deleteItem" onclick="btnSupprimer('`+resultats.id+`')">Supprimer</button>
        </div>
      </div>
    </div>
  </article>`
  getPrice(resultats.id);
  totprix = totprix + (Number.parseFloat(resultats.quantite) * Number.parseFloat(resultats.prix));
  totquantite = totquantite + (Number.parseFloat(resultats.quantite));
  });

}else{
  content="<h2> Panier vide</h2>";
  document.getElementsByClassName("cart__order")[0].style.display = 'none';
  cart__price.style.display = 'none';
  
}

cart__items.innerHTML = content;
cart__price.innerHTML = `<p>Total (<span id="totalQuantity">${totquantite}</span> articles) : <span id="totalPrice">${totprix}</span> €</p>`
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
    
    const btnCommander = document.getElementById("order");
    btnCommander.addEventListener('click', function(e){
      e.preventDefault();
      const cadie = JSON.parse(localStorage.getItem('cadie'));
      let productIds =[];
      for(var i = 0 ; i <cadie.length; i++){
        tabId = cadie[i].id.split("_");
        const index = search(productIds,tabId[0]);
        if(index==-1){
          productIds.push(tabId[0]);
        }
      }
     const order = {
      contact:{
          firstName :  document.getElementById("firstName").value.trim(),
           lastName : document.getElementById("lastName").value.trim(),
           address : document.getElementById("address").value,
           city : document.getElementById("city").value.trim(),
          email : document.getElementById("email").value.trim(),
      },
      products: productIds
         }
      console.log(order);

      const isFirstCharNum = (str) => str.match(new RegExp(/^\d/)) !== null;

      if (order.contact.firstName.length < 1 || order.contact.firstName.length > 10){
        var firstName = document.getElementById("firstNameErrorMsg");
        firstName.style.display ="";
        return;
      }else if(order.contact.lastName.length < 1 || order.contact.lastName.length > 255){
        var lastName = document.getElementById("lastNameErrorMsg");
        lastName.style.display ="";
        return;
      }else if(order.contact.address.length < 1 || order.contact.address.length > 255 || (!isFirstCharNum(order.contact.address))){
        var address = document.getElementById("addressErrorMsg");
        address.style.display ="";
        return;
      }else if(order.contact.city.length < 1 || order.contact.city.length > 15 ){
        var city = document.getElementById("cityErrorMsg");
        city.style.display ="";
        return;
      }else if(!validateEmail(order.contact.email)){
        var email = document.getElementById("emailErrorMsg");
        email.style.display ="";
        return;
      };
      
      fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(order)
      })
        .then(function(data){
          console.log(data);
          if(data.ok){
            return data.json();
          }
            throw Error(data.statusText);
        })
        .then(function(res){
          console.log(res.orderId);
          localStorage.setItem("idvalidation", JSON.stringify(res.orderId));
          window.location.href = "confirmation.html";
        })
        .catch(function(error) {
          console.log(error.message);
          if(error.message == "Not Found"){
            cart.innerHTML = `<h1>produit non trouvé</h1>`;
          }else{
            cart.innerHTML = `<h1>contacter l'administrateur</h1>`;
          }
        })
      ;
    })

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    

    function getPrice(id){
      const idProduit = id.split("_");
      fetch('http://localhost:3000/api/products/' + idProduit[0])
        .then(function (res) {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then(function (product) {
          document.getElementById(id).textContent=product.price;
          
        })
        .catch(function (error) {
            console.log(error.message);
            if(error.message == "Not Found"){
              items.innerHTML = `<h1>produit non trouvé</h1>`;
            }else{
              items.innerHTML = `<h1>contacter l'administrateur</h1>`;
            }
            
        });
}

function recalculate(event){
  console.log(event.target.id);
  let quantite  = document.getElementById(event.target.id).value;
  const vals = event.target.id.split("_");
  const id  = vals[0]+"_"+vals[1];
  const index = search(recupObjet,id);
  console.log(index);
  if(quantite < 0 || quantite > 100){
    alert('vous pouvez sélectionner une quantité en 1 et 100');
    document.getElementById(event.target.id).value = recupObjet[index].quantite;
    return;
  }
  recupObjet[index].quantite = quantite;
  produitPanier();
 
  console.log(recupObjet[index]);
  console.log(id);
  console.log(quantite);
}

    

