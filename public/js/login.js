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
    if(res.url !== undefined){
      window.location = res.url;
    }else if (res.error!==undefined){
      alert(res.error);
    }else{
      location.reload();
    }
     //location.href = res;
      //console.log("login");
    }
   )
})

$("#logout").on("click", function(){
  $.ajax("/api/logout", {
    type: "DELETE",
  }).then(function(){
    window.location="/login"
  })
})