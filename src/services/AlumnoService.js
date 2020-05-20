export const AlumnoService = {

    crearAlumno : async (nuevoAlumno) => {

        if (!nuevoAlumno) return;

        let response = await fetch("http://localhost:8080/alumnos/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno)
        })
        console.log('res ' + response);
        return response;
    },

    getAlumnos : async (cursoId, fecha)  => {
        console.log('alumnos');
        console.log(fecha);
        let response = await fetch("http://localhost:8080/alumnos/"+cursoId+"?fecha="+fecha);
        let alumnosList = await response.json();
        return alumnosList;
    },

    getAllAlumnos : async (cursoId)  => {
        let response = await fetch("http://localhost:8080/alumnosDeCurso/"+cursoId);
        let alumnosList = await response.json();
        return alumnosList;
    }
}