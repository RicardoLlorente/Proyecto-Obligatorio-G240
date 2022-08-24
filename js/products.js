//array donde se cargarán los datos recibidos con los productos de la categoria deseada:
let ProductosCategoria = [];
const ORDER_ASC_BY_COST = ">";
const ORDER_DESC_BY_COST = "<";
const ORDER_BY_PROD_SOLDCOUNT = "Vendidos";
let CriterioActual = undefined;
let mincost = undefined;
let maxcost = undefined;


function OrdenaProductos(criterio, array) {
    let result = [];
    if (criterio === ORDER_ASC_BY_COST) {
        result = array.products.sort(function (a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);
            if (acost < bcost) { return -1; }
            if (acost > bcost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.products.sort(function (a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);
            if (acost> bcost) { return -1; }
            if (acost < bcost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.products.sort(function (a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);
            if (asoldCount > bsoldCount) { return -1; }
            if (asoldCount < bsoldCount) { return 1; }
            return 0;
        });
    }

    return result;
}




//función que recibe un arreglo con los productos, y los muestra en pantalla usando un DOM
function MostrarCategoria(Categoria) {
    let htmlContentToAppend = "";

    for (let i = 0; i < Categoria.products.length; i++) {
        let Productos = Categoria.products[i];
        if (((mincost == undefined) || (mincost != undefined && parseInt(Productos.cost) >= mincost)) &&
            ((maxcost == undefined) || (maxcost != undefined && parseInt(Productos.cost) <= maxcost))) {
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
        `}
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
function OrdenaYMuestra(CriterioDeOrden, productos) {
    CriterioActual = CriterioDeOrden;

    if (productos != undefined) {
        ProductosCategoria = productos;
    }

    ProductosCategoria.products = OrdenaProductos(CriterioActual, ProductosCategoria);

    //Muestro las categorías ordenadas
    MostrarCategoria(ProductosCategoria);
}

/* 
EJECUCIÓN:
-Al cargar la pagina se llama a la funcion getJSONData pasandole como parametro la direccion de los productos 
con el respectivo valor de catID que va a indicar si se quiere leer la seccion de autos, juguetes o muebles.

-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en CategoriaProductos.

-Por último, se llama a la funcion MostrarCategoria() pasándole por parámetro el arreglo CategoriaProductos.

*/

document.addEventListener("DOMContentLoaded", function (e) {
    let usuario = sessionStorage.getItem("mail");
    if (usuario == null) {
        alert("Perdon, necesita logearse.")
        alert("Redireccionando a la pagina de login.")
        location.href = "login.html";
    }else{
        document.getElementById("usuario").innerHTML=usuario;
    }
    /*Seccion para configurar el boton de cerrar sesion de la barra de navegacion */
    document.getElementById("Cerrar_sesion").addEventListener("click", function () {
        sessionStorage.clear();
        location.href = "login.html"
    })

    let id = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductosCategoria = resultObj.data;
            MostrarCategoria(ProductosCategoria);
        }
    });
    document.getElementById("sortByMoneyasc").addEventListener("click", function () {
        OrdenaYMuestra(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortByMoneydesc").addEventListener("click", function () {
        OrdenaYMuestra(ORDER_DESC_BY_COST);
    });

    document.getElementById("Rel.").addEventListener("click", function () {
        OrdenaYMuestra(ORDER_BY_PROD_SOLDCOUNT);

    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        mincost = undefined;
        maxcost = undefined;

        MostrarCategoria(ProductosCategoria);
    });
    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        mincost = document.getElementById("rangeFilterCostMin").value;
        maxcost = document.getElementById("rangeFilterCostMax").value;

        if ((mincost != undefined) && (mincost != "") && (parseInt(mincost)) >= 0) {
            mincost = parseInt(mincost);
        }
        else {
            mincost = undefined;
        }

        if ((maxcost != undefined) && (maxcost != "") && (parseInt(maxcost)) >= 0) {
            maxcost = parseInt(maxcost);
        }
        else {
            maxcost = undefined;
        }
        MostrarCategoria(ProductosCategoria);
    });

});
