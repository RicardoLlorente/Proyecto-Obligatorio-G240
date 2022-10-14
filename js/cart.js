
let infoCarrito;
let cant_art = 0;
let cant_cada=[];
let subtotales=[];

let preciounitario = [];
let currency = [];
let losinput = [];
let comprasNuevas = [];


function mostrarlista(carro) {
    let articulos = carro.articles;
    for (let articulo of articulos) {
        cant_art++;
        let i = cant_art - 1;
        cant_cada[i]=1;
        currency[i] = articulo.currency;
        preciounitario[i] = articulo.unitCost;
        document.getElementById("arcitulocomprado").innerHTML += `
                <tr class="cursor-active">
                    <td ><img src="${articulo.image}" alt="" class="img-cart"></td>

                    <td><p >${articulo.name}</p></td>

                    <td><p> ${currency[i] + ' ' + preciounitario[i]}</p></td>

                   
                    <td> 
                        <div class="col-md-3 mx-auto md-3">
                            <input type="number" name="productCountInput" class="form-control inputcount" id="productCountInput`+ i + `"  required value="1" 
                            min="1">
                        </div> 
                    </td>
            
                    <td><p ><strong id="subtotal`+ i + `"> ` + currency[i] + ' ' + preciounitario[i]; `</strong></p>
                   
                    </td>
                 
                
    
                    </tr>
                `
                subtotales[i]=preciounitario[i];
                 /* si la moneda es dolar 
                            totaldolar+=subtotal[k]
                            totalpesos+=subtotal[k]*41.23
                        si la moneda es pesos
                            totaldolar+=subtotal[k]/41.23
                            totalpesos+=subtotal[k] */

    }
    
    losinput = document.getElementsByClassName('inputcount');
    
}






document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL + USER_id + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoCarrito = resultObj.data;
            comprasNuevas = JSON.parse(localStorage.getItem("newBuys"));
            if (comprasNuevas != null) {
                infoCarrito.articles = infoCarrito.articles.concat(comprasNuevas);
            } else {
                comprasNuevas = [];
            }

            mostrarlista(infoCarrito);
             
            console.log(cant_cada)
            for (let k = 0; k < losinput.length; k++) {
                losinput[k].addEventListener('change', function () {
                /* si la moneda es dolar 
                            totaldolar-=subtotal[k]
                            totalpesos-=subtotal[k]*41.23
                        si la moneda es pesos
                            totaldolar-=subtotal[k]/41.23
                            totalpesos-=subtotal[k] */
                    cant_cada[k]=parseInt(this.value);
                    subtotales[k]=cant_cada[k]*preciounitario[k];
                    document.getElementById('subtotal' + k).innerHTML = currency[k] + ' ' + subtotales[k];
                    /* si la moneda es dolar 
                            totaldolar+=subtotal[k]
                            totalpesos+=subtotal[k]*41.23
                        si la moneda es pesos
                            totaldolar+=subtotal[k]/41.23
                            totalpesos+=subtotal[k] */
                    console.log(cant_cada)
                })
            
            }

           
        }
    });
    document.getElementById('limpiarcarrito').addEventListener('click', function () {
        infoCarrito = [];
        comprasNuevas = [];
        localStorage.setItem('newBuys', JSON.stringify(comprasNuevas));
        document.getElementById('arcitulocomprado').remove();
        window.location = "cart.html"

    })




})
