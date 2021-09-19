import { basePath, apiVersion } from "./config";

export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data), //passing data to JSON
    headers: {
      "Content-Type": "application/json", //Indica el tipo de medio del recurso.
    },
  };

  return fetch(url, params)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return { status: 200, message: "Usuario creado con exito" };
      }

      return { status: 404, message: "Error al crear el usuario" };
    })
    .catch((err) => {
      return { status: 404, message: "Error al crear el usuario" };
    });
}

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json", //Indica el tipo de medio del recurso.
    },
  };

  return fetch(url, params)
    .then((response) => {
      //console.log(response);
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

export function getUsersApi(token) {
  const url = `${basePath}/${apiVersion}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    }).then(result => {
      return result;
    }).catch(err => {
      return err.message;
    })
}

export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    }).then(result => {
      return result;
    }).catch(err => {
      return err.message;
    })
}

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`
  const formData = new FormData();

  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
  }

  return fetch(url, params)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user),
  }

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

export function activateUserApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      active: status,
    }),
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    }).then(result => {
      return result.message;
    }).catch(err => {
      return err.message;
    });
}

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }

  return fetch(url, params).then(response => {
    return response.json();
  }).then(result => {
    return result.message;
  }).catch(err => {
    return err.message;
  });
}

export function signUpAdminApi(token, user) {
  const url = `${basePath}/${apiVersion}/sign-up-admin`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  }

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