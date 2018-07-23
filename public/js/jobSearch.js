var jobArrayGov = [];
var jobsGov = [];

/*$(document).ready(function(){
  $("#jobTableUSdisplay").hide();
  $("#jobQueryUSdisplay").show();
});*/
//submit button for USAJobs.gov search
$("#submit-jobSearchGov").on("click", function(){
  jobArrayGov = [];
  jobsGov = [];
  if (
    $("#jobKeywordSearchUS").val().trim() != "" &&
    $("#jobLocationSearchUS").val().trim() != "" &&
    $("#jobSalarySearchUS").val().trim() != ""
  ){
 
    var searchKeywordUS = $("#jobKeywordSearchUS").val().trim().split(" ").join("+");
    console.log(searchKeywordUS);
    var searchLocationUS = $("#jobLocationSearchUS").val().trim();
    var searchSalaryUS = $("#jobSalarySearchUS").val();
    //console.log(NewJob);
    var queryAuthJobsURL = ("https://jobs.search.gov/jobs/search.json?query=" + searchKeywordUS + "+in+" + searchLocationUS);
    console.log("query: " + queryAuthJobsURL)
    $.ajax({
        url:queryAuthJobsURL,
        method:"GET",
        dataType: "JSON",
    }).
    then(function(response){
      console.log(response.length);
      console.log(response);
      if (response.length <1){

        alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
      }
      else { $("#jobQueryUSdisplay").hide();
      for (i = 0 ; i < response.length ; i++){
        if ( response[i].minimum >= searchSalaryUS){
        jobArrayGov.push(response[i].position_title);
        jobArrayGov.push(response[i].organization_name);
        jobArrayGov.push(response[i].locations.join(", "));
        jobArrayGov.push(response[i].minimum);
        jobArrayGov.push(JSON.stringify(response[i].url));
        jobsGov.push(jobArrayGov);
        jobArrayGov = [];
          }
        }
      console.log(jobsGov);
      if (jobsGov.length < 1){
        alert("Sorry. None of the available jobs match your desired salary.")
      }
      $("#jobQueryUSdisplay").hide();
      for(i=0; i<jobsGov.length; i++){
        //add table html with relevant job data to the table body
        $("#jobTableUSBody").append("<tr> <th scope='row' id='jobTitleUS"+ i +"'>" + jobsGov[i][0] + "</td></th> <td id='jobCompanyUS"+ i +"'>" + jobsGov[i][1] + 
        "</td> <td id='jobLocationUS"+ i +"'>"+ jobsGov[i][2] + 
        "</td> <td id='jobSalaryUS"+ i +"'>" + jobsGov[i][3] + 
        "</td><td id='jobSalaryUS"+ i +"'><a href=" + jobsGov[i][4] + 
        " class='btn btn-info' id='jobLinkUS' role='button' target='blank'>Open Link in New Window</a></td>" +
        "<td><button type='input' class='btn btn-primary rounded jobSelectorBtn' id='jobSelectorBtn'" + i + 
        "' value='" + i + "' >Add Me</button></td>");         
        }
        $("#jobTableUSdisplay").show();
        
    };
    });
  }
  else{
    alert("Please complete all input fields") 
   }
  });

  //submit button for authentic jobs search button
  $("#submit-jobSearchAJ").on("click", function(){

    if (
      $("#jobKeywordSearchAJ").val() != "" &&
      $("#jobLocationSearchAJ").val().trim() != ""
    ){
      
      }
      var searchKeywordAJ= $("#jobKeywordSearchAJ").val();
      console.log(searchKeywordAJ);
      var searchLocationAJ = $("#jobLocationSearchAJ").val().trim();
      //console.log(NewJob);
      var queryAuthJobsURL = ("https://authenticjobs.com/api/?api_key=" + /*KEYKEYKEYKEYKEYKEYKEKYEKEY*/"&method=aj.jobs.search&category=" + searchKeywordAJ + "&perpage=5&location=" + searchLocationAJ + "&format=json")
      console.log("query: " + queryAuthJobsURL)
      $.ajax({
          url:queryAuthJobsURL,
          method:"GET",
          dataType: "JSON",
      }).
      then(function(response){
        console.log(response.listings.listing);
        console.log(response.listings.listing[0].title);
        console.log(response.listings.listing[0].company.name);
        console.log(response.listings.listing[0].company.location.name);
        console.log(JSON.stringify(response.listings.listing[0].url));
      });
    });

    //add API generated job to database
    $(document).on('click', '.jobSelectorBtn', function() {
      var helper = $(this).val();
      $(this).hide();
      //Create NewJob Object
      var NewJob = {
        company: jobsGov[helper][1],
        contactName: "N/A",
        contactPhone: "N/A",
        position: jobsGov[helper][0],
        jobLocation: jobsGov[helper][2],
        confidenceLevel: null,
        postedSalary: jobsGov[helper][3],
        applicationLInk: jobsGov[helper][4],
        userId: 2
      }
      console.log(NewJob);
    $.ajax("/api/jobs", {
      type: "POST",
      data: NewJob
    }).then(
      function(){
        console.log("Created New Job Lead");
      }
    );
  });