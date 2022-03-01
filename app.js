const formularioUI = document.querySelector('#formulario');
const listaUI = document.querySelector('#listaActividades');

let vectorAct = [];


const crearItem = (activity) => {
    let actividad = {
        activity: activity,
        estado: 'en progreso'
    }

    vectorAct.push(actividad);
    return actividad;
}

const guardarDB = () => {
    localStorage.setItem('toDoList', JSON.stringify(vectorAct));
    cargarDB();
}

const cargarDB = () => {
    listaUI.innerHTML = '';
    vectorAct = JSON.parse(localStorage.getItem('toDoList'))
    if (vectorAct === null) {
        vectorAct = [];
    } else {
        vectorAct.forEach(element => {

            if (element.estado === 'en progreso') {
                listaUI.innerHTML += `<div class="alert alert-info" role="alert">
            <span class="material-icons float-start me-2">golf_course</span>
            <b>${element.activity}</b> - ${element.estado}
            <p class="float-end">
                <span class="material-icons">task_alt</span>
                <span class="material-icons">remove_circle_outline</span>
            </p>
        </div>`
            } else {
                listaUI.innerHTML += `<div class="alert alert-secondary" role="alert">
                <span class="material-icons float-start me-2">golf_course</span>
                <b>${element.activity}</b> - ${element.estado}
                <p class="float-end">
                    <span class="material-icons">task_alt</span>
                    <span class="material-icons">remove_circle_outline</span>
                </p>
            </div>`
            }
        })
    }
}

const eliminarDB = (activity) => {

    let indexVec;
    vectorAct.forEach((elemento, index) => {

        if (elemento.activity === activity) {
            indexVec = index;
            console.log(indexVec);
        }
    });
    vectorAct.splice(indexVec, 1);
    guardarDB();

}

const editarDB = (activity) => {

    let indexVec = vectorAct.findIndex((elemento) => elemento.activity === activity);
    vectorAct[indexVec].estado = 'terminado';
    guardarDB();

}


formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let actiUI = document.querySelector('#actividad').value;

    crearItem(actiUI);
    guardarDB();
    formularioUI.reset();
});


document.addEventListener('DOMContentLoaded', cargarDB);

listaUI.addEventListener('click', (e) => {

    e.preventDefault();

    if (e.target.innerHTML === 'task_alt' || e.target.innerHTML === 'remove_circle_outline') {

        const texto = e.path[2].childNodes[3].innerHTML;

        if (e.target.innerHTML === 'task_alt') {
            editarDB(texto);

        }
        if (e.target.innerHTML === 'remove_circle_outline') {
            eliminarDB(texto);
        }
    }

})