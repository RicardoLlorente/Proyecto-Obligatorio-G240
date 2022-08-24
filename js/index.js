document.addEventListener("DOMContentLoaded", function () {
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
    });
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});