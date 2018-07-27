// $( document ).ready(function() {
//   console.log( "ready!" );

$.ajax({
  url: "/api/jobs/1",
  method: "GET"
}).then(function() {
  console.log("Heyo");
});

// });

var jobID = $("#chComp")[0].placeholder;
console.log(jobID);

// javascript for editing contactName

$("#saveContChanges").on("click", function() {
  if (
    $("#chCont")
      .val()
      .trim() !== ""
  ) {
    console.log("test");

    // Create changeContact Object
    var changeContact = {
      contactName: $("#chCont")
        .val()
        .trim(),
      id: jobID
    };

    console.log(changeContact);
    $.ajax("/api/jobs/changeName/" + jobID, {
      type: "PUT",
      data: changeContact
    }).then(function() {
      console.log("Changed contact");
      location.reload();
    });
  } else {
    console.log("no changes made");
  }
});

// javascript for editing contactPhone
$("#savePhoneChanges").on("click", function() {
  if (
    $("#chPhone")
      .val()
      .trim() !== ""
  ) {
    console.log("test");

    // Create changePhone Object
    var changePhone = {
      contactPhone: $("#chPhone")
        .val()
        .trim(),
      id: jobID
    };

    console.log(changePhone);
    $.ajax("/api/jobs/changePhone/" + jobID, {
      type: "PUT",
      data: changePhone
    }).then(function() {
      console.log("Changed contact phone");
      location.reload();
    });
  } else {
    console.log("no changes made");
  }
});

// javascript for editing confidencelevel
$("#chConfidenceBtn").on("click", function() {
  console.log("test");

  // Create changeConfidence Object
  var changeConfidence = {
    confidenceLevel: $("#chConfidence")
      .val()
      .trim(),
    id: jobID
  };

  console.log(changeConfidence);
  $.ajax("/api/jobs/changeConfidence/" + jobID, {
    type: "PUT",
    data: changeConfidence
  }).then(function() {
    console.log("Changed confidence");
    location.reload();
  });
});

$("#deleteJob").on("click", function() {
  console.log("test");
  var deleteJob = {
    id: jobID
  }
  console.log(deleteJob);
  $.ajax("/api/jobs/" + jobID, {
    type: "DELETE",
    data: deleteJob
  }).then(function() {
    console.log("Deleted job" + jobID);
    location.reload();
  });
});

// javascript to submit a comment
$("#addComment").on("click", function() {
  if (
    $("#commentBox")
      .val()
      .trim() !== ""
  ) {
    console.log("test");

    // Create an addComment Object
    var addComment = {
      comment: $("#commentBox")
        .val()
        .trim(),
      id: jobID
    };

    console.log(addComment);
    $.ajax("/api/comments/" + jobID, {
      type: "PUT",
      data: addComment
    }).then(function() {
      console.log("Added comment");
      //location.reload();
    });
  } else {
    console.log("no changes made");
  }
});
