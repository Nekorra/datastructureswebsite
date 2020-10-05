function login() {
    var loginuserEmail = document.getElementById("loginemail_field").value;
    var loginuserPass = document.getElementById("loginpassword_field").value;

    firebase.auth().signInWithEmailAndPassword(loginuserEmail, loginuserPass).then(function (result) {
        console.log(result)
        
        window.location="dashboard.html"
        
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        // ...
      });
}


function signup() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var name = firstname + " " + lastname;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function (result){
        console.log(result)
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        db.collection('users').doc(uid).set({
            name: name,
            points: 0,
            bool: "true",
        }).then(function () {
            console.log("Document written with ID: ", uid);
            
            window.location = "dashboard.html"
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
        //window.location="dashboard.html"

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        // ...
      });
}


$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    console.log("registered")
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });