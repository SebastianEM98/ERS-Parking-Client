import { basePath, apiVersion } from "./config";

export function createApi(data) {
    const url = `${basePath}/${apiVersion}/createParkingLot`;
    /* http://localhost:3977/api/v1/createParkingLot */
    console.log(url)
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
        if (result.parkingLot){
            return {
                parkingLot_creado: true,
                message: "Parqueadero creado correctamente",
            };
        }
        return {
            parkingLot_creado: false,
            message: result.message,
        };
    })
    .catch((err) => {
        return {
            parkingLot_creado: false,
            message: err.message,
        };
    });
}

export function getParkingLots(token) {
    const url = `${basePath}/${apiVersion}/parkingLots`;
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
  
export function getActiveParkingLots(token, status) {
    const url = `${basePath}/${apiVersion}/activeParkingLots?active=${status}`;
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

export function activateParkingLot(token, parkingId, status) {
    const url = `${basePath}/${apiVersion}/activateParkingLot/${parkingId}`;
  
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

export function updateParkingLot(token, parkingLot, parkingId) {
    const url = `${basePath}/${apiVersion}/updateParkingLot/${parkingId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(parkingLot)
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

export function deleteParkingLot(token, parkingId) {
    const url = `${basePath}/${apiVersion}/deleteParkingLot/${parkingId}`;
  
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