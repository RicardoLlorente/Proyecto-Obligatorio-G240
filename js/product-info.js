


document.addEventListener("DOMContentLoaded", function (e) {
    /*Seccion para configurar el boton de cerrar sesion de la barra de navegacion */
    document.getElementById("Cerrar_Sesión").addEventListener("click", function () {
        sessionStorage.clear();
        location.href = "login.html"
    })
})