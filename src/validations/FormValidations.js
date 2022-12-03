/* minimo de caracteres permitidos en el campo contraseña, nombre y apellido */
export function minLengthValidation(inputData, minLength) {
    const {  value } = inputData;
    removeClassErrorSuccess(inputData);
    if (value.length >= minLength) {
        inputData.classList.add("success");
        return true;
    } else {
        inputData.classList.add("error");
        return false;
    }
}

export function emailValidation(inputData) {
    // eslint-disable-next-line no-useless-escape
    const emailValid = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    const { value } = inputData;
    removeClassErrorSuccess(inputData);
    const resultValidation = emailValid.test(value);
    if (resultValidation) {
        inputData.classList.add("success");
        return true;
    } else {
        inputData.classList.add("error");
        return false;
    }
}

function removeClassErrorSuccess(inputData) {
    inputData.classList.remove("success");
    inputData.classList.remove("error");
}