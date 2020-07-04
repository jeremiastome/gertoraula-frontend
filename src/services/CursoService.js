import * as congig from './EndpointSetting';

export const CursoService = {

    getCursos : async (email)  => {
        const response = await fetch(congig.URL + "/cursos/" + email);
        return await response.json();
    },

    getEventos : async (cursoId)  => {
        const response = await fetch(congig.URL + "/eventos/" + cursoId);
        return await response.json();
    },
    
    guardarAsistencias : async (id, asistenciasCurso) => {
        return await fetch(congig.URL + "/cursos/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasCurso)
        })
    },

    agregarAlumnos: async (id, alumnos) => {
        return await fetch(congig.URL + "/cursosAlumnos/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumnos)
        })
    },

    eliminarAsistencias : async (asistenciasAEliminar) => { 
        return await fetch(congig.URL + "/asistencias", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasAEliminar)
        })
    },

    crearCurso : async (nuevoCurso) => {        
        return await fetch(congig.URL + "/cursos/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCurso)
        })
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
        return await response.json();
    }
}