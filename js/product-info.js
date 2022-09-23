                ////////////////////////////////////
                /////V̳a̳r̳i̳a̳b̳l̳e̳s̳ y̳ C̳o̳n̳s̳t̳a̳n̳t̳e̳s̳ ////////
                /////////u̳t̳i̳l̳i̳z̳a̳d̳a̳s̳/////////////////
                ////////////////////////////////////
let ListadeComentarios=[];
let Producto = [];
let prod_id,cat_id;
let los_id=[];
let coment_new=[];
let ListaCommentNew=[];
let com_del_usuario=[];
let cant_coment=0;
let cant_new_comm=0;
let com_ant;

    ///////////////////////////////////////////////////////////////////
    ///////////B̳l̳o̳q̳u̳e̳ d̳e̳ f̳u̳n̳c̳i̳o̳n̳e̳s̳ u̳t̳i̳l̳i̳z̳a̳d̳a̳s̳ e̳n̳ l̳o̳s̳ e̳v̳e̳n̳t̳o̳s̳///////////
    ///////////////////////////////////////////////////////////////////

function AgregaCero(tiempo){
    if(tiempo<10){
        return '0'+tiempo;
    } else {
        return tiempo;
    }

}
function trans_fecha(fecha){
    let Año = fecha.getFullYear()
    let Mes = AgregaCero(fecha.getMonth());
    let Dia = AgregaCero(fecha.getDate());
    let horas = AgregaCero(fecha.getHours());
    let min = AgregaCero(fecha.getMinutes());
    let Seg = AgregaCero(fecha.getSeconds())

    return Año+'-'+Mes+'-'+Dia +' '+horas+':'+min+':'+Seg;
}
function agregar(){
    let comentario=document.getElementById('opinión').value;
    let puntuacion=parseInt(document.getElementById('puntaje').value);
    let fecha=new Date();
    
    let time=trans_fecha(fecha);
    if(comentario!=''){
        
        let objetoComentario ={"product": parseInt(localStorage.getItem('prodID')),
            "score": puntuacion,
            "description": comentario,
            "user": localStorage.getItem('mail'),
            "dateTime":time 
            }
        cant_new_comm+=1;
        coment_new.push(objetoComentario);
        MostrarComentarios(coment_new);
        
    }
   
    
}
function puntuación(puntos){
    var estrellas='';
    for(let i=0; i<5; i++){
        if(i<puntos){
            estrellas+='<i class="fas fa-star checked"></i>'
        }else{
            estrellas+='<i class="far fa-star "></i>'
        }        
    }
    return estrellas;
}
function MostrarInfoProductos(prod) {
    
    let htmlContentToAppend = "";
    let htmlContentTorelated = "";
     htmlContentToAppend = `
           
            <h2>${prod.name}</h2><br>
            <hr>

            <p><strong>Precio</strong><br>${prod.currency} ${prod.cost}</p>
            <p><strong>Descripcion</strong><br>${prod.description}</p>
            <p><strong>Categoria</strong><br>${prod.category}</p>
            <p><strong>Cantidad de vendidos</strong><br>${prod.soldCount}</p>
            <p><strong>Imágenes Ilustrativas</strong><br></p>
            <div class="row justify-content-md-center">`
            
            console.log(prod)
            for(image of prod.images){
            
            htmlContentToAppend+=`
                <div class="col">
                    <img src="`+image+`" alt="product image" class="img-thumbnail">
                </div>
                
             `
            }
            htmlContentToAppend+= `</div>
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
            htmlContentTorelated+=`
            <h4>Productos relacionados</h4> 
            <div class="row justify-content-md-start">
            `
            let i=0;
            for(let related of prod.relatedProducts){

                htmlContentTorelated+=`
                    <div class="col-3">
                        <img src="`+related.image+`" alt="product image" id="img`+i+`"  class="img-thumbnail">
                        <label for="img`+i+`">`+related.name+`</label>
                    </div>
                 `
                i++;
                }
            htmlContentTorelated+=`
                </div>
                `
        document.getElementById("cat-info-container").innerHTML=htmlContentToAppend;
        document.getElementById("cat-info-related").innerHTML+=htmlContentTorelated;
}
function CruzSoloUsuario(comentario,numcom){
    let logeado=localStorage.getItem('mail');
    let cruz=document.getElementById('cruz'+numcom);
    if(logeado!=comentario.user){
        cruz.remove();
     }else{
        com_del_usuario.push(comentario);
        los_id.push(numcom);
        localStorage.setItem('Comentarios del usuario',JSON.stringify(com_del_usuario));
    }
}
function MostrarComentarios(ListaComment) {
    let comentario
    let htmlContentToAppend = "";
    if(ListaComment!=null){
    for(let i=0; i<ListaComment.length; i++ ){
        comentario=ListaComment[i];
        if(comentario.product==prod_id){
        cant_coment+=1;
        
        htmlContentToAppend= `
                            <li class="list-group-item d-flex justify-content-between lh-condensed " id="coment`+cant_coment+`">
                                <div class="row w-100" >
                                    <div class="col">
                                        <div class="d-flex w-100 justify-content-between" >
                                                <h6 class="my-0"> <strong>`+comentario.user+`</strong> `+comentario.dateTime+` `+puntuación(comentario.score)+`  </h6><br>
                                        </div>
                                                <small class="text-muted">`+comentario.description+`</small>    
                                    </div>
                                                    
                                    
                                <div class="col-sm-2">
                                        <small class=""><a class="btn" 
                                        href="#" role="button" ><i class="fas fa-times-circle" 
                                        id="cruz`+cant_coment+`"></i></small></a>
                                </div>
                                </div>
                             </li>          
         `
        document.getElementById("cat-comment-container").innerHTML+=htmlContentToAppend;
        CruzSoloUsuario(comentario,cant_coment);
        }
    }
}
}
function borrar_o_no(){
    if(com_del_usuario!= []){
        for(let i=0;i<com_del_usuario.length;i++){
            console.log(ListadeComentarios);    
            console.log(com_del_usuario);
            console.log(los_id);                   
            if(document.getElementById("coment"+los_id[i])!=null){
                document.getElementById("cruz"+los_id[i]).addEventListener('click',function (e) {
                
                document.getElementById("coment"+los_id[i]).remove();
                
                console.log(com_del_usuario)
                com_del_usuario.splice(i,1);
                
                console.log("antes de");
                /* console.log(com_del_usuario)
                console.log(los_id)
                console.log(i) */
                ListadeComentarios.splice(los_id[i]-1,1);
                los_id.splice(i,1);
                ListaCommentNew=ListadeComentarios.slice(com_ant,ListadeComentarios.length);
                /* console.log("el despues")
                console.log(com_del_usuario)
                console.log(los_id)
                console.log(i) */
                localStorage.setItem('new_comments',JSON.stringify(ListaCommentNew));
                localStorage.setItem('comments',JSON.stringify(ListadeComentarios));
                localStorage.setItem('Comentarios del usuario',JSON.stringify(com_del_usuario));
            })}
        /* console.log(ListadeComentarios);    
        console.log(com_del_usuario);
        console.log(los_id); */
        }
    }
}
        ////////////////////////////////////////////////////
        ///////////B̳l̳o̳q̳u̳e̳ d̳e̳ e̳v̳e̳n̳t̳o̳s̳ d̳e̳ l̳a̳ p̳a̳g̳i̳n̳a̳///////////
        ////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function (e) {
    prod_id = localStorage.getItem("prodID");
    getJSONData(PRODUCT_INFO_URL + prod_id + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Producto = resultObj.data;
            MostrarInfoProductos(Producto);      
        }
    });
    
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prod_id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            ListadeComentarios = resultObj.data;
            console.log(ListadeComentarios[0].product)
            com_ant=ListadeComentarios.length;
            ListaCommentNew = JSON.parse(localStorage.getItem("new_comments"));
           
            if(ListaCommentNew!=null){
                console.log(ListaCommentNew[0].product)
                ListadeComentarios=ListadeComentarios.concat(ListaCommentNew);
            }else{
                ListaCommentNew=[];
            }
            
            MostrarComentarios(ListadeComentarios);
            console.log(ListadeComentarios);
            localStorage.setItem('comments',JSON.stringify(ListadeComentarios));
            borrar_o_no();   
        }   
    });

    document.getElementById("enviar").addEventListener('click',()=>{ 
        agregar();
        ListadeComentarios.push(coment_new[0]);
        ListaCommentNew.push(coment_new[0]);
        localStorage.setItem('new_comments',JSON.stringify(ListaCommentNew));
        coment_new=[]; 
        localStorage.setItem('comments',JSON.stringify(ListadeComentarios));
        
        borrar_o_no();
    })

    borrar_o_no();
    
})
