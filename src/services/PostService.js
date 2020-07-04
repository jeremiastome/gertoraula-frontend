import * as congig from './EndpointSetting';

export const PostService = {

    crearPost : async (nuevoPost, cursoId) => {
        return await fetch(congig.URL + "/posts/" + cursoId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPost)
        })
    },

    getPosts : async (cursoId)  => {
        const response = await fetch(congig.URL + "/posts/" + cursoId);
        return await response.json();
    },
}