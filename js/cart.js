let cant_art = 0;
let cant_cada=[];
let subtotales=[];
let losbotes=[];

let preciounitario = [];
let currency = [];
let losinput = [];
let compras = [];
let subtotalgeneral=0;
let comisionenvio;
let PESOTODOLLAR=0.024;
let PERCENTAGE_SYMBOL = '%';
let vencimiento=document.getElementById('venc')             
let nrotarjetacredito=document.getElementById('credito')             
let codigo=document.getElementById('codseg')  
let nrobanco=document.getElementById('nrobank')        
let formaPago=document.getElementById('formapago');
let camposvacios=false;
//referido a la direccion
let calleinput=document.getElementById('calle');
let numeroinput=document.getElementById('numeropuerta');
let esquinainput=document.getElementById('esquina');
//forma de pago 
let formapago=document.getElementById('formapago');
//referido a la tarjeta
//referido al banco
let radioExpress=document.getElementById('expressradio')
let radioStandard=document.getElementById('standardradio')
let radioPremium=document.getElementById('premiumradio')
let errorenvio=document.getElementById('errorenvio')

function subtotalGeneralEnDolar(subtotal,moneda){
    if(moneda==='USD'){
        subtotalgeneral+=subtotal;
    }else if(moneda==='UYU'){
        subtotalgeneral+=subtotal*PESOTODOLLAR;
    }

}
function mostrarAlertaExitosa() {
    document.getElementById("alert-success").classList.add("show");
}

function mostrarlista(articulos) {

    let ListaCarritotoHTML="";
    for (let articulo of articulos) {
        cant_art++;
        let i = cant_art - 1;
        cant_cada[i]=1;
        currency[i] = articulo.currency;
        preciounitario[i] = articulo.unitCost;
        ListaCarritotoHTML += `
                <tr>
                    <td ><img src="${articulo.image}" alt="" class="img-cart"></td>

                    <td><p >${articulo.name}</p></td>

                    <td><p> ${currency[i] + ' ' + preciounitario[i]}</p></td>

                   
                    <td> 
                        <div class="col-md-3 mx-auto md-3 p-0">
                            <input type="number" name="productCountInput" class="form-control inputcount" id="productCountInput`+ i + `"  required value="1" 
                            min="1">
                            <div class="invalid-feedback">
                             El costo debe ser mayor que 0.
                             </div>
                        </div> 
                    </td>
            
                    <td><p ><strong id="subtotal`+ i + `"> ${currency[i] + ' ' + preciounitario[i]}</strong></p>
                    </td>
                    <td><i class="fas fa-trash-alt cursor-active deletes"></i></td>
                    </tr>
                `
                
                subtotales[i]=preciounitario[i];
                subtotalGeneralEnDolar(subtotales[i],currency[i]);

    }
    document.getElementById("arcitulocomprado").innerHTML=ListaCarritotoHTML;
    losinput = document.getElementsByClassName('inputcount');
    losbotes=document.getElementsByClassName('deletes')
    for (let k = 0; k < losinput.length; k++) {
        losinput[k].addEventListener('change', function () {
            if(currency[k]==='USD'){
                subtotalgeneral-=subtotales[k];
            }else if(currency[k]==='UYU'){
                subtotalgeneral-=subtotales[k]*PESOTODOLLAR;
            }

            console.log(cant_cada)
            cant_cada[k]=parseInt(this.value);
            console.log(cant_cada)
            subtotales[k]=cant_cada[k]*preciounitario[k];
            document.getElementById('subtotal' + k).innerHTML = currency[k] + ' ' + subtotales[k];
            subtotalGeneralEnDolar(subtotales[k],currency[k]); 
            actualizaDatos();                   
        })
    }
    for(let j=0;j<losbotes.length;j++){
        losbotes[j].addEventListener('click', function () {
        compras.splice(j,1);
        if(compras.length===0){
            location.href="cart.html";
            
        }
        location.href="cart.html";
        localStorage.setItem("buys",JSON.stringify(compras));
        mostrarlista(compras)
    })
        
    } 
    actualizaDatos();
}


//funcion para actualizar todos los valores requeridos en tiempo real
function actualizaDatos(){
    let SubtotalCostHTML = document.getElementById("CostoSubtotal");
    let costoenvioHTML = document.getElementById("costoenvio");
    let totalCostoHTML = document.getElementById("totalCost");

    let costoenvioToShow;
    let subtotalToShow = subtotalgeneral;
    if(comisionenvio!=undefined){
        costoenvioToShow =  comisionenvio * subtotalgeneral
    }else{
        costoenvioToShow=0;
    }
    let totalCostToShow =  subtotalToShow+costoenvioToShow
    
    SubtotalCostHTML.innerHTML = 'USD'+' '+subtotalToShow.toFixed(2);
    costoenvioHTML.innerHTML = 'USD'+' '+costoenvioToShow.toFixed(2);
    totalCostoHTML.innerHTML = 'USD'+' '+totalCostToShow.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function (e) {

compras = JSON.parse(localStorage.getItem("buys"));


console.log(compras)
console.log(compras==undefined)

if(compras.length===0){
    console.log(compras)
    getJSONData(CART_INFO_URL + USER_id + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            compras = resultObj.data.articles;
            console.log(compras)
            localStorage.setItem("buys",JSON.stringify(compras));
        }
    })
}
mostrarlista(compras)

            radioPremium.addEventListener("click", function () {
                comisionenvio = 0.15;
                actualizaDatos()
                

            });
            radioExpress.addEventListener("change", function () {
               
                    comisionenvio = 0.07;
                    actualizaDatos()
                
            })
            
            radioStandard.addEventListener("click", function () {
                    comisionenvio = 0.05;
                    actualizaDatos()
                    
            });
            document.getElementById('fincompra').addEventListener('click', function () {
          
                

                vencimiento.classList.remove('is-invalid')
                nrobanco.classList.remove('is-invalid');
                codigo.classList.remove('is-invalid');
                nrotarjetacredito.classList.remove('is-invalid');
                calleinput.classList.remove('is-invalid');
                numeroinput.classList.remove('is-invalid');
                esquinainput.classList.remove('is-invalid');
                formapago.classList.remove('is-invalid');
                errorenvio.classList.remove('is-invalid');

                if(!radioExpress.checked &&!radioStandard.checked&&!radioPremium.checked){
                    errorenvio.style.display = "inline";
                    camposvacios=true;
                } else{
                    errorenvio.style.display = "none";
                    camposvacios=false;
                }
                console.log(formapago.innerHTML)
                if(formapago.innerHTML==='No se ha seleccionado.'){
                    formapago.classList.add('is-invalid');
                    camposvacios=true;
            
                }else if(formapago.innerHTML==='Transferencia Bancaria.'){
                        
                        if(nrobanco.value===""){
                            formapago.classList.add('is-invalid');
                            camposvacios=true;
                        }
                }else if(formapago.innerHTML==='Tarjeta de Crédito.'){
                        if(vencimiento.value===""|| nrotarjetacredito.value==="" || codigo.value===""){
                            formapago.classList.add('is-invalid');
                            camposvacios=true;
                        }

                }

                /*
                La cantidad para cada artículo deberá estar definida y ser mayor a 0
                Deberá haberse seleccionado una forma de pago
                Los campos, para la forma de pago seleccionada, no podrán estar vacíos
            */         
            /*  Los campos calle, número y esquina, no podrán estar vacíos.
                Deberá estar seleccionada la forma de envío.*/

            //consulto por la calle
                if (calleinput.value === "") {
                calleinput.classList.add('is-invalid');
                camposvacios=true
                }   

                //Consulto por el numero de puerta
                if (numeroinput.value === "") {
                    numeroinput.classList.add('is-invalid');
                    camposvacios=true

                }
                //Consulto por la esquina
                if (esquinainput.value ==="") {
                    esquinainput.classList.add('is-invalid');
                    camposvacios=true
                }
                for(inp of losinput) {
                    inp.classList.remove('is-invalid');
                    if(inp.value<=0){
                        inp.classList.add('is-invalid');
                        camposvacios=true
                    }
                }
                if(!camposvacios){
                    mostrarAlertaExitosa(); 
                }



            });
            document.getElementById('transbank').addEventListener('click',function(){
                formaPago.innerHTML='Transferencia Bancaria.'
                vencimiento.value="";    
                nrotarjetacredito.value="";
                nrobanco.value="";
                codigo.value="";

                nrobanco.disabled=false;
                vencimiento.disabled=true;
                codigo.disabled=true;
                nrotarjetacredito.disabled=true;
            })
            document.getElementById('tarjetacredito').addEventListener('click',function(){
                formaPago.innerHTML='Tarjeta de Crédito.'
                
                vencimiento.value="";    
                nrotarjetacredito.value="";
                nrobanco.value="";
                codigo.value="";

                vencimiento.disabled=false;              
                nrotarjetacredito.disabled=false;             
                codigo.disabled=false; 
                nrobanco.disabled=true;

            })

   document.getElementById('limpiarcarrito').addEventListener('click',function(){
    compras=[];
    localStorage.setItem("buys",JSON.stringify(compras));
    mostrarlista(compras)
   })    



})