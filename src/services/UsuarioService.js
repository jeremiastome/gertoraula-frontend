import * as congig from './EndpointSetting';

export const UsuarioService = {
    crearUsuario : async (nuevoUsuario) => {
        return await fetch(congig.URL + "/usuarios/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })
    },

    usuarioExistente : async (email, rol) => {
        const response = await fetch(congig.URL+"/usuarios/"+rol+"?email="+email);
        return await response.json();
    }
}