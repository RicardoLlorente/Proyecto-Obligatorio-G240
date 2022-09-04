


document.addEventListener("DOMContentLoaded", function (e) {
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
     /*Seccion para configurar el boton de cada categoria de la barra de navegacion */
     document.getElementById("autos_nav").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes_nav").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles_nav").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

})