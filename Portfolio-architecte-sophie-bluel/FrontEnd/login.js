// comparaison des réponses entre l'API/login et la page login
function fetchLogin(values) {
    const messagediv = document.getElementById("loginmessage")
    messagediv.innerText = ""
    fetch("http://localhost:5678/api/users/login", {
        method:'POST',
        body: JSON.stringify(values),
        headers:  {'Accept': 'application/json',
       'Content-Type': 'application/json'}

    }).then((res)=> {
        console.log(res)
        return res.json()
        
    })
    // Enregistrement du token dans le localStorage
     .then(data => { 
        console.log({data})
          if(data.token){
            sessionStorage.setItem("token", data.token)
           
            window.location.href = "./index.html";
          }
        else{
            const messagediv = document.getElementById("loginmessage")
            messagediv.innerText = "Erreur dans l’identifiant ou le mot de passe"
        }
     })
    .catch((error)=>{
        console.log(error) 
    }) 
    
}

// controle de la connexion avec le clique sur le bouton envoyé et controle dans l'objet de l'email et password nécessaire
function setuplogin (){
const form = document.getElementById("loginform")
console.log(form, new FormData(form))

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())
    console.log(data.get('email'))
    console.log(data.get('password'))
    console.log()
    fetchLogin(values)
    
})

};
setuplogin()


function info() {
    const email = document.getElementById('email').values
    const password = document.getElementById('mdp').values
    if (email === email.values && password === password.values ){ 
    console.log('reussi')}
    else{
        console.log ('erreur')
    }
}

