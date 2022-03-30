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
        })
        .then(function (product) {
            console.log(product);
            let contents = "";
            console.log(items);
          let color_content = "";
          for(i in product.colors){
            color_content += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
          }
                contents = `<article>
                <div class="item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="item__content">
    
                  <div class="item__content__titlePrice">
                    <h1 id="title">"${product.name}"</h1>
                    <p>Prix : <span id="price">"${product.price}"</span>€</p>
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
                      <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                    </div>
                  </div>
    
                  <div class="item__content__addButton">
                    <button id="addToCart">Ajouter au panier</button>
                  </div>
    
                </div>
              </article>`
          console.log(contents)
            items.innerHTML = contents;
        })
        .catch(function (error) {
            console.log(error);
        });
}

getProductDataByClassName();
