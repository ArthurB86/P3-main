let modal = null
//fonction qui permet d'ouvir la modal
const oppenModal = function(e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null;
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click",closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click",stopPropagation)
}
//fonction qui permet de fermer la modal
const closeModal = function(e){
   if (modal === null) return
    e.preventDefault()
    modal.style.display = "none";
    modal.removeEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click",closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click",stopPropagation)
    modal =null
    document.getElementById("title").value= ""
    document.getElementById("choseCat").value=""
}

const stopPropagation= function(e){
    e.stopPropagation()
} 
document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener('click', oppenModal)
})

//fonction qui génère la modal
   async function generationModal(){
    
    
    const fetcher = await fetch ("http://localhost:5678/api/works")
    const PhotoModal = await fetcher.json()
    for(let i = 0; i<PhotoModal.length; i++){
    const article = PhotoModal[i];

    const sectionGallery = document.querySelector(".galleryModal");
    const articleElement = document.createElement("article");
    const id = article.id;
    articleElement.classList.add("photosRealisation");
    articleElement.id = "photosRealisation-"+id;
    
    
    const IconTrash = document.createElement("Icon");
    IconTrash.classList.add("fa-regular", "fa-trash-can","fa-sm");
    IconTrash.setAttribute('id',article.id)
    
    IconTrash.addEventListener("click", (e)=>{
        if(typeof IconTrash.id ==='string'){
            deletework(id);
            return
}
    console.log(IconTrash.id)
});

    const IconArrow = document.createElement("icon");
    IconArrow.classList.add("fa-solid", "fa-arrows-up-down-left-right","fa-am");


    const imageElementModal = document.createElement("img");
    imageElementModal.src = PhotoModal[i].imageUrl; 
    
    const titleElement = document.createElement("p");
    titleElement.innerText = "editer";

    sectionGallery.appendChild(articleElement);
    articleElement.appendChild(imageElementModal)
    articleElement.appendChild(titleElement);
    articleElement.appendChild(IconTrash)
    articleElement.appendChild(IconArrow)
    console.log(article)
    console.log(articleElement.id)
}}; 
   generationModal()

//fonction qui permet l'affichage des deux pages de la modal ainsi que la fleche de retour et la suppression du form avec la fleche retour
   document.addEventListener("click", () => {
    const buttonsAjoutPhoto = document.querySelector(".buttonPhoto");
    const addsPhoto = document.querySelector(".modal2")
    const gallerysphoto = document.querySelector(".modal1")
    const backArrow = document.querySelector(".js-modal-back")
    
    buttonsAjoutPhoto.addEventListener("click",() =>{
    addsPhoto.style.display = "flex"
    gallerysphoto.style.display ="none"
    backArrow.style.display = "flex"
})
    backArrow.addEventListener("click",() =>{
    addsPhoto.style.display="none"
    gallerysphoto.style.display="flex"
    backArrow.style.display ="none"
    document.getElementById("title").value=""
    document.getElementById("choseCat").value=""
    resetPage();
})
})
// fonction pour supprimer un projet
function deletework(id) {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
    Authorization: `Bearer ${token}`,
    Accept: "*/*",
    "content-type": "application/json",
}
})
   .then((response) => {  
    console.log(response);
    
    if(response.ok){
        console.log("ressource succes")
        document.getElementById('popup').style.display = 'block';
        document.getElementById('reloadPage').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById("card-"+id).remove();
        document.getElementById("photosRealisation-"+id).remove()
});      
}
    else{
        console.log("erreur")
} 
})
   .catch(error => console.log(error));
}
//fonction pour ajouter un projet
let valide = document.getElementById("valid")

valide.addEventListener("click", (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token");
    var img = document.getElementById('uploadImg');
    var title = document.getElementById("title");
    var categorie = document.getElementById("choseCat");
    const formData = new FormData
    formData.append("image", img.files[0]);
    formData.append("title", title.value);
    formData.append("category", categorie.value)
    console.log(formData) ;
   fetch("http://localhost:5678/api/works", { 
    method: "POST",
    headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    },
    body: formData
    })
    .then (response=>{
    if(response.ok){ 
        console.log("Projet envoyé");
        document.getElementById('popup').style.display = 'block'; 
        document.getElementById('reloadPage').addEventListener('click', function() {
        document.querySelector(".galleryModal").innerHTML='';
        document.querySelector(".gallery").innerHTML='';
        callApi();
        generationModal();
        document.getElementById('popup').style.display = 'none';
        });
      
} else{
    console.log("erreur dans la récupération des donnés de l'API")
}})
})


//fonction qui deverouille le bouton valider du formulaire
function validationButton (){
    const error =document.querySelector(".error")
    if(uploadImg.files.length > 0 && title.value!== "" && choseCat.value !=="") {
        valid.classList.add("true")
        error.style.display="none"
        console.log(uploadImg)
        console.log(title)
        console.log(choseCat)
        console.log(valid)
    }else{
        valid.classList.remove("true")
        error.style.display ="flex"
}
}
uploadImg.addEventListener("input", validationButton);
title.addEventListener("input", validationButton);
choseCat.addEventListener("input", validationButton);
validationButton()

// fonction pour afficher l'image a ajouter au projet
const inputFile = document.getElementById('uploadImg')

inputFile.addEventListener('change', previewFile); 
   function previewFile(){ 
    const image = this.files[0]
    console.log(image);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', (event) => displayImage(event));
}

//fonction qui cache la div de chargement de la photo et affiche la photo que l'on souhaite charger
function displayImage(event) {
    const figureElement = document.createElement("figure");
    figureElement.id ="imageSelected"
    figureElement.classList.add("imgCharged")

    const imageElements = document.createElement("img")
    imageElements.src = event.target.result;
 
    imageElements.addEventListener('click', function () {
        imageElements.remove();
        inputFile.click();
      });

    const ptest =document.querySelector(".ptest")
    ptest.style.display= "none"

    const addPhotos =document.querySelector(".addPhotos")
    addPhotos.style.display= "none"

    const buttonAjoutPhoto =document.querySelector(".buttonAjoutPhoto")
    buttonAjoutPhoto.style.display= "none"

    figureElement.appendChild(imageElements);
    document.querySelector(".divIcon").appendChild(figureElement);

    
};

//fonction qui reinitialise le form d'ajout photo si on le quitte
function resetPage() {

    const ptest = document.querySelector(".ptest");
    ptest.style.display = "block";

    const addPhotos = document.querySelector(".addPhotos");
    addPhotos.style.display = "block";

    const buttonAjoutPhoto = document.querySelector(".buttonAjoutPhoto");
    buttonAjoutPhoto.style.display = "block";

    const imageSelected = document.getElementById("imageSelected");
    if (imageSelected) {
        imageSelected.remove();
    }
    inputFile.addEventListener('change', previewFile);  
    inputFile.value = ""; 
}

const resetButton = document.querySelector(".js-modal-close");
resetButton.addEventListener("click", resetPage);


