import * as congig from './EndpointSetting';

export const AlumnoService = {

    crearAlumno : async (nuevoAlumno) => {

        if (!nuevoAlumno) return;

        let response = await fetch(congig.URL + "/alumnos/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno)
        })

        return response;
    },

    actualizarAlumno : async (nuevoAlumno, email) => {
        if (!nuevoAlumno) return;

        let response = await fetch(congig.URL + "/alumnos/"+email, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno)
        })
        console.log('res ' + response);
        let alumnoActualizado = await response.json();
        return alumnoActualizado;
    },

    getAlumnosDeCurso : async (cursoId, fecha)  => {
        console.log('alumnos');
        console.log(fecha);
        let response = await fetch(congig.URL + "/alumnos/"+cursoId+"?fecha="+fecha);
        let alumnosList = await response.json();
        return alumnosList;
    },

    getAllAlumnos : async (cursoId)  => {
        let response = await fetch(congig.URL + "/alumnosDeCurso/"+cursoId);
        let alumnosList = await response.json();
        return alumnosList;
    },

    getAlumnosByEmail : async (email)  => {
        let response = await fetch(congig.URL + "/alumnosRegistrados/"+email);
        let alumnosList = await response.json();
        return alumnosList;
    },

    removerAlumno : async (cursoId, alumnoId)  => {
        let response = await fetch("http://localhost:8080/removerAlumno/"+cursoId+"?alumnoId="+alumnoId, {
            method: 'PUT'
        })
        return response;
    },

    getAlumnos : async ()  => {
        let response = await fetch(congig.URL + "/alumnos");
        let alumnosList = await response.json();
        return alumnosList;
    }
}