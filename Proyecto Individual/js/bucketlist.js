import { tareas } from './array.js';
import { Tarea } from './clases.js';

let botonTareas = document.getElementById("checklist");
let form = document.getElementById("listas-form");
let cancelBtn = document.getElementById('cancelBtn');

window.addEventListener('load', function(){
    let tareasLS = JSON.parse(localStorage.getItem('tareas' || '[]'));

    if (tareasLS !== null) {
        cargarTareas(tareasLS);
    } else {
        localStorage.setItem('tareas', JSON.stringify(tareas));

        cargarTareas(tareas);
    }
    actualizarTareas();
})

    //Carga de las cards
    function cargarTareas(array){
        const tareasDiv = document.getElementById("tareas-div");
        tareasDiv.innerHTML = '';
        array.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML += tareaHTML(item);

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.className = 'modify-button';
            modifyButton.onclick = () => modificarTarea(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => eliminarTarea(index);
            
            div.appendChild(deleteButton);
            div.appendChild(modifyButton);
            tareasDiv.appendChild(div);
        });
    }

    function tareaHTML(item){
        return `<h5 class="card-header">${item.info.titulo}</h5>
                <div id="${item.id}" class="card-body">
                    <div class="card-body-text">
                        <strong>${item.info.subtitulo}</strong><br></br>
                        
                        ${item.contenido}
                    </div>
                </div>`;
    }

    //Form para crear tarea
    botonTareas.addEventListener('click', function() {
        form.style.display = 'block';
    });

    cancelBtn.addEventListener('click', function(){
        form.style.display = 'none';
    })

    //Crear tarea
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let tareass = JSON.parse(localStorage.getItem('tareas' || '[]'));

        //Obtener informacion de los input
        const title = document.getElementById("titleInput").value.trim();
        const subtitle = document.getElementById("subtitleInput").value.trim();
        const content = document.getElementById('textInput').value.trim();
        const id = parseInt(this.dataset.idTarea);

        const nuevaTarea = new Tarea(title, subtitle, id, content);
        
        //Identificar si la tarea ya existe o se creara una nueva
        if (this.dataset.idTarea !== undefined){
            let indice = tareass.findIndex((t) => t.id === nuevaTarea.id);
            tareass[indice] = nuevaTarea;
        } else {
            nuevaTarea.id = nuevoId();
            tareass.push(nuevaTarea);
        };
        localStorage.setItem('tareas', JSON.stringify(tareass));
        form.style.display = 'none';
        actualizarTareas();
        //reset formulario
        this.reset();
        //eliminar id del formulario
        delete this.dataset.idLista;
    });

    //Id para la tarea
    function nuevoId(){
        let tareass = JSON.parse(localStorage.getItem('tareas' || '[]'));
        let ids = tareass.map((tarea) => tarea.id);
        return Math.max(...ids) + 1;
    };

    //Ordenar las tareas

    //Modificacion de tareas
    function modificarTarea(index){
        form.style.display = 'block';
        let tareass = JSON.parse(localStorage.getItem('tareas'));
        let tarea = tareass[index];

        if (tarea){
            document.getElementById('titleInput').value = tarea.info.titulo;
            document.getElementById('subtitleInput').value = tarea.info.subtitulo;
            document.getElementById('textInput').value = tarea.contenido;
            form.dataset.idTarea = tarea.id;
        }
    }

    //Eliminar Tareas
    function eliminarTarea(index) {
        let tareass = JSON.parse(localStorage.getItem('tareas'));
        tareass.splice(index, 1);
        localStorage.setItem('tareas', JSON.stringify(tareass));
        actualizarTareas();
    }

    //Buscar tareas
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('buscar-btn');

    function filtrarTareas() {
        let tareass = JSON.parse(localStorage.getItem('tareas'));
      
        let resultado = tareass.filter((t) =>
          t.info.titulo.toLowerCase().includes(inputBuscar.value.toLowerCase().trim())
        );
        if (resultado) {
          cargarTareas(resultado);
        }
      }

    //Buscar con el boton
    btnBuscar.addEventListener('click', filtrarTareas);
    //Buscar con la tecla Enter
    inputBuscar.addEventListener('search', filtrarTareas);

    //Actualizar las tareas si hay cambios
    function actualizarTareas() {
        let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
        cargarTareas(tareas);
    }

