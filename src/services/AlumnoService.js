import * as congig from './EndpointSetting';

export const AlumnoService = {

    crearAlumno : async (nuevoAlumno) => {
        return await fetch(congig.URL + "/alumnos/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno)
        })
    },

    actualizarAlumno : async (nuevoAlumno, email, dni) => {
        return await fetch(congig.URL + "/alumnos/"+email+"?dni="+dni, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno)
        })        
    },

    getAlumnosDeCurso : async (cursoId, fecha)  => {        
        const response = await fetch(congig.URL + "/alumnos/"+cursoId+"?fecha="+fecha);
        return await response.json();
    },

    getAllAlumnos : async (cursoId)  => {
        const response = await fetch(congig.URL + "/alumnosDeCurso/"+cursoId);
        return await response.json();
    },

    getAlumnosByEmail : async (email)  => {
        const response = await fetch(congig.URL + "/alumnosRegistrados/"+email);
        return await response.json();
    },

    removerAlumno : async (cursoId, alumnoId)  => {
        return await fetch("http://localhost:8080/removerAlumno/"+cursoId+"?alumnoId="+alumnoId, {
            method: 'PUT'
        })
    },

    getAlumnos : async ()  => {
        const response = await fetch(congig.URL + "/alumnos");
        return await response.json();
    }
}