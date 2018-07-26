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
});