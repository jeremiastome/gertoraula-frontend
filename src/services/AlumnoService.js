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
    }
}