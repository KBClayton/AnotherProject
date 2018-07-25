//arrays to help populate job tables when querying the USAjobs API
var jobArrayGov = [];
var jobsGov = [];
//arrays to help populate job tables when querying the authenticJobs API
var jobArrayAJ = [];
var jobsAJ = [];
//variables that will hold the number of responses (i.e. rows) are left in the 
//jobs table. helps toggle between 
var counterHelperUS = 0;
var counterHelperAJ = 0;
//submit button for USAJobs.gov search
$("#submit-jobSearchGov").on("click", function(){
  jobArrayGov = [];
  jobsGov = [];
  if (
    $("#jobKeywordSearchUS").val().trim() != "" &&
    $("#jobLocationStateUS").val().trim() != "" &&
    $("#jobSalarySearchUS").val().trim() != ""
  ){
 
    var searchKeywordUS = $("#jobKeywordSearchUS").val().trim().split(" ").join("+");
    console.log(searchKeywordUS);
    var searchLocationUS = $("#jobLocationCityUS").val().trim().toLowerCase().split(" ").join("+") + "+" + $("#jobLocationStateUS").val();
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
      else {
      for (i = 0 ; i < response.length ; i++){
        if ( response[i].minimum >= searchSalaryUS){
        jobArrayGov.push(response[i].position_title);
        jobArrayGov.push(response[i].organization_name);
        console.log(response[i].locations.length);
        if (response[i].locations.length > 1) {
          jobArrayGov.push("multiple openings");
        }
        else {
        jobArrayGov.push(response[i].locations.join(", "));
        }
        jobArrayGov.push(response[i].minimum);
        jobArrayGov.push(JSON.stringify(response[i].url));
        jobsGov.push(jobArrayGov);
        jobArrayGov = [];
          }
        }
      counterHelperUS = jobsGov.length;
      console.log("number of jobs returned: " + counterHelperUS);
      if (jobsGov.length < 1){
        alert("Sorry. None of the available jobs match your desired salary.")
        return;
      }
      $("#jobQueryUSdisplay").hide();
      for(i=0; i<jobsGov.length; i++){
        //add table html with relevant job data to the table body
        $("#jobTableUSBody").append("<tr id='jobRowUS" + i +"'> <th class='align-middle' scope='row' id='jobTitleUS"+ i +"'>" + jobsGov[i][0] + "</th> <td class='align-middle' id='jobCompanyUS"+ i +"'>" + jobsGov[i][1] + 
        "</td> <td class='align-middle' id='jobLocationUS"+ i +"'>"+ jobsGov[i][2] + 
        "</td> <td class='align-middle' id='jobSalaryUS"+ i +"'> $ " + Number(jobsGov[i][3]).toLocaleString('en') + 
        "</td><td class='align-middle' id='jobSalaryUS"+ i +"'><a href=" + jobsGov[i][4] + 
        " class='btn btn-info' id='jobLinkUS' role='button' target='blank'>Open Link in New Window</a></td>" +
        "<td class='align-middle'><button type='input' class='btn btn-primary rounded jobSelectorGovBtn' id='jobSelectorGovBtn'" + i + 
        "' value='" + i + "' >Add Me</button></td></tr>");         
        }
        $("#jobTableUSdisplay").show();
        $("#jobKeywordSearchUS").val("");
        $("#jobLocationCityUS").val("");
        $("#jobLocationStateUS").val("");
        $("#jobSalarySearchUS").val("");
        
    };
    });
  }
  else{
    alert("Please complete all input fields") 
   }
  });

  //submit button for authentic jobs search button
  $("#submit-jobSearchAJ").on("click", function(){
    jobArrayAJ = [];
    jobsAJ = [];

    if (
      $("#jobKeywordSearchAJ").val() != "" &&
      $("#jobLocationStateAJ").val().trim() != ""
    ){
      
      }
      var searchKeywordAJ= $("#jobKeywordSearchAJ").val().toString();
      console.log(searchKeywordAJ);
      var searchLocationAJ = $("#jobLocationCityAJ").val().trim().toLowerCase().split(" ").join("") + $("#jobLocationStateAJ").val() + "us";
      console.log(searchLocationAJ);
      var NewQueryAJ = {
        jobType: searchKeywordAJ,
        jobLocation: searchLocationAJ
      }
      console.log(NewQueryAJ);
      $.ajax("/api/authJobs", {
        type: "POST",
        data: NewQueryAJ
      }).then(
        function(response){
          console.log(response.listings.listing);
          if (response.listings.listing.length <1){

            alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
          }
          else {
          for (i = 0 ; i < response.listings.listing.length ; i++) {
            jobArrayAJ.push(response.listings.listing[i].title);
            jobArrayAJ.push(response.listings.listing[i].company.name);
            if (response.listings.listing[i].company.location == undefined) {
              jobArrayAJ.push("remote");
            }
            else {
            jobArrayAJ.push(response.listings.listing[i].company.location.name);
          }
            jobArrayAJ.push(JSON.stringify(response.listings.listing[i].url));
            jobsAJ.push(jobArrayAJ);
            console.log("success #" + i);
            jobArrayAJ = [];  
            
          }
            counterHelperAJ = jobsAJ.length
            console.log("number of jobs returned: " + counterHelperAJ);
  
            $("#jobQueryAJDisplay").hide();
            console.log(jobsAJ[0][0]);
            for(i=0; i<jobsAJ.length; i++){
              //add table html with relevant job data to the table body
              $("#jobTableAJBody").append("<tr id='jobRowAJ" + i +"'> <th class='align-middle' scope='row' id='jobTitleAJ"+ i +"'>" + jobsAJ[i][0] + "</th> <td class='align-middle' id='jobCompanyAJ"+ i +"'>" + jobsAJ[i][1] + 
              "</td> <td class='align-middle' id='jobLocationAJ"+ i +"'>"+ jobsAJ[i][2] + 
              "</td><td class='align-middle' id='jobLinkAJcell"+ i +"'><a href=" + jobsAJ[i][3] + 
              " class='btn btn-info' id='jobLinkAJ' role='button' target='blank'>Open Link in New Window</a></td>" +
              "<td class='align-middle'><button type='input' class='btn btn-primary rounded jobSelectorAJBtn' id='jobSelectorAJBtn'" + i + 
              "' value='" + i + "' >Add Me</button></td></tr>");         
              }
              $("#jobTableAJDisplay").show();
              $("#jobLocationSearchAJ").val("");
              $("#jobLocationCityAJ").val("");
              $("#jobLocationStateAJ").val("");
            
            
          }
        });
          
      });

    //add USAjobs API generated job to database
    $(document).on('click', '.jobSelectorGovBtn', function() {
      counterHelperUS--;
      console.log(counterHelperUS);
      var helper = $(this).val();
      var identifier = "jobRowUS" + helper;
      $("#" + identifier.toString()).hide();
      console.log(jobsGov[helper]);
      //Create NewJob Object
      var NewJob = {
        company: jobsGov[helper][1],
        contactName: null,
        contactPhone: null,
        position: jobsGov[helper][0],
        jobLocation: jobsGov[helper][2],
        confidenceLevel: null,
        postedSalary: jobsGov[helper][3],
        applicationLink: jobsGov[helper][4],
        userId: null
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
    if (counterHelperUS<1){
      console.log("HIDING")
      $("#jobTableUSdisplay").hide();
      $("#jobQueryUSdisplay").show();
      $("#jobTableUSBody").empty();

    }
  });

      //add AJ API generated job to database
      $(document).on('click', '.jobSelectorAJBtn', function() {
        counterHelperAJ--;
        console.log(counterHelperAJ);
        var helper = $(this).val();
        var identifier = "jobRowAJ" + helper;
        $("#" + identifier.toString()).hide();
        
        //Create NewJob Object
        var NewJob = {
          company: jobsAJ[helper][1],
          contactName: null,
          contactPhone: null,
          position: jobsAJ[helper][0],
          jobLocation: jobsAJ[helper][2],
          confidenceLevel: null,
          postedSalary: null,
          applicationLink: jobsAJ[helper][3],
          userId: null
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
      if (counterHelperAJ<1){
        console.log("HIDING")
        $("#jobTableAJDisplay").hide();
        $("#jobQueryAJDisplay").show();
        $("#jobTableAJBody").empty();
      }
    });

//change view from the USAjobs table view to the USAjobs search view
$(document).on('click', '.changeSearchUSBtn', function() {
$("#jobTableUSdisplay").hide();
$("#jobQueryUSdisplay").show();
$("#jobTableUSBody").empty();

});

//change view from the AJ table view to the AJ search view
$(document).on('click', '.changeSearchAJBtn', function() {
  $("#jobTableAJDisplay").hide();
  $("#jobQueryAJDisplay").show();
  $("#jobTableAJBody").empty();
  
});