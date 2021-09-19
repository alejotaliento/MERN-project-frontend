import { basePath, apiVersion } from "./config";

export function getMenusApi() {
    const url = `${basePath}/${apiVersion}/get-menus`;

    return fetch(url)
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

export function updateMenuApi(token, idMenu, data) {
    const url = `${basePath}/${apiVersion}/update-menu/${idMenu}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data)
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

export function activateMenuApi(token, idMenu, status) {
    const url = `${basePath}/${apiVersion}/active-menu/${idMenu}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ active: status }),
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

export function addMenuApi(token, menuData) {
    const url = `${basePath}/${apiVersion}/add-menu`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(menuData),
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
        })
}

export function deleteMenuApi(token, idMenu) {
    const url = `${basePath}/${apiVersion}/delete-menu/${idMenu}`;
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
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
        })
}