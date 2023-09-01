/* tslint:disable:max-line-length */
export const regex = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	password: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/,
	number: /^[0-9]*$/
};

export const regexErrors = {
	email: 'El correo es incorrecto',
	password: 'El password debe contener una letra mayúscula, minúscula, un numero y un carácter especial',
	number: 'Solo puede ingresar números'
}

