// création des projets avec API/works et réponse mise au format json
async function callApi(){
    const url = "datas.json"
    const fetcher = await fetch ("http://localhost:5678/api/works")
    const json = await fetcher.json()
    console.log(json)
    for(let i = 0; i<json.length; i++){
    const project = json[i];
    const gallery = document.querySelector(".gallery");
    const projectElement =document.createElement("figure");
    projectElement.id = "card-"+json[i].id;
    projectElement.dataset.name = json[i].category.name;
    projectElement.className = "card"
    const imageElement = document.createElement("img");
    imageElement.src = json[i].imageUrl;
    const titleElement = document.createElement("figcaption")
    titleElement.innerText = json[i].title;

    gallery.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(titleElement);
    console.log(project)
    console.log(projectElement.id)
    }  
   }; 
  callApi()

    
let categories = [];
// récupération des catégories avec API/categories + message error
async function getCategory(){
    const response = await fetch ("http://localhost:5678/api/categories");
    if(response.ok === true){
        categories = await response.json()
        console.log(categories)
        generateButtons()
    }
    else {
        throw new Error ("impossible de contacter le serveur")
    }
   // activation ou suppression de class pour les filtres 
const filterButtons = document.querySelectorAll(".filtre button");
const filterableCard = document.querySelectorAll(".gallery .card");
console.log(filterButtons, filterableCard);
const filterCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    console.log(e.target);

    filterableCard.forEach(card => {
        card.classList.add("hide");

        if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "Tous") {
            card.classList.remove("hide")
        }
    });
}
filterButtons.forEach(button => button.addEventListener("click",filterCards));
}
getCategory(categories)



// création des filtres avec ajout de data.name et du filtre Tous
async function generateButtons(){
     const gallery = document.querySelector(".filtre")
    const buttonFilterTous = document.createElement("button")
        buttonFilterTous.setAttribute("data-name","Tous");
        buttonFilterTous.innerText = "Tous";
        buttonFilterTous.className = "active"
        gallery.appendChild(buttonFilterTous)

    for(let i = 0; i<categories.length; i++) {
        const gallery = document.querySelector(".filtre")
        const btn = document.createElement("button");
        btn.innerText = categories[i].name;
        btn.dataset.name = btn.innerText
        gallery.appendChild(btn)
    }
    
}

// mise en forme de l'index au format éditon une fois la connexion assurée avec la présence du token
window.onload = () => {
if (sessionStorage.token !== null && sessionStorage.token !== undefined){
    const barreNoire = document.querySelector(".blackBarre");
    barreNoire.style.display = "flex";
    console.log(sessionStorage.token)

    const modifPhoto = document.querySelector(".modif");
    modifPhoto.style.display = "block";

    const modifTitre = document.querySelector(".modifTitre");
    modifTitre.style.display = "block";

    const modifBouton = document.querySelector(".filtre");
    modifBouton.style.display = "none";

}
}

function isconnected () {
    if (sessionStorage.token !== null && sessionStorage.token !== undefined){
        const barreNoire = document.querySelector(".blackBarre");
        barreNoire.style.display = null;
        console.log(sessionStorage.token)
    
        const modifPhoto = document.querySelector(".modif");
        modifPhoto.style.display = null;
    }
    }


function logout () {
    if (sessionStorage.token !== null && sessionStorage.token !== undefined){
            const logout= document.querySelector(".logout");
            const login= document.querySelector(".login");
            logout.style.display = "flex";
            login.style.display ="none";
    } 
    }
    logout()

    
        
    document.addEventListener('DOMContentLoaded', function() {
        const lienDeconnexion = document.querySelector('.logout');
        lienDeconnexion.addEventListener('click', function(e) {
            e.preventDefault();
            deconnexion();
        });
    });
    
    function deconnexion() {
        sessionStorage.removeItem('token');
        window.location.href = 'index.html';
    }
    
    
       


  

