var ref = firebase.database().ref("usuario");

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var cancelForm = document.getElementById("cancelForm");

var datosPerfil = document.getElementById('datosPerfil');
var formularioPerfil = document.getElementById('formularioPerfil');

var perfilNombre = document.getElementById('perfilNombre');
var perfilEmail = document.getElementById('perfilEmail');
var perfilDireccion = document.getElementById('perfilDireccion');
var perfilTelefono = document.getElementById('perfilTelefono');

var nombreForm = document.getElementById('nombreForm');
var emailForm = document.getElementById('emailForm');
var telefonoForm = document.getElementById('telefonoForm');
var calleForm = document.getElementById('calleForm');
var interiorForm = document.getElementById('interiorForm');
var coloniaForm = document.getElementById('coloniaForm');
var cpForm = document.getElementById('cpForm');


var btnEditar = document.getElementById('perfilEditar');
var usuario = {};




function leerInformacion(uid) {
    ref.child(uid).on('value', function (data) {
        var dat = data.val();
        llenarInformacion(dat.nombre, dat.email, dat.telefono, dat.direccion)
    })
}

function llenarInformacion(nombre, email, telefono, direccion) {
    perfilNombre.innerHTML = nombre;
    perfilEmail.innerHTML = email;
    perfilTelefono.innerHTML = telefono;
    perfilDireccion.innerHTML = direccion.calle + ' ' + direccion.colonia + ' ' + direccion.cp + ' ' + direccion.interior;
}


firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    if (user) {
        console.log("tenemos usuario");
        mostrarLogout();
        leerInformacion(user.uid);

    } else {
        window.location.href = 'index.html'
        console.log("no tenemos usuario");
        mostrarLogin()
    }
});

btnLogout.addEventListener("click", function (event) {
    firebase.auth().signOut();
})

function mostrarLogout() {
    console.log("mostrar Logout");
    btnLogout.style.display = "block";
    btnLogin.style.display = "none";
}

function mostrarLogin() {
    console.log("mostrar login");
    btnLogout.style.display = "none";
    btnLogin.style.display = "block";
}

function agregarUsuario(usuario, uid) {
    ref.child(uid).update(usuario)
}

perfilEditar.addEventListener('click', function (e) {

    datosPerfil.style = "display: none;"
    formularioPerfil.style = "display: block;";
});

cancelForm.addEventListener('click', function (e) {

    datosPerfil.style = "display: block;"
    formularioPerfil.style = "display: none;";
});


formularioPerfil.addEventListener('submit', function (e) {
    e.preventDefault();
    var uid = firebase.auth().currentUser.uid

    var obj = {
        nombre: nombreForm.value,
        email: emailForm.value,
        telefono: telefonoForm.value,
        direccion: {
            calle: calleForm.value,
            interior: interiorForm.value,
            colonia: coloniaForm.value,
            cp: cpForm.value
        }
    }
    ref.child(uid).set(obj).then(function () {
        datosPerfil.style = "display: block;"
        formularioPerfil.style = "display: none;";
    })
})