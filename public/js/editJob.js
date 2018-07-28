
// ajax call for job data route 
$.ajax({
  url: "/api/jobs/1",
  method: "GET"
}).then(function () {
  console.log("Heyo");
});


// ajax call for comments route
$.ajax({
  url: "/api/comments/1",
  method: "GET"
}).then(function () {
  console.log("getting comments");
});


if($("#chComp")[0]!==undefined){
var jobID = $("#chComp")[0].placeholder;
console.log(jobID);
}

var commentID = $("editComment");

// javascript for editing contactName

$("#saveContChanges").on("click", function () {
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
    }).then(function () {
      console.log("Changed contact");
      location.reload();
    });
  } else {
    console.log("no changes made");
  }
});

// javascript for editing contactPhone
$("#savePhoneChanges").on("click", function () {
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
    }).then(function () {
      console.log("Changed contact phone");
      location.reload();
    });
  } else {
    console.log("no changes made");
  }
});

// javascript for editing confidencelevel
$("#chConfidenceBtn").on("click", function () {
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
  }).then(function () {
    console.log("Changed confidence");
    location.reload();
  });
});

$("#deleteJob").on("click", function () {
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
$("#addComment").on("click", function () {
    console.log("in clickhandler")
    console.log($("#chComp").attr("placeholder"))
    // Create an addComment Object
    var addComment = {
      comment: $("#addC")
        .val()
        .trim(),
      savedJobId:$("#chComp").attr("placeholder"),
     };
    
    console.log(addComment);
    $.ajax("/api/comments/", {
      type: "POST",
      data: addComment
    }).then(function () {
      //console.log("Added comment");
      location.reload();
    });
 
});



// Edit a comment
$("#editComment").on("click", function () {
  var commentID = $(this).val();
  console.log("comment ID: "+commentID);
    // console.log("test");

    // Create an editComment Object
    var editComment = {
      comment: $("#commentBox")
        .val()
        .trim(),
      id: commentID
    };

    console.log(editComment);
    $.ajax("/api/comments/" + commentID, {
      type: "PUT",
      data: editComment
    }).then(function () {
      console.log("Comment edited");
      //location.reload();
    });
  
    console.log("no changes made");
  
});

// Delete a comment
$("#deleteComment").on("click", function () {
  //  console.log("#hideDiv"+this.val());
  var commentID = $(this).val();
  $("#hideDiv"+commentID).hide();
  console.log("comment ID: "+commentID);
    // console.log("test");

    // Create an editComment Object
    var deleteComment = {
      id: commentID
    };

    console.log(deleteComment);
    $.ajax("/api/comments/" + commentID, {
      type: "DELETE",
      data: deleteComment
    }).then(function () {
      console.log("Comment deleted");
      // location.reload();
    });
  
    console.log("no changes made");
  
});