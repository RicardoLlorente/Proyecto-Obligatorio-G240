//array donde se cargarán los datos recibidos con los productos de la categoria deseada:
let ProductosCategoria = [];
const ORDER_ASC_BY_COST = ">";
const ORDER_DESC_BY_COST = "<";
const ORDER_BY_PROD_SOLDCOUNT = "Vendidos";
let CriterioActual = undefined;
let mincost = undefined;
let maxcost = undefined;


function OrdenaProductos(criterio, Objeto) {
    let result = [];
    if (criterio === ORDER_ASC_BY_COST) {
        result = Objeto.products.sort(function (a, b) {
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
            if (acost > bcost) { return -1; }
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
    let Nombre = Categoria.catName;
    alert(Nombre)
    document.getElementById("parrafo").innerHTML += Categoria.catName + '.';

    for (let i = 0; i < Categoria.products.length; i++) {
        let Productos = Categoria.products[i];
        if (((mincost == undefined) || (mincost != undefined && parseInt(Productos.cost) >= mincost)) &&
            ((maxcost == undefined) || (maxcost != undefined && parseInt(Productos.cost) <= maxcost))) {
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action prod">
            <div class="row ">
                <div class="col-3">
                    <img src="` + Productos.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ Productos.name + " - " + Productos.currency + " " + Productos.cost + `</h4> 
                        <p class="desc"> `+ Productos.description + `</p> 
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
/* https://github.com/angimenez/EjerciciosSort
from Capacitador_JaP_1 to everyone:    10:22 AM
https://github.com/angimenez/EjerciciosFilter */
function OrdenaYMuestra(CriterioDeOrden, productos) {
    CriterioActual = CriterioDeOrden;
    if (productos != undefined) {
        ProductosCategoria = productos;
    }
    ProductosCategoria.products = OrdenaProductos(CriterioActual, ProductosCategoria);
    //Muestro las categorías ordenadas
    MostrarCategoria(ProductosCategoria);
}
function BuscaYMuestra(producto) {
    let filter, productos, nombre,desc, i;
    filter = producto.toUpperCase();
    productos = document.getElementsByClassName("prod");
    for (i = 0; i < productos.length; i++) {
        nombre = productos[i].getElementsByTagName("h4")[0];
        desc = productos[i].getElementsByClassName("desc")[0];
        console.log(nombre);
        if (nombre) {
            if ((nombre.innerHTML.toUpperCase().indexOf(filter) > -1)||(desc.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                productos[i].style.display = "";
            } else {
                productos[i].style.display = "none";
            }
        }

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
    document.getElementById("buscar").addEventListener("input", function () {
        let ProductoBuscado = document.getElementById('buscar').value;
        console.log(ProductoBuscado);
        //console.log(ProductosCategoria.products);
        BuscaYMuestra(ProductoBuscado);
    });
});



