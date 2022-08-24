
document.addEventListener("DOMContentLoaded", function(e){
    let usuario = sessionStorage.getItem("mail");
    if (usuario == null) {
        alert("Perdon, necesita logearse.")
        alert("Redireccionando a la pagina de login.")
        location.href = "login.html";
    }else{
        document.getElementById("usuario").innerHTML=usuario;
    }
    /*Seccion para configurar el boton de cerrar sesion de la barra de navegacion */
    document.getElementById("Cerrar_sesion").addEventListener("click", function () {
        sessionStorage.clear();
        location.href = "login.html"
    })

})