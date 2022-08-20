//array donde se cargarán los datos recibidos con los productos de la categoria deseada:
let ProductosCategoria = [];

//función que recibe un arreglo con los productos, y los muestra en pantalla usando un DOM
function MostrarCategoria(Categoria) {
    let htmlContentToAppend = "";

    for (let i = 0; i < Categoria.products.length; i++) {
        let Productos = Categoria.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + Productos.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ Productos.name + " - " + Productos.currency + " " + Productos.cost + `</h4> 
                        <p> `+ Productos.description + `</p> 
                        </div>
                        <small class="text-muted">` + Productos.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}


/* 
EJECUCIÓN:
-Al cargar la pagina se llama a la funcion getJSONData pasandole como parametro la direccion de los productos 
con el respectivo valor de catID que va a indicar si se quiere leer la seccion de autos, juguetes o muebles.

-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en CategoriaProductos.

-Por último, se llama a la funcion MostrarCategoria() pasándole por parámetro el arreglo CategoriaProductos.

*/

document.addEventListener("DOMContentLoaded", function (e) {

    let id = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductosCategoria = resultObj.data;
            MostrarCategoria(ProductosCategoria);
        }
    });

    /*Seccion para configurar el boton de cerrar sesion de la barra de navegacion */

    document.getElementById("Cerrar_Sesión").addEventListener("click", function () {
        sessionStorage.clear();
        location.href = "login.html"
    });
});