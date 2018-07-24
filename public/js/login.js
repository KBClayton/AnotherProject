$("#signInBtn").on("click", function(){
  
  var LoginAccess = {
    username: $("#usernameSignIn").val().trim(),
    password: $("#passwordSignIn").val().trim()
  }

  console.log(LoginAccess);

   $.ajax("/api/login", {
     type: "POST",
     data: LoginAccess
   })
   .then(function(res){
    console.log("in then client side");
    console.log(res);
    if(res.status==200){
      window.location = res;
    }else{
      alert(res);
    }
     //location.href = res;
      //console.log("login");
    }
   )
})