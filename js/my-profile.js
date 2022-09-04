
document.addEventListener("DOMContentLoaded", function () {
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