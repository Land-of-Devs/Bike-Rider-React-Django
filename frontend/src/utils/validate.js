function validate_dni(dni) {
  let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
  if(expresion_regular_dni.test (dni) == true){
    let numero = dni.substr(0,dni.length-1);
    let letr = dni.substr(dni.length-1,1);
    numero = numero % 23;
    let letra='TRWAGMYFPDXBNJZSQVHLCKET';
    letra=letra.substring(numero,numero+1);
    if (letra!=letr.toUpperCase()) {
      return false;
    }else {
      return true;
    }
  }else {
    return false;
  }
}

export const rules = {
  required: (value) => (value && value.length > 0) || 'Field is required',
  optional: (value) => ((value && value.length > 0) || (!value && value.length <= 0)) || '',
  username: (value) => /^[a-zA-Z0-9]+$/.test(value) && value.length >= 4 || 'Invalid Username, minimun 4 chars alphanumerics!',
  email: (value) => /\S+@\S+\.\S+/.test(value) || 'Must be an Email',
  number: (value) => (!isNaN(parseInt(value)) && parseInt(+value) >= 1) || 'It needs to be a positive number, including 0',
  string: (value) => (/^[a-z0-9.\-:;()\\!? \n]+$/i.test(value)) || 'Needs to be a string and can contain [,-:;()]',
  name: (value) => (/^((?:\w+)\s{0,1}(?:\w*)){1,4}$/gm.test(value)) || 'Only 4 spaces are allowed',
  password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || !value )|| 'Needs 8 chars, min 1 upper, 1 lower and 1 number and can contain special chars',
  minLength: (minLength) => (value) => (value && value.length >= minLength) || `Min length ${minLength}`,
  maxLength: (maxLength) => (value) => (value && value.length <= maxLength) || `Max length ${maxLength}`,
  dni: (value) => validate_dni(value) || 'Invalid dni'
};

