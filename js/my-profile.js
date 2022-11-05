

let email=document.getElementById('email')
let primerNombre=document.getElementById('priNombre')
let segundoNombre=document.getElementById('segNombre')
let primerApellido=document.getElementById('priApellido')
let segundoApellido=document.getElementById('segApellido')
let tel=document.getElementById('telefono')
let imagenperfil=document.getElementById('imagen')
let camposob=[primerNombre,primerApellido,email]

let formPersonal= document.getElementById('formPerfil')



function mostrarAlertaGuardado() {
    document.getElementById("alert-success").classList.add("show");
}

document.addEventListener("DOMContentLoaded", function (e) {
    let correoLoggeado = localStorage.getItem("mail");
    email.value=correoLoggeado;
    /* console.log(localStorage.getItem("fotoperfil"))
    document.getElementById('laimagen').setAttribute('src',localStorage.getItem("fotoperfil"))
   */  primerNombre.value=localStorage.getItem("PrimerNombre");
    segundoNombre.value=localStorage.getItem("SegundoNombre");
    primerApellido.value=localStorage.getItem("PrimerApellido");
    segundoApellido.value=localStorage.getItem("SegundoApellido");
    tel.value=localStorage.getItem("Telefono");
    formPersonal.addEventListener('submit',event=>{
        let incompleto=false;
        for(let campo of camposob){
            if(campo.value===''){
                campo.classList.add('is-invalid');
                incompleto=true;
                event.preventDefault();
                event.stopPropagation();
            }else{
                campo.classList.add('is-valid');
            }
            campo.addEventListener('change', function () {
                campo.classList.remove('is-invalid')
                campo.classList.add('is-valid')
            })
            campo.addEventListener('input', function () {
                campo.classList.remove('is-invalid')
                campo.classList.add('is-valid')
            }) 
        }
        
        if(!incompleto){
            localStorage.setItem("PrimerNombre",primerNombre.value);
            localStorage.setItem("SegundoNombre",segundoNombre.value);
            localStorage.setItem("PrimerApellido",primerApellido.value);
            localStorage.setItem("SegundoApellido",segundoApellido.value);
            localStorage.setItem("Telefono",tel.value);
           /*  localStorage.setItem("fotoperfil",imagen.value)
            document.getElementById('laimagen').setAttribute('src',imagen.value)
      */       mostrarAlertaGuardado()
            event.preventDefault();
            event.stopPropagation();
        }
    })

    document.getElementById('cerraralerta').addEventListener('click',function(e){
        location.href="my-profile.html"
    })
    
})
