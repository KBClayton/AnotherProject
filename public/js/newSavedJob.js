// User types in

$("#submit-newJob").on("click", function() {
  if (
    $("#company")
      .val()
      .trim() !== "" &&
    $("#jobTitle")
      .val()
      .trim() !== "" &&
    $("#location")
      .val()
      .trim() !== ""
  ) {
    console.log("test");

    // Create NewJob Object
    var NewJob = {
      company: $("#company")
        .val()
        .trim(),
      contactName: $("#contactName")
        .val()
        .trim(),
      contactPhone: $("#contactPhone")
        .val()
        .trim(),
      position: $("#jobTitle")
        .val()
        .trim(),
      jobLocation: $("#location")
        .val()
        .trim(),
      confidenceLevel: $("#confidenceLevel")
        .val()
        .trim(),
      postedSalary: $("#postedSalary")
        .val()
        .trim(),
      userId: 2
    };

    //console.log(NewJob);
    $.ajax("/api/jobs", {
      type: "POST",
      data: NewJob
    }).then(function(res) {
      console.log(res);
      window.location=res.url;
    });
  } else {
    //alert("You have nor filled it out");
    $("#modalTitle").text("Error");
<<<<<<< HEAD
    $("#modalBody").text("You have not filled out all fields");
=======
    $("#modalBody").text("You have not filled out all the fields");
>>>>>>> 7e76f03074122405417464772a50972dc0e5196f
    $('.modal').modal('show');
  }
});
