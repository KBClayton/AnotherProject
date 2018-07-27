$( document ).ready(function() {
  console.log( "ready!" );

  $.ajax({
    url:"/api/jobs/1",
    method:"GET",
  
}).then(
    function(){
      console.log("Heyo");
    }
  );

});

var jobID = $('#chComp')[0].placeholder;
console.log(jobID);




// javascript for editing contactName

$("#saveContChanges").on("click", function(){

  if (
    $("#chCont").val().trim() != ""
 
  ){
    console.log("test")
 
    // Create changeContact Object
    var changeContact = {
      contact: $("#chCont").val().trim(),
      id: jobID
    }

    console.log(changeContact);
    $.ajax("/api/jobs/changeName/"+jobID, {
      type: "PUT",
      data: changeContact
    }).then(
      function(){
        console.log("Changed contact");
      }
    );
  }else{
    console.log("no changes made");
  }
});

// javascript for editing contactPhone
$("#savePhoneChanges").on("click", function(){

  if (
    $("#chPhone").val().trim() != ""
 
  ){
    console.log("test")
 
    // Create changePhone Object
    var changePhone = {
      phone: $("#chPhone").val().trim(),
      id: jobID
    }

    console.log(changePhone);
    $.ajax("/api/jobs/changePhone/"+jobID, {
      type: "PUT",
      data: changePhone
    }).then(
      function(){
        console.log("Changed contact phone");
      }
    );
  }else{
    console.log("no changes made");
  }
});


// $('#chConfidence').on('click',function() {
  
//   console.log($(this).val());
// });


console.log($('#chConfidence').val());



// javascript for editing confidencelevel
$("#chConfidenceBtn").on("click", function(){

     console.log("test")
 
    // Create changePhone Object
    var changeConfidence = {
      confidence: $("#chConfidence").val().trim(),
      id: jobID
    }

    console.log(changeConfidence);
    $.ajax("/api/jobs/changeConfidence/"+jobID, {
      type: "PUT",
      data: changeConfidence
    }).then(
      function(){
        console.log("Changed confidence");
      }
    );
  
});
