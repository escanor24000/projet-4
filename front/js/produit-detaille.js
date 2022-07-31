function getIdProductFromUrl() {
    let url = new URL(window.location.href);
    let search_params = url.searchParams;
    let id = search_params.get('id');
    return id;
}
function getProductDataByClassName() {
    let id = getIdProductFromUrl();
    let items = document.getElementById("content");
    fetch('http://localhost:3000/api/products/' + id)
        .then(function (res) {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then(function (product) {
            //console.log(product);
            let contents = "";
            //console.log(items);
          let color_content = "";
          for(i in product.colors){
            color_content += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
          }
                contents = `<article>
                <div class="item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé" id="image">
                </div>
                <div class="item__content">
    
                  <div class="item__content__titlePrice">
                    <h1 id="title">"${product.name}"</h1>
                    <p>Prix : <span id="price">${product.price}</span>€</p>
                  </div>
    
                  <div class="item__content__description">
                    <p class="item__content__description__title">Description :</p>
                    <p id="description">"${product.description}"</p>
                  </div>
    
                  <div class="item__content__settings">
                    <div class="item__content__settings__color">
                      <label for="color-select">Choisir une couleur :</label>
                      <select name="color-select" id="colors">
                          <option value="">--SVP, choisissez une couleur --</option>
                          ${color_content}
                      </select>
                    </div>
    
                    <div class="item__content__settings__quantity">
                      <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                      <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                      <input type="hidden" name="id" id="code" value=${product._id}>
                    </div>
                  </div>
    
                  <div class="item__content__addButton">
                    <button id="addToCart">Ajouter au panier</button>
                  </div>
    
                </div>
              </article>`
          //console.log(contents)
            items.innerHTML = contents;
            addProductToCart();
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

getProductDataByClassName();


function addProductToCart(){
  const btn = document.getElementById('addToCart');
  console.log(btn);
btn.addEventListener('click',function(){
  
  const Photographie = document.getElementById("image").src;
  const name = document.getElementById("title").textContent;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").textContent;
  const color = document.getElementById("colors").value;
  const id = document.getElementById("code").value+"_"+color;
  let cadProduct=[];
  if(localStorage.getItem("cadie")!=undefined || localStorage.getItem("cadie")!= null){
    cadProduct = JSON.parse(localStorage.getItem("cadie"));
  }
  if(quantity < 0 || quantity > 100){
    alert('vous pouvez sélectionner une quantité en 1 et 100');
    return;
  }else if(color === ""){
    alert('sélectionner une couleur');
    return;
  }


  
  produit = {
    id : id,
    photo : Photographie,
    nom : name,
    quantite : quantity,
    prix : price,
    couleur : color,
  }
  const index = search (cadProduct, id);
  if(index==-1){
    cadProduct.push(produit);
  }else{
    cadProduct[index].quantite = parseInt(cadProduct[index].quantite ) + parseInt(quantity);
  }



  console.log(cadProduct);
  localStorage.setItem("cadie", JSON.stringify(cadProduct));

})
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

