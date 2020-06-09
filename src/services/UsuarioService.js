const url = "http://localhost:8080";
export const UsuarioService = {

    crearUsuario : async (nuevoUsuario) => {

        if (!nuevoUsuario) return;

        let response = await fetch(url + "/usuarios/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })
        console.log('res ' + response);
        return response;
    },

    usuarioExistente : async (email, rol) => {
        let response = await fetch(url + "/usuarios/" +rol+"?email="+email);
        let nose = await response.json();
        console.log(nose);
        //let usuarioExistente = await JSON.stringify(response);
        ///console.log(usuarioExistente);
        return nose;
    }
}