//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(() => {
    //Este arreglo es para generar textos de prueba
    let textosDePrueba = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
        "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
        "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
        "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
    ]

    //Genera dinamicamente los JSON de prueba para esta evaluacion,
    //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

    var contador = 1;
    for (let i = 0; i < 5; i++) { //Generar 5 categorias
        let categoria = {
            nombreCategoria: "Categoria " + i,
            descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
            aplicaciones: []
        };
        for (let j = 0; j < 10; j++) { //Generar 10 apps por categoria
            let aplicacion = {
                codigo: contador,
                nombre: "App " + contador,
                descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                icono: `img/app-icons/${contador}.webp`,
                instalada: contador % 3 == 0 ? true : false,
                app: "app/demo.apk",
                calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                descargas: 1000,
                desarrollador: `Desarrollador ${(i+1)*(j+1)}`,
                imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
                comentarios: [
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Juan" },
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Pedro" },
                    { comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))], calificacion: Math.floor(Math.random() * (5 - 1)) + 1, fecha: "12/12/2012", usuario: "Maria" },
                ]
            };
            contador++;
            categoria.aplicaciones.push(aplicacion);
        }
        categorias.push(categoria);
    }
    console.log(categorias);


})();

var localStorage = window.localStorage;
localStorage.clear();

for (let i = 0; i < categorias.length; i++) {
    localStorage.setItem(i, JSON.stringify(categorias[i]));
}

for (let i = 0; i < localStorage.length; i++) {
    let categoria = JSON.parse(localStorage.getItem(localStorage.key(i)));
    document.getElementById('categoria').innerHTML +=
        `<option value="${localStorage.key(i)}">${categoria.nombreCategoria}</option>`;
}

for (let i = 1; i <= 50; i++) {
    document.getElementById('icono').innerHTML +=
        `<option value="img/app-icons/${i}.webp">Imagen ${i}</option>`;
    document.getElementById('icono').value = null;
}

document.getElementById('icono').addEventListener('change', mostrarImagen());

function mostrarImagen() {
    if (document.getElementById('icono').value != null) {
        document.getElementById('appImagen').setAttribute('src', document.getElementById('icono').value);

    } else {
        document.getElementById('appImagen').setAttribute('src', 'img/user.webp');

    }
}

document.getElementById('categoria').addEventListener('change', seleccionarCategoria());

function seleccionarCategoria() {
    document.getElementById('aplicacionesC').innerHTML = "";
    console.log('Categoria seleccionada:', document.getElementById('categoria').value);
    generarAplicacion(JSON.parse(localStorage.getItem(document.getElementById('categoria').value)));

}

function generarAplicacion(categoria) {
    let cardapps;
    categoria.aplicaciones.forEach(function(aplicacion, i) {

        let estrellas = '';
        for (let i = 0; i < aplicacion.calificacion; i++) {
            estrellas += '<i class="fas fa-star"></i>';
        }
        for (let i = 0; i < 5 - aplicacion.calificacion; i++) {
            estrellas += '<i class="far fa-star" ></i>';
        }
        cardapps +=
            `<div class="my-4 col-lg-2 col-md-3 col-6">
                <div class="card-shadow card" >
                    <img src="${aplicacion.icono}" onclick="detalleApp(${aplicacion.codigo})"class="card-img-top " alt="... ">
                    <div class="card-body">
                        <h5 class="card-title ">${aplicacion.nombre}</h5>
                        <p class="card-text ">${aplicacion.desarrollador} </p>
                        <div class="my-2">
                            ${estrellas}
                        </div>
                        <div class="my-2">
                            <button class="btn btn-outline-danger" onclick="eliminarApp(${i})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;

    })
    document.getElementById('aplicacionesC').innerHTML = cardapps;
}

function eliminarApp(indice) {
    console.log('La app a eliminar es:', indice);
    let categoria = JSON.parse(localStorage.getItem(document.getElementById('categoria').value));
    let codigo = document.getElementById('categoria').value;
    localStorage.setItem(codigo, JSON.stringify(categoria));
    categoria.aplicaciones.splice(indice, 1);
    generarAplicacion(categoria);
}

function detalleApp(idAppSeleccionada) {
    $('#modal-detalle').modal('show');
    console.log('Categoria seleccionada', document.getElementById('categoria').value);
    console.log('Codigo de Aplicacion:', idAppSeleccionada);

    let categoria = JSON.parse(localStorage.getItem(document.getElementById('categoria').value));

    for (let i = 0; i < categoria.aplicaciones.length; i++) {

        if (idAppSeleccionada == categoria.aplicaciones[i].codigo) {
            
            let app = categoria.aplicaciones[i];
            console.log('Aplicacion en modal:', app);
            document.getElementById('appnombre').innerHTML = app.nombre;
            document.getElementById('appimagen').setAttribute('src', app.icono);
            document.getElementById('appdesarollador').innerHTML = app.desarrollador;
            document.getElementById('appdescripcion').innerHTML = app.descripcion;
            let estrellas = '';
            for (let i = 0; i < app.calificacion; i++) {
                estrellas += '<i class="fas fa-star"></i>';
            }
            for (let i = 0; i < 5 - app.calificacion; i++) {
                estrellas += '<i class="far fa-star" ></i>';
            }
            document.getElementById('appestrellas').innerHTML = estrellas;
        }
    }

}

function nuevaAplicacion() {
    $('#modal-nueva-app').modal('show');
    let id = document.getElementById('categoria').value;
    console.log('modal abierto para nueva app');
    let buttons;
   buttons =
        `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-warning"  onclick="guardarApp(${id});">Guardar</button>`;
    document.getElementById('footmodal').innerHTML =buttons;
}

function guardarApp(categoriaSeleccionada) {
    let categoria = JSON.parse(localStorage.getItem(document.getElementById('categoria').value));
    console.log('La app se guardara en la', categoriaSeleccionada);
    const app = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        icono: document.getElementById('icono').value,
        calificacion: document.getElementById('calificacion').value,
        descargas: document.getElementById('descargas').value,
        desarrollador: document.getElementById('desarrollador').value,
    }
    categoria.aplicaciones.push(app);
    localStorage.setItem(categoriaSeleccionada, JSON.stringify(categoria));
    generarAplicacion(categoria);
    $('#modal-nueva-app').modal('hide');

}