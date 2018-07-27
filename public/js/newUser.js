// User types in

$("#create-newUser").on("click", function() {
  if (
    $("#usernameCreate")
      .val()
      .trim() !== "" &&
    $("#passwordCreate")
      .val()
      .trim() !== "" &&
    $("#passwordCreate")
      .val()
      .trim() ===
      $("#passwordCreateVerify")
        .val()
        .trim()
  ) {
    // Create NewUser Object
    var NewUser = {
      username: $("#usernameCreate")
        .val()
        .trim(),
      password: $("#passwordCreate")
        .val()
        .trim(),
      firstName: $("#firstNameCreate")
        .val()
        .trim(),
      lastName: $("#lastNameCreate")
        .val()
        .trim(),
      email: $("#emailCreate")
        .val()
        .trim(),
      location: $("#locationCreate")
        .val()
        .trim()
    };
    //console.log(NewUser)
    $.ajax("/api/users/new", {
      type: "POST",
      data: NewUser
    }).then(function(res) {
      if (res.url !== undefined) {
        window.location = res.url;
      } else if (res.error !== undefined) {
        alert(res.error);
      } else {
        location.reload();
      }
    });
  } else {
    alert("Cannot create user. please fix issues...");
  }
});

$("#updateUser").on("click", function() {
  var updateUser = {
    firstName: $("#firstNameNew")
      .val()
      .trim(),
    lastName: $("#lastNameNew")
      .val()
      .trim(),
    email: $("#emailNew")
      .val()
      .trim(),
    location: $("#locationNew")
      .val()
      .trim()
  };
  if (updateUser.firstName === "") {
    updateUser.firstName = $("#firstNameNew").attr("placeholder");
  }
  if (updateUser.lastName === "") {
    updateUser.lastName = $("#lastNameNew").attr("placeholder");
  }
  if (updateUser.email === "") {
    updateUser.email = $("#emailNew").attr("placeholder");
  }
  if (updateUser.location === "") {
    updateUser.location = $("#locationNew").attr("placeholder");
  }

  //console.log(updateUser);
  $.ajax("/api/users/change", {
    type: "PUT",
    data: updateUser
  }).then(function(res) {
    if (res.url !== undefined) {
      window.location = res.url;
    } else if (res.error !== undefined) {
      alert(res.error);
    } else {
      location.reload();
    }
  });
});
