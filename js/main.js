//clase reportes, objetos
const clientes = []
cargarLocalStorage()

class Cliente {
    static id = 0
    constructor (nombre, email, dni, depto, ingresos, montoPrestamo, nroCuotas){
        this.id = ++Cliente.id,
        this.nombre = nombre,
        this.email = email,
        this.dni = dni,
        this.depto = depto,
        this.ingresos = ingresos,
        this.montoPrestamo = montoPrestamo,
        this.nroCuotas = nroCuotas
        this.montoCuotas = this.getMontoCuota()
    }
    getMontoCuota = () => {
        return Number(this.montoPrestamo)/Number(this.nroCuotas)
    }
}


ingresarDatos = (e) => {
    e.preventDefault();
    let ingresarNombre = document.getElementById("nombre").value;
    let ingresarEmail = document.getElementById("email").value;
    let ingresarDni = document.getElementById("dni").value;
    let ingresarDepto = document.getElementById("depto").value;
    let ingresarIngresos = document.getElementById("ingresos").value;
    let ingresarPrestamo = document.getElementById("prestamo").value;
    let ingresarCuotas = document.getElementById("cuotas").value;

    let nuevoCliente = new Cliente(ingresarNombre, ingresarEmail, ingresarDni, ingresarDepto, ingresarIngresos, ingresarPrestamo, ingresarCuotas)
    clientes.push(nuevoCliente)

    //guardar en el local storage

    guardarLocalStorage(clientes)

    mostrarReporte(nuevoCliente)
}


function mostrarReporte(Cliente) {
        document.getElementById("reporteCompleto").style.display = "block";

        document.getElementById("reporteNombre").innerHTML = Cliente.nombre;
        document.getElementById("reporteEmail").innerHTML = Cliente.email;
        document.getElementById("reporteDni").innerHTML = Cliente.dni;
        document.getElementById("reporteDepto").innerHTML = Cliente.depto;
        document.getElementById("reporteMonto").innerHTML = Cliente.montoPrestamo;
        document.getElementById("reporteCuotas").innerHTML = Cliente.montoCuotas.toFixed(2);
}

let miReporte = document.getElementById("miReporte")
miReporte.addEventListener("submit", ingresarDatos)

document.getElementById("reporteCompleto").style.display = "none"



//Ver todos los reportes


// function crearReportes(Cliente) {

//     let nuevoDiv = document.createElement("div")
//     let valueNombre = document.createElement("p")
//     let labelNombre = document.createElement("p")

//     let labelParNombre = document.createTextNode("Nombre Cliente")
//     let contentParNombre = document.createTextNode(Cliente.nombre)

//     labelNombre.appendChild(labelParNombre)
//     valueNombre.appendChild(contentParNombre)

//     nuevoDiv.appendChild(labelNombre)
//     nuevoDiv.appendChild(valueNombre)

//     document.getElementById("reporteUsingCreate").appendChild(nuevoDiv)


// }

function crearReportes(Cliente) {
    //nodos padres
        let nuevoDiv = document.createElement("div")
        
        let labelNombre = document.createElement("p")
        let valueNombre = document.createElement("p")

        let labelEmail = document.createElement("p")
        let valueEmail = document.createElement("p")

        let labelDni = document.createElement("p")
        let valueDni = document.createElement("p")

        let labelDepto = document.createElement("p")
        let valueDepto = document.createElement("p")

        let labelPrestamo = document.createElement("p")
        let valuePrestamo = document.createElement("p")

        let labelCuotas = document.createElement("p")
        let valueCuotas = document.createElement("p")

        //nodoTexto
    
        let labelParNombre = document.createTextNode("Nombre:")
        let contentParNombre = document.createTextNode(Cliente.nombre)
        
        let labelParEmail = document.createTextNode("Email:")
        let contentParEmail = document.createTextNode(Cliente.email)

        let labelParDni = document.createTextNode("DNI:")
        let contentParDni = document.createTextNode(Cliente.dni)

        let labelParDepto = document.createTextNode("Depto:")
        let contentParDepto = document.createTextNode(Cliente.depto)

        let labelParPrestamo = document.createTextNode("Monto Préstamo:")
        let contentParPrestamo = document.createTextNode(Cliente.montoPrestamo)

        let labelParCuotas = document.createTextNode("Cuotas:")
        let contentParCuotas = document.createTextNode(Cliente.montoCuotas.toFixed(2))


    //crear nodos hijos
        labelNombre.appendChild(labelParNombre)
        valueNombre.appendChild(contentParNombre)

        labelEmail.appendChild(labelParEmail)
        valueEmail.appendChild(contentParEmail)

        labelDni.appendChild(labelParDni)
        valueDni.appendChild(contentParDni)

        labelDepto.appendChild(labelParDepto)
        valueDepto.appendChild(contentParDepto)

        labelPrestamo.appendChild(labelParPrestamo)
        valuePrestamo.appendChild(contentParPrestamo)

        labelCuotas.appendChild(labelParCuotas)
        valueCuotas.appendChild(contentParCuotas)


    //agregarlos al Padre
    
        nuevoDiv.appendChild(labelNombre)
        nuevoDiv.appendChild(valueNombre)

        nuevoDiv.appendChild(labelEmail)
        nuevoDiv.appendChild(valueEmail)

        nuevoDiv.appendChild(labelDni)
        nuevoDiv.appendChild(valueDni)

        nuevoDiv.appendChild(labelDepto)
        nuevoDiv.appendChild(valueDepto)

        nuevoDiv.appendChild(labelPrestamo)
        nuevoDiv.appendChild(valuePrestamo)

        nuevoDiv.appendChild(labelCuotas)
        nuevoDiv.appendChild(valueCuotas)

        document.getElementById("reporteUsingCreate").appendChild(nuevoDiv)
    }


function verTodosLosReportes(){
    document.getElementById("reporteCompleto").style.display = "none";
    let clientesLocal = obtenerLocalStorage()
    clientesLocal.forEach(cliente => {
        
        crearReportes(cliente)
        
    });
}

let verReportes = document.getElementById("todos")
verReportes.addEventListener("click", verTodosLosReportes)


//filtrar 1 reporte

const buscarReporte = document.getElementById("buscarReporte")
const listaResultado = document.getElementById("listaResultado")
const noResultados = document.getElementById("noresultados")

const usuarioBusqueda = () => {
    const busquedaNombre = buscarReporte.value.toLowerCase(); //var busquedaNombre captura lo que escribe el usuario
    const filtradoNombres = clientes.filter((nombres) => nombres.nombre.toLowerCase().startsWith(busquedaNombre));

    listaResultado.innerHTML = ""

    if(filtradoNombres.length === 0){
        noResultados.style.display = "block"
    } else {
        filtradoNombres.forEach((nombres) => {
            const li = document.createElement("li")
            li.textContent = nombres.nombre
            listaResultado.appendChild(li)
        })
        noResultados.style.display = "none"
    }

    

    if(buscarReporte.value === ""){
        listaResultado.innerHTML = ""   
    }
}

buscarReporte.addEventListener("input", usuarioBusqueda)

//Guardar reportes Local Storage

guardar.addEventListener("click", reporteGuardadoSwal)

function guardarLocalStorage(clientes) {

const guardarReporte = JSON.stringify(clientes)
localStorage.setItem("guardarReporte", guardarReporte)
}



function obtenerLocalStorage() {
    const reporteLocalStorage = localStorage.getItem("guardarReporte")
    const reporteObjeto = JSON.parse(reporteLocalStorage)
    return reporteObjeto
}

function cargarLocalStorage() {
    let clientesLocal = obtenerLocalStorage()

    if (clientesLocal != undefined 
        && clientesLocal != [] 
        && clientesLocal != null) {
            clientesLocal.forEach((el)=>{
                clientes.push(el)
            }) 
    } 
}