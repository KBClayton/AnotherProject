var jobArrayGov = [];
var jobsGov = [];
var jobArrayAJ = [];
var jobsAJ = [];
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
      else {
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
        return;
      }
      $("#jobQueryUSdisplay").hide();
      for(i=0; i<jobsGov.length; i++){
        //add table html with relevant job data to the table body
        $("#jobTableUSBody").append("<tr id='jobRowUS" + i +"'> <th scope='row' id='jobTitleUS"+ i +"'>" + jobsGov[i][0] + "</td></th> <td id='jobCompanyUS"+ i +"'>" + jobsGov[i][1] + 
        "</td> <td id='jobLocationUS"+ i +"'>"+ jobsGov[i][2] + 
        "</td> <td id='jobSalaryUS"+ i +"'> $ " + Number(jobsGov[i][3]).toLocaleString('en') + 
        "</td><td id='jobSalaryUS"+ i +"'><a href=" + jobsGov[i][4] + 
        " class='btn btn-info' id='jobLinkUS' role='button' target='blank'>Open Link in New Window</a></td>" +
        "<td><button type='input' class='btn btn-primary rounded jobSelectorGovBtn' id='jobSelectorGovBtn'" + i + 
        "' value='" + i + "' >Add Me</button></td></tr>");         
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
    jobArrayAJ = [];
    jobsAJ = [];

    if (
      $("#jobKeywordSearchAJ").val() != "" &&
      $("#jobLocationSearchAJ").val().trim() != ""
    ){
      
      }
      var searchKeywordAJ= $("#jobKeywordSearchAJ").val();
      console.log(searchKeywordAJ);
      var searchLocationAJ = $("#jobLocationSearchAJ").val().trim();
      //console.log(NewJob);
      var queryAuthJobsURL = ("https://authenticjobs.com/api/?api_key=c45c6054ab7267ff5afbfdd74058dca0&method=aj.jobs.search&category=" + searchKeywordAJ + "&perpage=5&location=" + searchLocationAJ + "&format=json")
      console.log("query: " + queryAuthJobsURL)
      $.ajax({
          url:queryAuthJobsURL,
          method:"GET",
          dataType: "JSON",
      }).
      then(function(response){
        if (response.listings.listing.length <1){

          alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
        }
        else {
        for (i = 0 ; i < response.listings.listing.length ; i++){
          jobArrayAJ.push(response.listings.listing[i].title);
          jobArrayAJ.push(response.listings.listing[i].company.name);
          jobArrayAJ.push(response.listings.listing[i].company.location.name);
          jobArrayAJ.push(JSON.stringify(response.listings.listing[i].url));
          jobsAJ.push(jobArrayAJ);
          console.log("success #" + i);
          jobArrayAJ = [];  
          }
          console.log(jobsAJ);

          $("#jobQueryAJDisplay").hide();
          console.log(jobsAJ[0][0]);
          for(i=0; i<jobsAJ.length; i++){
            //add table html with relevant job data to the table body
            $("#jobTableAJBody").append("<tr id='jobRowAJ" + i +"'> <th scope='row' id='jobTitleAJ"+ i +"'>" + jobsAJ[i][0] + "</td></th> <td id='jobCompanyAJ"+ i +"'>" + jobsAJ[i][1] + 
            "</td> <td id='jobLocationAJ"+ i +"'>"+ jobsAJ[i][2] + 
            "</td><td id='jobLinkAJcell"+ i +"'><a href=" + jobsAJ[i][3] + 
            " class='btn btn-info' id='jobLinkAJ' role='button' target='blank'>Open Link in New Window</a></td>" +
            "<td><button type='input' class='btn btn-primary rounded jobSelectorAJBtn' id='jobSelectorAJBtn'" + i + 
            "' value='" + i + "' >Add Me</button></td></tr>");         
            }
            $("#jobTableAJDisplay").show();
          
      };
    });
  });

    //add USAjobs API generated job to database
    $(document).on('click', '.jobSelectorGovBtn', function() {
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

      //add AJ API generated job to database
      $(document).on('click', '.jobSelectorAJBtn', function() {
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
          applicationLInk: jobsAJ[helper][3],
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

//change view from the USAjobs table view to the USAjobs search view
$(document).on('click', '.changeSearchUSBtn', function() {
$("#jobTableUSdisplay").hide();
$("#jobQueryUSdisplay").show();

});

//change view from the AJ table view to the AJ search view
$(document).on('click', '.changeSearchAJBtn', function() {
  $("#jobTableAJDisplay").hide();
  $("#jobQueryAJDisplay").show();
  
});