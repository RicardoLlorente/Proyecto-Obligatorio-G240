let ListadeProductos = []
let prod_id;
let cat_id;
let coment_new=[];
let cant_coment=0;


function agregar(){
    let comentario=document.getElementById('opinión').value;
    let puntuacion=document.getElementById('puntaje').value;
    let hora=new Date();
    let time=hora.toLocaleString().replace(',','');
  /*   if(comentario!=''){
        
        let objetoComentario ={"product": localStorage.getItem('prodID'),
            "score": puntuacion,
            "description": comentario,
            "user": localStorage.getItem('mail'),
            "dateTime":time 
            }
        coment_new[cant_coment]=objetoComentario;
        cant_com ent+=1;

    }*/
   
    
}






function puntuación(puntos){
    var estrellas='';
    for(let i=0; i<=5; i++){
        if(i<=puntos){
            estrellas+='<i class="fas fa-star checked"></i>'
        }else{
            estrellas+='<i class="far fa-star "></i>'
        }        
    }
    return estrellas;
}
function MostrarInfoProductos(ListaProd) {
    
    let htmlContentToAppend = "";
    let Productos=ListaProd.products;
    let categoria=ListaProd.catName;

    Productos.forEach(prod =>{
        if(prod.id == prod_id){
            
            
            htmlContentToAppend = `
           
            <h2>${prod.name}</h2><br>
            <hr>

            <p><strong>Precio</strong><br>${prod.currency} ${prod.cost}</p>
            <p><strong>Descripcion</strong><br>${prod.description}</p>
            <p><strong>Categoria</strong><br>${categoria}</p>
            <p><strong>Cantidad de vendidos</strong><br>${prod.soldCount}</p>
            <p><strong>Imágenes Ilustrativas</strong><br></p>
            <div class="row justify-content-md-center">
                <div class="col-3">
                    <img src="`+prod.image+`" alt="product image"class="img-thumbnail">
                </div>
                
                <div class="col">
                    <img src="`+prod.image.replace('1.','2.')+`" alt="product image"class="img-thumbnail">
                </div>
                
                <div class="col">
                    <img src="`+prod.image.replace('1.','3.')+`" alt="product image"class="img-thumbnail">
                </div>
                    
                <div class="col">
                    <img src="`+prod.image.replace('1.','4.')+`" alt="product image"class="img-thumbnail">
                </div>
            </div>  
            
            <div>
            <br><br><br><br> 
            <h4>Comentarios</h4>            
            </div>
            
            <ul class="list-group mb-3" id="cat-comment-container">
            
            </ul>

            <h4>Comentar:</h4>  
                <div class="row">
                <div class="col-4">
                        <label for="opinion">Tu opinión:</label>
                        <textarea name="opinion" class="form-control " id="opinión"></textarea>
                </div>
                <div class="row">
                <div class="col-2 my-3">
                <label for="puntaje" class="ml-auto">Tu puntuación</label>
                <select name="puntaje" class="custom-select form-select d-block w-100" id="puntaje">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                </div>
                </div>
               
                `
            }
        });
        document.getElementById("cat-info-container").innerHTML=htmlContentToAppend;
}/* 
btn btn-primary my-3 */
function MostrarComentarios(ListaComment) {
    let comentario
    let htmlContentToAppend = "";
    for(let i=0; i<ListaComment.length; i++ ){
        comentario=ListaComment[i];
        htmlContentToAppend= `
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0"> <strong>`+comentario.user+`</strong> `+comentario.dateTime+` `+puntuación(comentario.score)+`</h6>

                  <small class="text-muted">`+comentario.description+`</small>
                </div>
              </li>
            `
        document.getElementById("cat-comment-container").innerHTML+=htmlContentToAppend;
        
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    prod_id = localStorage.getItem("prodID");
    cat_id = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + cat_id + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ListadeProductos = resultObj.data;
            MostrarInfoProductos(ListadeProductos);       
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prod_id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            ListadeComentarios = resultObj.data;
            MostrarComentarios(ListadeComentarios);       
        }
    });
    let envio=document.getElementById("enviar");
    envio.addEventListener('click',()=>{ 
        agregar();
        MostrarComentarios(coment_new);
        coment_new='';
    })

})
