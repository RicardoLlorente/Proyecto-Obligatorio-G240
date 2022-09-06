let ListadeProductos = []

function MostrarInfoProductos(ListaProd) {
    
    let htmlContentToAppend = "";
    let id=localStorage.getItem("ID");
    let Productos=ListaProd.products;
    let categoria=ListaProd.catName;

    Productos.forEach(prod =>{
        if(prod.id == id){
            alert("aca va lo que tengo que hacer en info");
            
            htmlContentToAppend = `
            <div class=" p-4">
            <h2>${prod.name}</h2><br>
            <hr>

            <p><strong>Precio</strong><br>${prod.currency}${prod.cost}</p>
            <p><strong>Descripcion</strong><br>${prod.description}</p>
            <p><strong>Categoria</strong><br>${categoria}</p>
            <p><strong>Cantidad de vendidos</strong><br>${prod.soldCount}</p>
            <p><strong>Imágenes Ilustrativas</strong><br></p>
            <div class="row justify-content-md-center">
            <div class="row">
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
       
            
            
            `




            }
        });
        document.getElementById("cat-info-container").innerHTML=htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function (e) {
    let cat_id = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + cat_id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            ListadeProductos = resultObj.data;
            MostrarInfoProductos(ListadeProductos);       
        }
    });



})
