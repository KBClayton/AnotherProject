// User types in

$("#submit-newJob").on("click", function() {
  if (
    $("#company")
      .val()
      .trim() != "" &&
    $("#jobTitle")
      .val()
      .trim() != "" &&
    $("#location")
      .val()
      .trim() != ""
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

    console.log(NewJob);
    $.ajax("/api/jobs", {
      type: "POST",
      data: NewJob
    }).then(function() {
      console.log("Created New Job Lead");
    });
  } else {
    alert("You have nor filled it out");
  }
});
