import * as congig from './EndpointSetting';

export const CursoService = {

    getCursos : async (email)  => {
        const response = await fetch(congig.URL + "/cursos/" + email);
        const cursosList = await response.json();
        console.log('cursosList ');
        console.log(cursosList);
        return cursosList;
    },

    getEventos : async (cursoId)  => {
        const response = await fetch(congig.URL + "/eventos/" + cursoId);
        const eventos = await response.json();
        return eventos;
    },
    
    guardarAsistencias : async (id, asistenciasCurso) => {
        const response = await fetch(congig.URL + "/cursos/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasCurso)
        })

        return response;
    },

    agregarAlumnos: async (id, alumnos) => {
        const response = await fetch(congig.URL + "/cursosAlumnos/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumnos)
        })

        return response;
    },

    eliminarAsistencias : async (asistenciasAEliminar) => { 
        const response = await fetch(congig.URL + "/asistencias", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasAEliminar)
        })
        console.log('res ' + response);
    },

    crearCurso : async (nuevoCurso) => {        
        const response = await fetch(congig.URL + "/cursos/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCurso)
        })
        console.log('res ' + response);
        return response;
    },

    crearEvento : async (id, nuevoEvento) => {        
        const response = await fetch(congig.URL + "/evento/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEvento)
        })
        const emails = await response.json();
        return emails;
    }
}