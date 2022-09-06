                ////////////////////////////////////
                /////V̳a̳r̳i̳a̳b̳l̳e̳s̳ y̳ C̳o̳n̳s̳t̳a̳n̳t̳e̳s̳ ////////
                /////////u̳t̳i̳l̳i̳z̳a̳d̳a̳s̳/////////////////
                ////////////////////////////////////

let ListadeProductos = [];//array donde se cargarán los datos recibidos con los productos de la categoria deseada:

////Constantes para los criterios de orden en los filtros
const ORDENAR_ASC_POR_COSTO = ">";
const ORDENAR_DESC_POR_COSTO= "<";
const ORDENAR_POR_CANT_VEND = "Vendidos";

///variables para mostrar productos solo en un determinado rango de precios 
let CostoMinimo = undefined;
let CostoMaximo = undefined;


    ///////////////////////////////////////////////////////////////////
    ///////////B̳l̳o̳q̳u̳e̳ d̳e̳ f̳u̳n̳c̳i̳o̳n̳e̳s̳ u̳t̳i̳l̳i̳z̳a̳d̳a̳s̳ e̳n̳ l̳o̳s̳ e̳v̳e̳n̳t̳o̳s̳///////////
    ///////////////////////////////////////////////////////////////////


//Esta funcion recibe un objeto (ListaProd) y un criterio para ordenar 
//los productos del campo products de dicho Objeto

function OrdenaProductos(CriterioDeOrden, ListaProd) {
   
    let ProductosOrdenados = [];// Arreglo que tendra los productos luego de haberlos ordenados. 
    
    //En cada caso, dependiendo del criterio, ordeno los elementos del campo 
    // products del Objeto (usando la funcion sort) y luego los dejo almacenados en 
    // el arreglo llamado ProductosOrdenados.
    if (CriterioDeOrden === ORDENAR_ASC_POR_COSTO) {
        ProductosOrdenados = ListaProd.products.sort(function (a, b) {
            let costo1 = parseInt(a.cost);
            let costo2 = parseInt(b.cost);
            if (costo1 < costo2) { return -1; }
            if (costo1 > costo2) { return 1; }
            return 0;
        });
    } else if (CriterioDeOrden === ORDENAR_DESC_POR_COSTO) {
        ProductosOrdenados = ListaProd.products.sort(function (a, b) {
            let costo1 = parseInt(a.cost);
            let costo2 = parseInt(b.cost);
            if (costo1 > costo2) { return -1; }
            if (costo1 < costo2) { return 1; }
            return 0;
        });
    } else if (CriterioDeOrden === ORDENAR_POR_CANT_VEND) {
        ProductosOrdenados = ListaProd.products.sort(function (a, b) {
            let cantvend1 = parseInt(a.soldCount);
            let cantvend2 = parseInt(b.soldCount);
            if (cantvend1 > cantvend2) { return -1; }
            if (cantvend1 < cantvend2) { return 1; }
            return 0;
        });
    }
    //Le asigno el arreglo ProductosOrdenados, que ya tendra los productos 
    //ordenados con el orden deseado, al campo products de la variable global ListadeProductos.
    ListadeProductos.products=ProductosOrdenados;
}
function setCatID(id) {
    localStorage.setItem("ID", id);
    window.location = "product-info.html"
}

//función que recibe un arreglo con los productos, y los muestra en pantalla usando metodo innerHTML
function MostrarListaProductos(ListaProd) {
    let htmlContentToAppend = "";

    for (let i = 0; i < ListaProd.products.length; i++) {
        let Productos = ListaProd.products[i];

        if (((CostoMinimo == undefined) || (CostoMinimo != undefined && parseInt(Productos.cost) >= CostoMinimo)) &&
            ((CostoMaximo == undefined) || (CostoMaximo != undefined && parseInt(Productos.cost) <= CostoMaximo))) {
            htmlContentToAppend += `
        <div onclick="setCatID(` + Productos.id + `)" class="list-group-item list-group-item-action cursor-active prod">
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
//Funcion que se usa para filtrar en tiempo real un producto buscado
function BuscaYMuestra(producto) {
    let nombre,desc;
    let filter = producto.toUpperCase();//Elemento que se quiere buscar pasado a mayusculas
    let productos = document.getElementsByClassName("prod");
    for (let articulo of productos) {
        nombre = articulo.getElementsByTagName("h4")[0];//Nombre de cada elemento de la lista de productos
        desc = articulo.getElementsByClassName("desc")[0];//Descripcion de cada elemento en la lista de productos
        
        //En el caso de que el producto buscado coincida en alguna letra con alguna de las letras del nombre 
        //o de la descricion de alguno de los productos lo sigo mostrando
        
        if ((nombre.innerHTML.toUpperCase().indexOf(filter) > -1)||(desc.innerHTML.toUpperCase().indexOf(filter) > -1)) {
            articulo.style.display = "";  
        } else {//En el caso de que no coincida dejo de mostrar dicho elemento
            articulo.style.display = "none";
        }
    }
}

        ////////////////////////////////////////////////////
        ///////////B̳l̳o̳q̳u̳e̳ d̳e̳ e̳v̳e̳n̳t̳o̳s̳ d̳e̳ l̳a̳ p̳a̳g̳i̳n̳a̳///////////
        ////////////////////////////////////////////////////
/* 
EJECUCIÓN:
-Al cargar la pagina se llama a la funcion getJSONData pasandole como parametro la direccion de los productos 
con el respectivo valor de catID que va a indicar si se quiere leer la seccion de autos, juguetes o muebles.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en ListaProdProductos.
-Por último, se llama a la funcion MostrarListaProductos() pasándole por parámetro el arreglo ListaProdProductos.
-Luego hay varios eventos configurados, los explicare en comentarios en cada parte respectivamente/
*/

document.addEventListener("DOMContentLoaded", function (e) {
    let cat_id = localStorage.getItem("catID");
    getJSONData(PRODUCTS_URL + cat_id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            ListadeProductos = resultObj.data;
            document.getElementById("parrafo").innerHTML += ListadeProductos.catName.toLowerCase() + '.';
            MostrarListaProductos(ListadeProductos);       
        }
    });

    //Este evento configura lo que pasa cuando se apreta en el boton para ordenar los productos 
    // de forma creciente desde el precio mas bajo al mas alto
    document.getElementById("OrdenPrecioAsc").addEventListener("click", function () {
        OrdenaProductos(ORDENAR_ASC_POR_COSTO,ListadeProductos);
        MostrarListaProductos(ListadeProductos);
    });
    //Este evento configura lo que pasa cuando se apreta en el boton para ordenar los productos 
    // de forma decreciente desde el precio mas alto al mas bajo
    document.getElementById("OrdenPrecioDesc").addEventListener("click", function () {
        OrdenaProductos(ORDENAR_DESC_POR_COSTO,ListadeProductos);
        MostrarListaProductos(ListadeProductos);
    });
    //Este evento configura lo que pasa cuando se apreta en el boton para ordenar los productos 
    // segun su relevancia,  desde el precio mas alto al mas bajo
    document.getElementById("Relevancia").addEventListener("click", function () {
        OrdenaProductos(ORDENAR_POR_CANT_VEND,ListadeProductos);
        MostrarListaProductos(ListadeProductos);
    });
    //Evento para filtrar en un rango de precios
    document.getElementById("FiltroRangoPrecios").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        CostoMinimo = document.getElementById("CostoMinimo").value;
        CostoMaximo = document.getElementById("CostoMaximo").value;

        if ((CostoMinimo != undefined) && (CostoMinimo != "") && (parseInt(CostoMinimo)) >= 0) {
            CostoMinimo = parseInt(CostoMinimo);
        }
        else {
            CostoMinimo = undefined;
        }

        if ((CostoMaximo != undefined) && (CostoMaximo != "") && (parseInt(CostoMaximo)) >= 0) {
            CostoMaximo = parseInt(CostoMaximo);
        }
        else {
            CostoMaximo = undefined;
        }
        MostrarListaProductos(ListadeProductos);
    });
    //Evento para limpiar la casilla de filtro en un rango de precios
    document.getElementById("LimpiarCasilla").addEventListener("click", function () {
        document.getElementById("CostoMinimo").value = "";
        document.getElementById("CostoMaximo").value = "";

        CostoMinimo = undefined;
        CostoMaximo = undefined;

        MostrarListaProductos(ListadeProductos);
    });
    //Evento para la busqueda en tiempo real
    document.getElementById("buscar").addEventListener("input", function () {
        let ProductoBuscado = document.getElementById('buscar').value;
        BuscaYMuestra(ProductoBuscado);
    });
});



