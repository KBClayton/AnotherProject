

$(".addCommentBtn").on("click", function(event){
  console.log($(this).data("id"));
  var commentID = {
    savedJobID: $(this).data("id"),
    comment: $(".commentBox").val()
  }
  
  console.log(commentID);
  $.ajax("/api/jobs", {
    type: "POST",
    data: commentID
    }).then(
    function(){
      console.log("Created New Job Lead");
    }
  );
  
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