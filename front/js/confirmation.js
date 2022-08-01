const recupId = JSON.parse(localStorage.getItem("idvalidation"));
console.log(recupId);
function validation(){
let content="";
content = `<h2>votre commande ${recupId} a était validé</h2>`
validation_commande.innerHTML = content;
console.log(content);
}
validation();
window.localStorage.removeItem('cadie');
