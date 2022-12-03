import { basePath, apiVersion } from "./config";

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/signup`;
    /* http://localhost:3977/api/v1/signup */
    console.log(url)
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };

    /* cuando se crea el usuario se devuelve un objeto user_creado */
    return fetch(url, params)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        if (result.user){
            return {
                user_creado: true,
                message: "Usuario creado correctamente",
            };
        }
        return {
            user_creado: false,
            message: result.message,
        };
    })
    .catch((err) => {
        return {
            user_creado: false,
            message: err.message,
        };
    });
}


export function signIn(data) {
    const url = `${basePath}/${apiVersion}/signin`;
    /* http://localhost:3977/api/v1/signin */
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };

    return fetch(url, params)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        console.log(result);
        return result;
    })
    .catch((err) => {
        return err.message;
    });
}

export function getUsers(token) {
    const url = `${basePath}/${apiVersion}/users`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    return fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.message;
    });
}
  
export function getActiveUsers(token, status) {
    const url = `${basePath}/${apiVersion}/activeusers?active=${status}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    };
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
    });
}
  
  export function getAvatar(avatarName) {
    const url = `${basePath}/${apiVersion}/getavatar/${avatarName}`;
  
    return fetch(url)
      .then(response => {
        return response.url;
      })
      .catch(err => {
        return err.message;
    });
}
  
export function activateUser(token, userId, status) {
    const url = `${basePath}/${apiVersion}/activateuser/${userId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        active: status
      })
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        return err.message;
    });
}
  
export function updateUser(token, user, userId) {
    const url = `${basePath}/${apiVersion}/updateuser/${userId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(user)
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
    });
}
  
export function deleteUser(token, userId) {
    const url = `${basePath}/${apiVersion}/deleteuser/${userId}`;
  
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        return err.message;
    });
}
  
export function uploadAvatar(token, avatar, userId) {
    const url = `${basePath}/${apiVersion}/uploadavatar/${userId}`;
  
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
  
    const params = {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: token
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
    });
}