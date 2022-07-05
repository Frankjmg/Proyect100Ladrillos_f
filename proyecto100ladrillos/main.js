'use strict';

let numberObjects = 1;
let currentAccount;

const codigo_verificacion = {
  numero: false,
  mayuscula: false,
};

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ]{3,15}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{6,10}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 4 a 12 digitos.
};

const account1 = {
  owner: 'Francisco',
  password: 111111,
};

let accounts = [account1];

//crear contraseña
const inputName = document.querySelector('.Name');
const inputEmail = document.querySelector('.email');
const inputFirstPasssword = document.querySelector('.first__password--input');
const inputSecondPassword = document.querySelector('.second__password--input');
const opacitySecondPassword = document.querySelector('.second__password');
const btnCreateAccount = document.querySelector('.btnCreate__account');
const backgroundLeft = document.querySelector('.background__left');
const backgroundRight = document.querySelector('.background__right');
const inputData = document.querySelectorAll('.formData');
//iniciar sesión
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPassword = document.querySelector('.login__input--password');
const btnlogin = document.querySelector('.login__btn');
//Una vez iniciado sesion
const labelWelcome = document.querySelector('.welcome');

// Validacion de datos del formulario

const validacion = function (e) {
  console.log(e.target.name);
  switch (e.target.name) {
    //NOMBRE
    case 'Name':
      if (expresiones.nombre.test(e.target.value)) {
        inputName.classList.remove('formulario_incorrecto');
        inputName.classList.add('formulario_correcto');
      } else {
        inputName.classList.remove('formulario_correcto');
        inputName.classList.add('formulario_incorrecto');
      }
      break;
    //CORREO
    case 'email':
      if (expresiones.email.test(e.target.value)) {
        inputEmail.classList.remove('formulario_incorrecto');
        inputEmail.classList.add('formulario_correcto');
      } else {
        inputEmail.classList.remove('formulario_correcto');
        inputEmail.classList.add('formulario_incorrecto');
      }
      break;
    //CONTRASEÑA
    case 'firstPassword':
      for (const value of inputFirstPasssword.value.split('')) {
        console.log(value);
        if (value.charCodeAt() >= 48 && value.charCodeAt() <= 57) {
          codigo_verificacion.numero = true;
        }
      }
      console.log(codigo_verificacion.numero);
      for (const value of inputFirstPasssword.value.split('')) {
        if (value.charCodeAt() >= 65 && value.charCodeAt() <= 90) {
          codigo_verificacion.mayuscula = true;
        }
      }
      console.log(codigo_verificacion.mayuscula);

      if (
        codigo_verificacion.numero &&
        codigo_verificacion.mayuscula &&
        inputFirstPasssword.value.length >= 6 &&
        inputFirstPasssword.value.length <= 10 &&
        !inputName.classList.contains('formulario_incorrecto') &&
        !inputEmail.classList.contains('formulario_incorrecto') &&
        inputName.value !== ''
      ) {
        inputFirstPasssword.classList.remove('formulario_incorrecto');
        inputFirstPasssword.classList.add('formulario_correcto');
        opacitySecondPassword.style.opacity = 100;
      } else {
        inputFirstPasssword.classList.remove('formulario_correcto');
        inputFirstPasssword.classList.add('formulario_incorrecto');
        opacitySecondPassword.style.opacity = 0;
        btnCreateAccount.style.opacity = 0;
        inputSecondPassword.value = '';
      }
      break;

    case 'secondPassword':
      if (inputFirstPasssword.value !== inputSecondPassword.value) {
        inputSecondPassword.classList.remove('formulario_correcto');
        inputSecondPassword.classList.add('formulario_incorrecto');
        btnCreateAccount.style.opacity = 0;
      } else {
        inputSecondPassword.classList.remove('formulario_incorrecto');
        inputSecondPassword.classList.add('formulario_correcto');
        btnCreateAccount.style.opacity = 100;
      }
      break;
  }
};

inputData.forEach(data => {
  console.log(data);
  data.addEventListener('keyup', validacion);
  data.addEventListener('blur', validacion);
});

btnCreateAccount.addEventListener('click', function (e) {
  e.preventDefault();
  let nameObject = 'account' + numberObjects;
  console.log(nameObject);
  numberObjects++;
  console.log(numberObjects);
  nameObject = Object.create(account1);
  nameObject.owner = inputName.value;
  nameObject.password = inputSecondPassword.value;

  nameObject.userName = nameObject.owner.slice(0, 3);
  console.log(nameObject.userName);

  accounts.push(nameObject);
  console.log(accounts);

  inputFirstPasssword.value =
    inputName.value =
    inputSecondPassword.value =
    inputEmail.value =
      '';

  opacitySecondPassword.style.opacity = 0;
  btnCreateAccount.style.opacity = 0;
  inputFirstPasssword.classList.remove('formulario_correcto');
  inputSecondPassword.classList.remove('formulario_correcto');
  inputEmail.classList.remove('formulario_correcto');
  inputName.classList.remove('formulario_correcto');
});

btnlogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.password === inputLoginPassword.value) {
    backgroundLeft.style.opacity = 0;
    backgroundRight.style.opacity = 0;
    labelWelcome.textContent = `Bienvenido, ${currentAccount.owner}`;
  }
  inputLoginPassword.value = inputLoginUsername.value = '';
});
