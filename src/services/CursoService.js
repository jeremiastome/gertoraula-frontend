export const CursosService = {

    getCursos : async ()  => {
        let response = await fetch("http://localhost:8080/cursos");
        let cursosList = await response.json();
        console.log('cursosList ');
        console.log(cursosList);
        return cursosList;
    },

    guardarAsistencias : async (id, asistenciasCurso) => {

        if (!asistenciasCurso || !id) return;

        let response = await fetch("http://localhost:8080/cursos/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasCurso)
        })
        console.log('res ' + response);
        return response;
    },

    eliminarAsistencias : async (asistenciasAEliminar) => {

        if (!asistenciasAEliminar) return;

        let response = await fetch("http://localhost:8080/asistencias" , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasAEliminar)
        })
        console.log('res ' + response);
    }
}