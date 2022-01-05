import { Todo } from './classes/todo.class.js';
import { todoList } from '../index.js';

// REFERENCIAS EN EL HTML
const divTodoList = document.querySelector('.todo-list'); // SELECCIONA LA LISTA DESORDENADA CON LA CLASE
const txtInput = document.querySelector('.new-todo'); // SELECCIONA EL INPUT CON LA CLASE
const btnBorrar = document.querySelector('.clear-completed'); // SELECCIONA EL BOTÓN CON LA CLASE
const ulFilters = document.querySelector('.filters'); // SELECCIONA LA LISTA DESORDENADA CON LA CLASE
const anchorFilters = document.querySelectorAll('.filtro'); // SELECCIONA TODAS LAS ETIQUETAS DE ENLACE CON LA CLASE

export const crearTodoHtml = (todo) => {
    const htmlTodo = 
    `
    <li class="${(todo.completado ? 'completed' : '')}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado ? 'checked' : '')}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `
    const div = document.createElement('div'); // CREA UNA SECCIÓN QUE VA A CONTENER TODO EL CÓDIGO HTML, SOLO EN MEMORIA
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); // INSERTA SOLO EL PRIMER ELEMENTO DEL DIV (.FIRST ELEMENTCHILD)

    return div.firstElementChild;
}

// EVENTO AGREGAR UN ToDo
txtInput.addEventListener('keyup', (event)=>{ // EL EVENTO INDICA LAS TECLAS QUE PRESIONÓ EL USUARIO (EVENT)
    // console.log(event);
    if(event.keyCode === 13 && txtInput.value.length > 0){ // VERIFICA QUE SE HA PRESIONADO ENTER Y QUE EL TAMAÑO DE VALOR SE MAYOR A 0
        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value); // ENVIA EL VALOR AL PRESIONAR ENTER

        todoList.nuevoTodo(nuevoTodo); // INSERTA EL NUEVO ToDo EN EL ARREGLO
        // console.log(todoList);

        crearTodoHtml(nuevoTodo); // ENVIA EL NUEVO ToDo PARA QUE SE MUESTRE EN EL HTML
        txtInput.value = ''; // BORRA EL VALOR EN EL INPUT
    }
});

// EVENTO VERFICA EL ESTADO DEL ELEMENTO, O LO ELIMINA
divTodoList. addEventListener('click', (event)=>{
    // console.log('click');
    
    const nombreElemento = event.target.localName; // REFERENCIA EL ELEMENTO ESPECÍFICO DONDE SE HIZO CLICK (EVENT.TARGET.LOCALNAME) DEL ELEMENTO LISTA
    const todoElemento = event.target.parentElement.parentElement; // REFERENCIA AL ELEMENTO LISTA COMPLETO (EVENT.TARGET.PARENTELEMENT.PARENTELEMENT)
    // console.log(nombreElemento); // PUEDE SER: INPUT, LABEL O BUTTON
    // console.log(todoElemento);

    const todoId = todoElemento.getAttribute('data-id'); // OBTIENE EL VALOR DE UNA PROPIEDAD ESPECÍFICA DE EL ELEMENTO (GETATTRIBUTE())
    // console.log(todoId);

    if(nombreElemento.includes('label')){return;}

    if(nombreElemento.includes('input')){ // VERIFICA SI LA CADENA INCLUYE EL TEXTO (INCLUDES())
        todoList.marcarCompletado(todoId);
    }
    //console.log(todoList);

    if(nombreElemento.includes('button')){ 
        todoList.eliminarTodo(todoId); // PARA ELIMINAR EL ToDo DEL ARREGLO
        divTodoList.removeChild(todoElemento); // REMUEVE TODO EL ELEMENTO(REMOVECHILD())
    }

    // PARA TACHAR EL TEXTO
    todoElemento.classList.toggle('completed'); // IDENTIFICA LAS CLASES DEL ELEMENTO Y LAS CAMBIA POR UN NUEVO VALOR (CLASSLIST.TOGGLE)
});

// EVENTO ELIMINA LOS ELEMENTOS COMPLETADOS
btnBorrar.addEventListener('click',()=>{

    todoList.eliminarCompletados(); // ELIMINA LOS ToDo COMPLETADOS DEL ARREGLO
    
    // CICLO INVERSO
    for(let i = divTodoList.children.length - 1; i >= 0; i--){ // ENUMERA LOS ELEMENTOS HIJOS DEL ELEMENTO CENTRAL (CHILDREN.LENGHT)
        const elemento = divTodoList.children[i]; // BARRE CADA UNO DE LOS ELEMENTOS HIJOS
        // console.log(elemento);
        if(elemento.classList.contains('completed')){ // IDENTIFICA LAS CLASES DEL ELEMENTO(CLASSLIST.CONTAINS())
            divTodoList.removeChild(elemento); // ELIMINA EL ELEMENTO HIJO (REMOVECHILD())
        }
    }
});

ulFilters.addEventListener('click',(event)=>{
    // console.log(event.target.text); // MUESTRA EL TEXTO DEL ELEMENTO DE LA LISTA (EVENT.TARGET.TEXT)
    const filtro = event.target.text;

    if (!filtro)return; // ACTUA COMO MECANISMO DE SEGURIDAD, NO SEGUIRA EJECUTANDO LAS SIGUIENTES LÍNEAS

    anchorFilters.forEach(elem => elem.classList.remove('selected')); // REMUEVE LA CLASE DE CADA UNO DE LOS ELEMENTOS
    // console.log(event.target);
    event.target.classList.add('selected'); // MUESTRA EL CUADRITO EN EL ELEMENTO SELECCIONADO

    for(const elemento of divTodoList.children){ // BARRE CADA UNO DE LOS ELEMENTOS HIJOS
        // console.log(elemento);
        elemento.classList.remove('hidden'); // ELIMINA LA CLASE DE TODOS LOS ELEMENTOS, ESA CLASE SE ENCUENTRA EN EL ARCHIVO CSS 
        const completado = elemento.classList.contains('completed'); // VERIFICA SI EXISTE LA CLASE EN EL ELEMENTO

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden'); // AÑADE LA CLASE AL ELEMENTO (.ADD()). LOS ELEMENTOS COMPLETADOS NO SE MUESTRAN.
                }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden'); // LOS ELEMENTOS NO COMPLETADOS NO SE MUESTRAN.
                }
            break;
        }
    }
});