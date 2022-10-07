
let infoCarrito;
let cant_art=0;
let preciounitario=[];
let currency=[];
let losinput=[];
let comprasNuevas=[];

function mostrarlista(carro){
    let articulos=carro.articles;
    for(let articulo of articulos){
    cant_art++;
    let i=cant_art-1;
    currency[i]=articulo.currency;
    preciounitario[i]=articulo.unitCost;
        document.getElementById("arcitulocomprado").innerHTML+=`
                <tr class="cursor-active">
                    <td ><img src="${articulo.image}" alt="" class="img-cart"></td>

                    <td><p >${articulo.name}</p></td>

                    <td><p> ${ currency[i]+' '+preciounitario[i]}</p></td>

                   
                    <td> 
                        <div class="col-md-3 mx-auto md-3">
                            <input type="number" name="productCountInput" class="form-control inputcount" id="productCountInput`+i+`"  required value="1" 
                            min="1">
                        </div> 
                    </td>
            
                    <td><p ><strong id="subtotal`+i+`"> `+currency[i]+' '+preciounitario[i];`</strong></p>
                   
                    </td>
                 
                

                </tr>
                `
        
    }
    losinput=document.getElementsByClassName('inputcount');
}







document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL + USER_id + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoCarrito = resultObj.data;
            comprasNuevas=JSON.parse(localStorage.getItem("newBuys"));
            if (comprasNuevas != null) {
                infoCarrito.articles = infoCarrito.articles.concat(comprasNuevas);
            } else {
                comprasNuevas = [];
            }
            mostrarlista(infoCarrito);
            for(let k=0;k<losinput.length;k++){
                losinput[k].addEventListener('change',function(){
                    document.getElementById('subtotal'+k).innerHTML=currency[k]+' '+this.value*preciounitario[k];
            })
        }
        
        document.getElementById('limpiarcarrito').addEventListener('click',function(){
            infoCarrito=[];
            comprasNuevas=[];
            localStorage.setItem('newBuys', JSON.stringify(comprasNuevas));
            document.getElementById('arcitulocomprado').remove();
            window.location = "cart.html"

        })
        
        }
    });

    
    
})






function borrar_o_no() {
        for (let i = 0; i < cant_art; i++) {
                document.getElementById("cruz" + i).addEventListener('click', function (e) {
                    document.getElementById("coment" + los_id[i]).remove();
                    com_del_usuario.splice(i, 1);
                    ListadeComentarios.splice(los_id[i] - 1, 1);
                    los_id.splice(i, 1);
                    ListaCommentNew = ListadeComentarios.slice(com_ant, ListadeComentarios.length);
                    localStorage.setItem('new_comments', JSON.stringify(ListaCommentNew));
                    localStorage.setItem('comments', JSON.stringify(ListadeComentarios));
                    localStorage.setItem('Comentarios del usuario', JSON.stringify(com_del_usuario));
                })
            }
        }