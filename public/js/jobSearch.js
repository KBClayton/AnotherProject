//arrays to help populate job tables when querying the USAjobs API
var jobArrayGov = [];
var jobsGov = [];
//arrays to help populate job tables when querying the authenticJobs API
var jobArrayAJ = [];
var jobsAJ = [];
//variable to hold the end of the authenticJobs query URL
var queryFooterAJ = "";
//variables that will hold the number of responses (i.e. rows) are left in the
//jobs table. helps toggle between
var counterHelperUS = 0;
var counterHelperAJ = 0;
//variables that enable a range of authentic Jobs API queries
var searchKeywordAJ = "";
var searchLocationAJ = "";
var tC = "";
//boolean variable to enable/disable location search for AJ API
var locStateBool = true;
//boolean variable to enable/disable remote-only search for AJ API
var remoteOnly = false;
//submit button for USAJobs.gov search
$("#submit-jobSearchGov").on("click", function() {
  jobArrayGov = [];
  jobsGov = [];
  if (
    $("#jobKeywordSearchUS")
      .val()
      .trim() !== "" &&
    $("#jobLocationStateUS")
      .val()
      .trim() !== "" &&
    $("#jobSalarySearchUS")
      .val()
      .trim() !== ""
  ) {
    var searchKeywordUS = $("#jobKeywordSearchUS")
      .val()
      .trim()
      .split(" ")
      .join("+");
    console.log(searchKeywordUS);
    var searchLocationUS =
      $("#jobLocationCityUS")
        .val()
        .trim()
        .toLowerCase()
        .split(" ")
        .join("+") +
      "+" +
      $("#jobLocationStateUS").val();
    var searchSalaryUS = $("#jobSalarySearchUS").val();
    //console.log(NewJob);
    var queryAuthJobsURL =
      "https://jobs.search.gov/jobs/search.json?query=" +
      searchKeywordUS +
      "+in+" +
      searchLocationUS;
    console.log("query: " + queryAuthJobsURL);
    $.ajax({
      url: queryAuthJobsURL,
      method: "GET",
      dataType: "JSON"
    }).then(function(response) {
      console.log(response.length);
      console.log(response);
      if (response.length <1){
        $("#modalTitle").text("No Jobs Found");
        $("#modalBody").text("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.");
        $('.modal').modal('show');

        // alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
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
        jobArrayGov.push(response[i].id);
        jobsGov.push(jobArrayGov);
        jobArrayGov = [];
          }
        }
      counterHelperUS = jobsGov.length;
      console.log("number of jobs returned: " + counterHelperUS);
      if (jobsGov.length < 1){
        // alert("Sorry. None of the available jobs match your desired salary.")
        $("#modalTitle").text("No Jobs Found");
        $("#modalBody").text("Sorry. There are no jobs matching your desired salary.");
        $('.modal').modal('show');
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
      }
    });
  // } else {
  //   alert("Please complete all input fields");
  }
  else{
    // alert("Please complete all input fields")
    $("#modalTitle").text("Missing Required Fields");
    $("#modalBody").text("Please fill out all of the required fields and try searching again.");
    $('.modal').modal('show');
   }
  });

//submit button for authentic jobs search button
$("#submit-jobSearchAJ").on("click", function() {
  //clear out holder arrays
  jobArrayAJ = [];
  jobsAJ = [];
  //ensure the user keyword search is not empty
  if ($("#jobKeywordSearchAJ").val() === "") {
    // alert("Please enter an area of expertise.")
    $("#modalTitle").text("Missing Required Field(s)");
    $("#modalBody").text("Please enter an Area of Expertise to continue");
    $(".modal").modal("show");
    return;
  }
  if (
    $("#jobLocationStateAJ").val() === "" &&
    locStateBool === true &&
    remoteOnly === false
  ) {
    //) {
    $("#modalTitle").text("Missing Required Field(s)");
    $("#modalBody").text("Please enter an Location - State to continue");
    $(".modal").modal("show");
    // alert("Enter a State to Continue.");
    return;
  }
  searchKeywordAJ = $("#jobKeywordSearchAJ")
    .val()
    .toString();
  if (locStateBool === false) {
    queryFooterAJ =
      "&method=aj.jobs.search&category=" +
      searchKeywordAJ +
      "&perpage=15&format=json";
    console.log("return all jobs query:   IS EQUAL TO " + queryFooterAJ);

    var NewQueryAJ = {
      userQueryAJ: queryFooterAJ
    };
    $.ajax("/api/authJobs", {
      type: "POST",
      data: NewQueryAJ
    }).then(function(response) {
      console.log(response.listings.listing);
      if (response.listings.listing.length < 1) {
        $("#modalTitle").text("No Jobs Found");
        $("#modalBody").text(
          "Sorry. We were unable to find any jobs matching your requirements, please try a different search keyword or location."
        );
        $(".modal").modal("show");
        // alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
      } else {
        for (i = 0; i < response.listings.listing.length; i++) {
          jobArrayAJ.push(response.listings.listing[i].title);
          jobArrayAJ.push(response.listings.listing[i].company.name);
          if (response.listings.listing[i].company.location === undefined) {
            jobArrayAJ.push("remote");
          } else {
            jobArrayAJ.push(response.listings.listing[i].company.location.name);
          }
          jobArrayAJ.push(JSON.stringify(response.listings.listing[i].url));
          jobArrayAJ.push(response.listings.listing[i].id);
          jobsAJ.push(jobArrayAJ);
          console.log("success #" + i);
          jobArrayAJ = [];
        }
        counterHelperAJ = jobsAJ.length;
        console.log("number of jobs returned: " + counterHelperAJ);

        $("#jobQueryAJDisplay").hide();
        console.log(jobsAJ[0][0]);
        for (i = 0; i < jobsAJ.length; i++) {
          //add table html with relevant job data to the table body
          $("#jobTableAJBody").append(
            "<tr id='jobRowAJ" +
              i +
              "'> <th class='align-middle' scope='row' id='jobTitleAJ" +
              i +
              "'>" +
              jobsAJ[i][0] +
              "</th> <td class='align-middle' id='jobCompanyAJ" +
              i +
              "'>" +
              jobsAJ[i][1] +
              "</td> <td class='align-middle' id='jobLocationAJ" +
              i +
              "'>" +
              jobsAJ[i][2] +
              "</td><td class='align-middle' id='jobLinkAJcell" +
              i +
              "'><a href=" +
              jobsAJ[i][3] +
              " class='btn btn-info' id='jobLinkAJ' role='button' target='blank'>Open Link in New Window</a></td>" +
              "<td class='align-middle'><button type='input' class='btn btn-primary rounded jobSelectorAJBtn' id='jobSelectorAJBtn'" +
              i +
              "' value='" +
              i +
              "' >Add Me</button></td></tr>"
          );
        }
        $("#jobTableAJDisplay").show();
        $("#jobLocationSearchAJ").val("");
        $("#jobLocationCityAJ").val("");
        $("#jobLocationStateAJ").val("");
      }
    });
    return;
  }
  if (
    $("#jobLocationStateAJ")
      .val()
      .trim() !== ""
  ) {
    searchKeywordAJ = $("#jobKeywordSearchAJ")
      .val()
      .toString();
    console.log(searchKeywordAJ);
    if ($("#tcIncludeRadio:checked").val() === "on") {
      searchLocationAJ =
        "&location=" +
        $("#jobLocationCityAJ")
          .val()
          .trim()
          .toLowerCase()
          .split(" ")
          .join("") +
        $("#jobLocationStateAJ").val() +
        "us,anywhere";
      tC = "";
      console.log("INCLUDED");
    } else if ($("#tcExcludeRadio:checked").val() === "on") {
      searchLocationAJ =
        "&location=" +
        $("#jobLocationCityAJ")
          .val()
          .trim()
          .toLowerCase()
          .split(" ")
          .join("") +
        $("#jobLocationStateAJ").val() +
        "us";
      tC = "&telecommuting=0";
      console.log("EXCLUDED");
    } else if ($("#tcOnlyRadio:checked").val() === "on") {
      searchLocationAJ = "";
      tC = "&telecommuting=1";
      console.log("ONLY");
    } else {
      console.log("check not registered");
      $("#modalTitle").text("Unknown Error");
      $("#modalBody").text(
        "There seems to be something wrong on our end.  We are working hard to fix it."
      );
      $(".modal").modal("show");
      // alert("whoops! someting went wrong -- we're working hard to fix it, though!")
    }
    console.log(searchLocationAJ);
    console.log(tC);
    queryFooterAJ =
      "&method=aj.jobs.search&category=" +
      searchKeywordAJ +
      searchLocationAJ +
      tC +
      "&perpage=15&format=json";
    console.log(queryFooterAJ);
    var NewQueryAJ = {
      userQueryAJ: queryFooterAJ
    };
    console.log(NewQueryAJ);
    $.ajax("/api/authJobs", {
      type: "POST",
      data: NewQueryAJ
    }).then(function(response) {
      console.log(response.listings.listing);
      if (response.listings.listing.length < 1) {
        $("#modalTitle").text("No Jobs Found");
        $("#modalBody").text(
          "Sorry. We were unable to find any jobs matching your requirements, please try a different search keyword or location."
        );
        $(".modal").modal("show");
        // alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
      } else {
        for (i = 0; i < response.listings.listing.length; i++) {
          jobArrayAJ.push(response.listings.listing[i].title);
          jobArrayAJ.push(response.listings.listing[i].company.name);
          if (response.listings.listing[i].company.location === undefined) {
            jobArrayAJ.push("remote");
          } else {
            jobArrayAJ.push(response.listings.listing[i].company.location.name);
          }
          jobArrayAJ.push(JSON.stringify(response.listings.listing[i].url));
          jobArrayAJ.push(response.listings.listing[i].id);
          jobsAJ.push(jobArrayAJ);
          console.log("success #" + i);
          jobArrayAJ = [];
        }
        counterHelperAJ = jobsAJ.length;
        console.log("number of jobs returned: " + counterHelperAJ);

        $("#jobQueryAJDisplay").hide();
        console.log(jobsAJ[0][0]);
        for (i = 0; i < jobsAJ.length; i++) {
          //add table html with relevant job data to the table body
          $("#jobTableAJBody").append(
            "<tr id='jobRowAJ" +
              i +
              "'> <th class='align-middle' scope='row' id='jobTitleAJ" +
              i +
              "'>" +
              jobsAJ[i][0] +
              "</th> <td class='align-middle' id='jobCompanyAJ" +
              i +
              "'>" +
              jobsAJ[i][1] +
              "</td> <td class='align-middle' id='jobLocationAJ" +
              i +
              "'>" +
              jobsAJ[i][2] +
              "</td><td class='align-middle' id='jobLinkAJcell" +
              i +
              "'><a href=" +
              jobsAJ[i][3] +
              " class='btn btn-info' id='jobLinkAJ' role='button' target='blank'>Open Link in New Window</a></td>" +
              "<td class='align-middle'><button type='input' class='btn btn-primary rounded jobSelectorAJBtn' id='jobSelectorAJBtn'" +
              i +
              "' value='" +
              i +
              "' >Add Me</button></td></tr>"
          );
        }
        $("#jobTableAJDisplay").show();
        $("#jobLocationSearchAJ").val("");
        $("#jobLocationCityAJ").val("");
        $("#jobLocationStateAJ").val("");
      }
    }); //HERE HERE HERE HERE
  } else if ((remoteOnly = true)) {
    searchLocationAJ = "";
    tC = "&telecommuting=1";
    queryFooterAJ =
      "&method=aj.jobs.search&category=" +
      searchKeywordAJ +
      searchLocationAJ +
      tC +
      "&perpage=15&format=json";
    console.log(queryFooterAJ);
    var NewQueryAJ = {
      userQueryAJ: queryFooterAJ
    };
    console.log(NewQueryAJ);
    $.ajax("/api/authJobs", {
      type: "POST",
      data: NewQueryAJ
    }).then(function(response) {
      console.log(response.listings.listing);
      if (response.listings.listing.length < 1) {
        $("#modalTitle").text("No Jobs Found");
        $("#modalBody").text(
          "Sorry. We were unable to find any jobs matching your requirements, please try a different search keyword or location."
        );
        $(".modal").modal("show");
        // alert("Sorry. There are no jobs matching your requirements, please try a different search keyword or location.")
      } else {
        for (i = 0; i < response.listings.listing.length; i++) {
          jobArrayAJ.push(response.listings.listing[i].title);
          jobArrayAJ.push(response.listings.listing[i].company.name);
          if (response.listings.listing[i].company.location === undefined) {
            jobArrayAJ.push("remote");
          } else {
            jobArrayAJ.push(response.listings.listing[i].company.location.name);
          }
          jobArrayAJ.push(JSON.stringify(response.listings.listing[i].url));
          jobArrayAJ.push(response.listings.listing[i].id);
          jobsAJ.push(jobArrayAJ);
          console.log("success #" + i);
          jobArrayAJ = [];
        }
        counterHelperAJ = jobsAJ.length;
        console.log("number of jobs returned: " + counterHelperAJ);

        $("#jobQueryAJDisplay").hide();
        console.log(jobsAJ[0][0]);
        for (i = 0; i < jobsAJ.length; i++) {
          //add table html with relevant job data to the table body
          $("#jobTableAJBody").append(
            "<tr id='jobRowAJ" +
              i +
              "'> <th class='align-middle' scope='row' id='jobTitleAJ" +
              i +
              "'>" +
              jobsAJ[i][0] +
              "</th> <td class='align-middle' id='jobCompanyAJ" +
              i +
              "'>" +
              jobsAJ[i][1] +
              "</td> <td class='align-middle' id='jobLocationAJ" +
              i +
              "'>" +
              jobsAJ[i][2] +
              "</td><td class='align-middle' id='jobLinkAJcell" +
              i +
              "'><a href=" +
              jobsAJ[i][3] +
              " class='btn btn-info' id='jobLinkAJ' role='button' target='blank'>Open Link in New Window</a></td>" +
              "<td class='align-middle'><button type='input' class='btn btn-primary rounded jobSelectorAJBtn' id='jobSelectorAJBtn'" +
              i +
              "' value='" +
              i +
              "' >Add Me</button></td></tr>"
          );
        }
        $("#jobTableAJDisplay").show();
        $("#jobLocationSearchAJ").val("");
        $("#jobLocationCityAJ").val("");
        $("#jobLocationStateAJ").val("");
      }
    });
  } else {
    $("#modalTitle").text("Missing Required Field(s)");
    $("#modalBody").text("Please enter a Location - State to continue.");
    $(".modal").modal("show");
    // alert("Please Choose a State to Continue.");
  }
});

//add USAjobs API generated job to database
$(document).on("click", ".jobSelectorGovBtn", function() {
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
    jobSearchID: jobsGov[helper][5]
  };
  console.log(NewJob);
  $.ajax("/api/tableCheckerJiD", {
    type: "GET",
    data: NewJob
  }).then(function(res) {
    console.log("checked");
    console.log(res);
    if (res === false) {
      console.log("job is already saved");
      if (counterHelperUS < 1) {
        console.log("HIDING");
        $("#jobTableUSdisplay").hide();
        $("#jobQueryUSdisplay").show();
        $("#jobTableUSBody").empty();
      }
    } else {
      $.ajax("/api/jobs", {
        type: "POST",
        data: NewJob
      }).then(function() {
        console.log("Created New Job Lead");

        if (counterHelperUS < 1) {
          console.log("HIDING");
          $("#jobTableUSdisplay").hide();
          $("#jobQueryUSdisplay").show();
          $("#jobTableUSBody").empty();
        }
      });
    }
  });
});

//add AJ API generated job to database
$(document).on("click", ".jobSelectorAJBtn", function() {
  counterHelperAJ--;
  console.log(counterHelperAJ);
  var helper = $(this).val();
  var identifier = "jobRowAJ" + helper;
  $("#" + identifier.toString()).hide();
  console.log("#" + identifier.toString());
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
    jobSearchID: jobsAJ[helper][4]
  };
  console.log(NewJob);
  $.ajax("/api/tableCheckerJiD", {
    type: "GET",
    data: NewJob
  }).then(function(res) {
    console.log("checked");
    console.log(res);
    if (res === false) {
      console.log("job is already saved");
      if (counterHelperAJ < 1) {
        console.log("HIDING");
        $("#jobTableAJDisplay").hide();
        $("#jobQueryAJDisplay").show();
        $("#jobTableAJBody").empty();
      }
    } else {
      $.ajax("/api/jobs", {
        type: "POST",
        data: NewJob
      }).then(function() {
        console.log("Created New Job Lead");

        if (counterHelperAJ < 1) {
          console.log("HIDING");
          $("#jobTableAJDisplay").hide();
          $("#jobQueryAJDisplay").show();
          $("#jobTableAJBody").empty();
        }
      });
    }
  });
});

//change view from the USAjobs table view to the USAjobs search view
$(document).on("click", ".changeSearchUSBtn", function() {
  $("#jobTableUSdisplay").hide();
  $("#jobQueryUSdisplay").show();
  $("#jobTableUSBody").empty();
});

//change view from the AJ table view to the AJ search view
$(document).on("click", ".changeSearchAJBtn", function() {
  $("#jobTableAJDisplay").hide();
  $("#jobQueryAJDisplay").show();
  $("#jobTableAJBody").empty();
});

//hide locationDisplayHolder, set  and toggle to location disabled
$(document).on("click", "#tcOnlyRadio", function() {
  console.log("clicked");
  $("#locationHolderAJ").hide();
  remoteOnly = true;
  console.log("rOTRUETRUETRUE");
  //$("#jobQueryAJDisplay").show();
  //$("#jobTableAJBody").empty();
});

//show location search and toggle to location enabled
$(document).on("click", "#tcIncludeRadio", function() {
  console.log("clicked");
  //$("#jobTableAJDisplay").hide();
  $("#locationHolderAJ").show();
  remoteOnly = false;
  console.log("rOfalse");
  //$("#jobTableAJBody").empty();
});

//show location search and toggle to location enabled
$(document).on("click", "#tcExcludeRadio", function() {
  console.log("clicked");
  //$("#jobTableAJDisplay").hide();
  $("#locationHolderAJ").show();
  remoteOnly = false;
  console.log("rOfalse");
  //$("#jobTableAJBody").empty();
});

//force API to return all available jobs of a given type
$(document).on("click", ".showAllJobsBtn", function() {
  console.log("clicked lSBFALSE");
  $("#locationHolderAJ").hide();
  $(".radioToggleAJ").hide();
  $("#locationDisplayHolder").show();
  locStateBool = false;
  console.log("lSB is false");
});

//enable focused job search
$(document).on("click", ".locationDisplayBtn", function() {
  console.log("clicked lSBTRUE");
  $("#locationDisplayHolder").hide();
  $("#locationHolderAJ").show();
  $(".radioToggleAJ").show();
  locStateBool = true;
});
