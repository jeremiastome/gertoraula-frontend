import * as congig from './EndpointSetting';

export const UsuarioService = {

    crearUsuario : async (nuevoUsuario) => {

        if (!nuevoUsuario) return;

        let response = await fetch(congig.URL + "/usuarios/", {
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
        let response = await fetch(congig.URL + "/usuarios/" +rol+"?email="+email);
        let nose = await response.json();
        console.log(nose);
        //let usuarioExistente = await JSON.stringify(response);
        ///console.log(usuarioExistente);
        return nose;
    }
}