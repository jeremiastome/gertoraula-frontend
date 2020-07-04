import * as congig from './EndpointSetting';

export const PostService = {

    crearPost : async (nuevoPost, cursoId) => {
        const response = await fetch(congig.URL + "/posts/" + cursoId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPost)
        })
        console.log('res ' + response);
        return response;
    },

    getPosts : async (cursoId)  => {
        const response = await fetch(congig.URL + "/posts/" + cursoId);
        const postsList = await response.json();
        return postsList;
    },
}