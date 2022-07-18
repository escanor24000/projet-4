function produit() {
  var items = document.getElementById("item");
  fetch('http://localhost:3000/api/products')
  .then(function(res){
    console.log(res);
    if(res.ok){
      return res.json();
    }
    throw Error(res.statusText);
  })
.then(function(data){
  console.log(data);
let contents = "";
          console.log(items);
          data.map(function(product){
            contents +=`<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
          });
          items.innerHTML = contents;
  })
.catch(function(error) {
  console.log(error.message);
  if(error.message == "Not Found"){
    items.innerHTML = `<h1>produit non trouvé</h1>`;
  }else{
    items.innerHTML = `<h1>contacter l'administrateur</h1>`;
    document.getElementsByClassName("titles").hidden = true
  }
});
}
 produit();