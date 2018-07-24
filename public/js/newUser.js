// User types in

$("#create-newUser").on("click", function(){

  if (
    $("#usernameCreate").val().trim() != "" &&
    $("#passwordCreate").val().trim() != "" &&
    $("#passwordCreate").val().trim() === $("#passwordCreateVerify").val().trim()
  ){

    // Create NewUser Object
    var NewUser = {
      username: $("#usernameCreate").val().trim(),
      password: $("#passwordCreate").val().trim(),
      firstName: $("#firstNameCreate").val().trim(),
      lastName: $("#lastNameCreate").val().trim(),
      email: $("#emailCreate").val().trim(),
      location: $("#locationCreate").val().trim()
    }
    console.log(NewUser)

    console.log(NewUser);
    $.ajax("/api/users/new", {
      type: "POST",
      data: NewUser
    }).then(
      function(){
        console.log("Created New User");
      }
    )
  }
  else{
    alert("Cannot create user. please fix issues...")
  }
});
