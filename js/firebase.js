var config = {
		    apiKey: "AIzaSyBkSvmnjSonStwagpYjaL72Ht3aaW639Xc",
		    authDomain: "gepbox-37a32.firebaseapp.com",
		    databaseURL: "https://gepbox-37a32.firebaseio.com",
		    storageBucket: "gepbox-37a32.appspot.com",
		    messagingSenderId: "960024008248"
		  };

firebase.initializeApp(config); 

var firebaseRef = new Firebase("https://gepbox-37a32.firebaseio.com/");

function login() {
	try {
		var login = document.getElementById('txtLogin').value;
		var senha = document.getElementById('txtSenha').value;

		firebase.auth().signInWithEmailAndPassword(login, senha)
		.then(function(user) {
			alert('Bem vindo(a) ' + login.substring(0, login.indexOf('@')) + ".");
			window.location = 'admin.html';
		}).catch(function(error) {
			console.log(error);
			alert('Login ou senha incorretos!');
		});
	} catch(e) {
		alert(e);
	}
}

function logout() {
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
}

function carregarUsuarios() {
	firebase.database().ref('landingpage').on('value', function(snapshot) {
		var count = 1;
		$('#divUsuarios').html('');
	    snapshot.forEach(function(childSnapshot) {
	      console.log(childSnapshot.val().email);
	      console.log(childSnapshot.val().numero);
	      $('#divUsuarios').append($('<div>' + count + '- <b>Email:</b> ' + childSnapshot.val().email + ' - <b>Número:</b> ' + childSnapshot.val().numero + '</div>'));
	      $('#divUsuarios').append($());
	      count++;
	    });
	});
}

function cadastrarUsuarioNumeroLandingPage() {
	var email = document.getElementById('txtEmail').value;
	var numero = document.getElementById('txtWhatsApp').value;
	
	if (!email) {
		alert('Informe o email!');
	} else if (email.indexOf('@') == -1) {
		alert('Email inválido!');
	} else if (numero && numero.length < 14) {
		alert('Número incompleto!');
	} else {
		firebase.database().ref('landingpage').push({ email : email, numero : numero });
		alert('Inscrição efetuada com sucesso! Aguarde o lançamento!');
		document.getElementById('txtEmail').value = null;
		document.getElementById('txtWhatsApp').value = null;
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	}
}
