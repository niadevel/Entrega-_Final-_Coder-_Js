//const

const clientes = []
const buscarReporte = document.getElementById("buscarReporte")
const listaResultado = document.getElementById("listaResultado")
const noResultados = document.getElementById("noresultados")

cargarLocalStorage()

//objeto
let porcentaje = 1
class Cliente {
    
    constructor (nombre, email, dni, depto, ingresos, montoPrestamo, nroCuotas){
        this.id = clientes.length + 1,
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
        if (DataBankToday != null){
            porcentaje = (100+DataBankToday.tasa)/100
        }
        return Number((this.montoPrestamo)*porcentaje)/Number(this.nroCuotas)
    }
}

class DataBank {
    constructor (nombre, pais, fechaActuallizacion, tasa){
        this.nombre = nombre,
        this.pais = pais,
        this.fechaActuallizacion = fechaActuallizacion,
        this.tasa = tasa
    }
}

//funciones

ingresarDatos = (e) => {
    e.preventDefault(); 

    document.getElementById("reporteUsingCreate").style.display = "none";

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


function crearReportesCartas(clientes){

    clientes.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col-lg-3','col-md-4','mb-4', 'tarjeta')
          div.innerHTML = `
            <div class="card" style="width: 30rem;">
                <div class="card-header">
                    Id Reporte : ${element.id}
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Nombre y Apellido: ${element.nombre}</li>
                <li class="list-group-item">Email: ${element.email}</li>
                <li class="list-group-item">DNI: ${element.dni}</li>
                <li class="list-group-item">Departamento: ${element.depto}</li>
                <li class="list-group-item">Monto: ${element.montoPrestamo}</li>
                <li class="list-group-item">Cuotas: ${element.montoCuotas}</li>
                </ul>
            </div>
        `
        document.getElementById("reporteUsingCreate").appendChild(div)
    })

    document.getElementById("reporteUsingCreate").style.display = "block";
}

//Ver todos los reportes

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
        document.getElementById("reporteUsingCreate").style.display = "block";
    }


function verTodosLosReportes(){
    document.getElementById("reporteCompleto").style.display = "none";
   
    let clientesLocal = obtenerLocalStorage()
    if (clientesLocal != null){
        crearReportesCartas(clientesLocal)
    }else{
        //TODO nnotificar que nno hay reportes
    }
}


//filtrar 1 reporte

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

//Guardar reportes Local Storage

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

//vaciar formulario
function vaciarFormulario() {
  document.getElementById("reporteCompleto").style.display = "none"
  document.getElementById("reporteUsingCreate").style.display = "none"
}

let DataBankToday

//fetch reportes json
function getInterestRate(e){
    let pais = e.srcElement.innerHTML
    const request = new Request("https://api.api-ninjas.com/v1/interestrate?country="+pais, {
        method: "GET",
        headers: { 'X-Api-Key': 'pJp+tnL6QVv74yBvC1Q+jA==rWk9amRVGRaO19lr'},
        contentType: 'application/json',
      });
      
    fetch(request)
      .then(respuesta => {
        return respuesta.json();
      })
      .then( rates => {
        
        data = rates.central_bank_rates[0]
        
        DataBankToday = new DataBank(data.central_bank, data.country, data.last_updated,data.rate_pct)
        document.getElementById("paisSeleccioado").innerHTML = DataBankToday.pais
        banco.innerHTML = DataBankToday.nombre
        tasa.innerHTML = DataBankToday.tasa
        updated.innerHTML = DataBankToday.fechaActuallizacion
        datosBanco.style.display = "block"
      })
      .catch(e => console.log(e));
}

function vaciarLocalStorage(){
    localStorage.clear()
}



//let, events, dom

let miReporte = document.getElementById("miReporte")
miReporte.addEventListener("submit", ingresarDatos)

document.getElementById("reporteCompleto").style.display = "none"

let verReportes = document.getElementById("todos")
verReportes.addEventListener("click", verTodosLosReportes)

buscarReporte.addEventListener("input", usuarioBusqueda)

guardar.addEventListener("click", reporteGuardadoSwal)

let borrarFormulario = document.getElementById("vaciar")
borrarFormulario.addEventListener("click", vaciarFormulario)


let botonAustralia = document.getElementById("Australia")
botonAustralia.addEventListener("click", getInterestRate)
let botonIglaterra = document.getElementById("Inglaterra")
botonIglaterra.addEventListener("click", getInterestRate)

let datosBanco = document.getElementById("datosBanco")
datosBanco.style.display = "none"

let vaciarLocal = document.getElementById("vaciarLocal")
vaciarLocal.addEventListener("click", vaciarLocalStorage)

let banco = document.getElementById("banco")
let tasa = document.getElementById("tasa")
let updated = document.getElementById("updated")
