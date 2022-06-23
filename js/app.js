let idTarea = 1;

class Form
{
    constructor(idNombre, idDescripcion, idAlert)
    {
        this.inputNombre = document.getElementById(idNombre);
        this.inputDescripcion = document.getElementById(idDescripcion);
        this.alertElement = document.getElementById(idAlert);
    }

    clearAlert()
    {
        this.alertElement.innerHTML = "";
    }

    alert(message, type) 
    {
        this.alertElement.innerHTML = "";
        let wrapper = document.createElement('div')
        wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message} 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`

        this.alertElement.append(wrapper)
    }

    getTarea()
    {
        //validaciones
        let nombre = this.inputNombre.value;
        if (nombre.length<3 || nombre.length>20)
        {
            this.alert('Ingrese un nombre de entre 3 y 20 caracteres','warning');
            this.inputNombre.focus();
            return null;
        }

        let descripcion = this.inputDescripcion.value;
        if (descripcion.length<3 || descripcion.length>50)
        {
            this.alert('Ingrese una descripción de entre 3 y 50 caracteres','warning');
            this.inputDescripcion.focus();
            return null;
        }
        //si todas las validaciones están bien, creo el objeto
        return new Tarea(nombre, descripcion);
    }
}

class Tarea 
{
    constructor(nombre, descripcion)
    {
        this.idTarea = idTarea;
        this.nombre = nombre;
        this.descripcion = descripcion;
        idTarea++;
    }

    getDatos()
    {
        let linkBorrar = `<a href="javascript:eliminarTarea(${this.idTarea})">eliminar</a>`

        return `<tr>
        <td>${this.nombre}</td>
        <td>${this.descripcion}</td>
        <td>${linkBorrar}</td>
        </tr>`    
    }
}

let form = new Form("nombreTarea", "descripcionTarea", "alertElement");

let tareas = [];

function dibujarTabla()
{
    let seccionTabla = document.getElementById("seccionTabla");
    seccionTabla.className="container"; //hago visible la tabla
    
    let datosTabla = document.getElementById("datosTabla");
    datosTabla.innerHTML = '';
    tareas.forEach(tarea => {
        datosTabla.innerHTML += tarea.getDatos();
    })
}

function agregarTarea()
{
    form.clearAlert();
    let tarea = form.getTarea();
    if (tarea != null)
    {
        tareas.push(tarea);
        dibujarTabla();
    }
}

function eliminarTarea(id)
{
    tareas = tareas.filter((item) => item.idTarea !== id);
    dibujarTabla();
}

//PARA TEST
//tareas.push(new Tarea("Tarea 1", "Descripcion 1"));
//dibujarTabla();
