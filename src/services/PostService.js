import * as congig from './EndpointSetting';

export const PostService = {

    crearPost : async (nuevoPost, cursoId) => {

        if (!nuevoPost) return;

        let response = await fetch(congig.URL + "/posts/" + cursoId, {
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
        let response = await fetch(congig.URL + "/posts/" + cursoId);
        let postsList = await response.json();
        return postsList;
    },
}