let correo = document.getElementById('mail');
let contraseña = document.getElementById('contraseña');
let datos_ok = true;

function inicio_sesion() {

    if (correo.value === "") {

        correo.classList.add('is-invalid');
        datos_ok = false;
        document.getElementById("correo_error").innerHTML = "Ingresa tu e-mail";

    }
    if (contraseña.value === "") {

        contraseña.classList.add('is-invalid');
        datos_ok = false;
        document.getElementById("contra_error").innerHTML = "Ingresa tu contraseña";

    }
    if (datos_ok) {
        localStorage.setItem("mail", correo.value);
        localStorage.setItem("clave", contraseña.value);
        let usuario = localStorage.getItem("mail");
        location.href = "index.html";
        alert("El usuario "+usuario+" ha iniciado sesión correctamente");
        alert("Bienvenido a la portada de nuestro sitio de e-comerce");
    }
}


document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('iniciar').addEventListener('click', () => {
        inicio_sesion();
    });
})

