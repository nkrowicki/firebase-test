var ref = firebase.database().ref("usuario");
var usuario = {}

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

firebase.auth().onAuthStateChanged(function(user){
  console.log(user)
  if (user) {
    console.log("tenemos usuario");
    mostrarLogout()
  }else{
    console.log("no tenemos usuario");
    mostrarLogin()
  }
});


btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');

  firebase.auth().signInWithPopup(provider).then(function (datosUsuario) {
      console.log(datosUsuario);
      usuario = {
          nombre: datosUsuario.user.displayName,
          email: datosUsuario.user.email,
          uid: datosUsuario.user.uid
      }
      agregarUsuario(usuario, usuario.uid);
  }).catch(function (err) {
      console.log(err);
  })
});

btnLogout.addEventListener("click", function(event){
  firebase.auth().signOut();
})

function mostrarLogout(){
  console.log("mostrar Logout");
  btnLogout.style.display = "block";
  btnLogin.style.display = "none";
}

function mostrarLogin(){
  console.log("mostrar login");
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";
}

function agregarUsuario(usuario, uid) {
  ref.child(uid).update(usuario)
}
