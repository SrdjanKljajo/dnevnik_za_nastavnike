export default {
    getUcenici: () => {
        return fetch('user/ucenici')
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                }
                else
                    return { message: { msgBody: "UnAuthorized", msgError: true } };
            });
    },
    postUcenik: ucenik => {
        return fetch('/user/ucenik', {
            method: "post",
            body: JSON.stringify(ucenik),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else
                return { message: { msgBody: "UnAuthorized" }, msgError: true };
        });
    },
    deleteUcenik: (_id) => {
        return fetch(`/user/ucenik/${_id}`,
            { method: 'delete' })
            .then(res => res.json())
            .then(data => data);
    },

    updateUcenik: (ucenik) => {
        return fetch(`/user/ucenik/${ucenik._id}`,
            {
                method: "put",
                body: JSON.stringify(ucenik),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(data => data);
    }
}



