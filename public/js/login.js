$("#signInBtn").on("click", function(){
  
  var LoginAccess = {
    username: $("#usernameSignIn").val().trim(),
    password: $("#passwordSignIn").val().trim()
  }

  console.log(LoginAccess);

   $.ajax("/api/login", {
     type: "POST",
     data: LoginAccess
   }).then(
    function(){
      console.log("login");
    }
   )
})