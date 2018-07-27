$( document ).ready(function() {
  console.log( "ready!" );

  // $.ajax("/api/jobs", {
  //   type: "GET"
  //   })
  $.ajax({
    url:"/api/jobs/1",
    method:"GET",
    // dataType: "JSON"
}).then(
    function(){
      console.log("Heyo");
    }
  );

  // var contents = $('#chComp')[0].placeholder;
  // console.log(contents);
  // console.log(document.getElementById('#chCompany').getAttribute('value'));
});


$("#saveCompChanges").on("click", function(event){
  var contents = $('#chComp')[0].placeholder;
  console.log(contents);
  // console.log($(this).data("id"));
  // var commentID = {
  //   savedJobID: $(this).data("id"),
  //   comment: $(".commentBox").val()
  // }
  
  // console.log(commentID);
  // $.ajax("/api/jobs", {
  //   type: "POST",
  //   data: commentID
  //   }).then(
  //   function(){
  //     console.log("logged job id");
  //   }
  // );
  
});