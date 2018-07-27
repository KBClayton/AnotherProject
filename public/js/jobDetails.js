$(".addCommentBtn").on("click", function(event) {
  console.log($(this).data("id"));
  var commentID = {
    savedJobID: $(this).data("id"),
    comment: $(".commentBox").val()
  };
  console.log(event);
  console.log(commentID);
  $.ajax("/api/jobs", {
    type: "POST",
    data: commentID
  }).then(function() {
    console.log("logged job id");
  });
});

// $( document ).ready(function() {
//   console.log( "ready!" );

// });

// $.ajax("/api/jobs", {
//   type: "GET",
//   data: savedJob
// }).then(
//   function(){
//     console.log("Saved Jobs");
//   }
// );
