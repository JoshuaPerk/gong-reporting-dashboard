let jsonGongData, filterResult, team;
let labels, data, filterArray = [];
let baseURL = "https://app.gong.io/calls/ajax/calls?";
let companyId = "3568831574419877865";
let pageSize = 5000;
let pageOffset = 0;
var CLIENT_ID = '393986627865-du66b48n8dtc1iscfnqh4olp1qp47otk.apps.googleusercontent.com';
var API_KEY = 'AIzaSyC4L_BND_f8ApeMY4_8sLNs7uKhPeCX4ac';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var authorizeButton = document.getElementById('authorize_button');
var dataForm = document.getElementById('dataForm');

$('#inputGongData').focus();
$('#generateURL').click(function(){
  pageSize = $('#pageSize').val();
  filterResult = '';
  filterArray = [];
  switch($('#timeframe').val()) {
    case 'week':
      filterArray.push(`{"type":"PredefinedCallTime","period":"THIS_WEEK"}`);
      break;
    case 'month':
      filterArray.push(`{"type":"PredefinedCallTime","period":"THIS_MONTH"}`);
      break;
    case 'quarter':
      filterArray.push(`{"type":"PredefinedCallTime","period":"THIS_QUARTER"}`);
      break;
    case 'year':
      filterArray.push(`{"type":"PredefinedCallTime","period":"THIS_YEAR}`);
      break;
    case 'last7':
      filterArray.push(`{"type":"RelativeCallTime","last":7,"unit":"DAYS"}`);
      break;
    case 'last30':
      filterArray.push(`{"type":"RelativeCallTime","last":30,"unit":"DAYS"}`);
      break;
    case 'last60':
      filterArray.push(`{"type":"RelativeCallTime","last":60,"unit":"DAYS"}`);
      break;
    case 'last90':
      filterArray.push(`{"type":"RelativeCallTime","last":90,"unit":"DAYS"}`);
      break;
    case 'last365':
      filterArray.push(`{"type":"RelativeCallTime","last":365,"unit":"DAYS"}`);
      break;
    case 'custom':
      filterArray.push(`{"type":"AbsoluteCallDateRange","from":"${$('#startRange').val()}","to":"${$('#endRange').val()}"}`);
      break;
    default:
      // Nothing to push
  }

  if (document.getElementById('scope').checked) {
    filterArray.push(`{"type":"InternalMeeting","internal":false,"external":true,"missing":true}`);
  }

  var participantsArray = [];
  $(".participant").each(function() {
    if (document.getElementById(this.id).checked) {
      participantsArray.push(this.value)
    }
  });

  if (participantsArray.length) {
    filterArray.push(`{"type":"Participant","userIds":${JSON.stringify(participantsArray)}}`);
  }

  if (filterArray.length) {
    filterResult = `"search":{"type":"And","filters":[${filterArray}]}`;
  }
  $("#gongURL").val(`https://app.gong.io/calls/ajax/calls?company-id=${companyId}&pageSize=${pageSize}&offset=${pageOffset}&callSearch={${filterResult}}`);
    $("#gongURL").select();
    document.execCommand("copy");
    window.open(`https://app.gong.io/calls/ajax/calls?company-id=${companyId}&pageSize=${pageSize}&offset=${pageOffset}&callSearch={${filterResult}}`);
    $('#inputGongData').focus();
});
$('#processData').click(function(){
  resetDataLayer();
  try {
    jsonGongData = JSON.parse($('#inputGongData').val());
    $('.results').show();
    $('#inputGongData').val('');
    $('#gongURL').val('');
    console.log('Success: inputGongData parsed to JSON.');
    processData();
  } catch (e) {
    console.log('The data pasted in inputGongData in not valid JSON.');
    return;
  }
});
$('#applyFilter').click(function(){
  resetDataLayer();
  // Data should already be in jsonGongData
  processData();
});
function resetDataLayer(){
  team = {
    "numberOfCalls": 0,
    "duration": 0,
    "avgDuration": 0,
    "interactivity": 0,
    "avgInteractivity": 0,
    "stageNowClosed": 0,
    "stageNowWon": 0,
    "amountAtCall": 0,
    "amountNow": 0,
    "unitUsage": {},
    "orgUsage": {},
    "stageAtCall": {},
    "stageNow": {},
    "closedValue": 0,
    "wonValue": 0,
    "winRate": 0,
    "topics": {},
    "accountTypes": {},
    "opportunityTypes": {},
    "owners": {},
    "numberOfQuestionRequests": 0,
    "questionValue": 0,
    "questionOwners": {},
    "questionOrgUsage": {},
    "questionUnitUsage": {},
    "members": [
      {
        "name": "Joshua Perk",
        "title": "Sales Engineer",
        "department": "Pre-Solutions"
      },{
        "name": "Nate Hoffelmeyer",
        "title": "Solutions Engineer",
        "department": "Post-Solutions"
      },{
        "name": "David Thompson",
        "title": "Sales Engineer",
        "department": "Pre-Solutions"
      },{
        "name": "Ashley Basinger",
        "title": "Sales Engineer",
        "department": "Pre-Solutions",
      }
    ],
    "users": [
        {"name":"William Kiley","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Michael Rogewitz","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Maddie Gauthier","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Jeff Sullivan","unit":"INT","org":"Sales","slackID":"jsullivan"},
        {"name":"Mari O'Leary","unit":"SME","org":"Sales","slackID":""},
        {"name":"Max Sandoval","unit":"SME","org":"AM","slackID":"msandoval"},
        {"name":"Collin O'Brien","unit":"SMB","org":"AM","slackID":""},
        {"name":"Madelyn Ligtenberg","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Nick Brown","unit":"SME","org":"AM","slackID":""},
        {"name":"Jeff Andrew Mabute-Louie","unit":"SME","org":"Sales","slackID":""},
        {"name":"Stephanie Durocher","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Ciaran Nugent","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Michael Pantano","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Courtney Thompson","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Steve Palombo","unit":"SME","org":"Sales","slackID":""},
        {"name":"Hambisa Goso","unit":"SME","org":"Sales","slackID":"hgoso"},
        {"name":"Ryan Heavey","unit":"SME","org":"Sales","slackID":"rheavey"},
        {"name":"Michael Grundig","unit":"SMB","org":"Sales","slackID":"mgrundig"},
        {"name":"Dan Salvetti","unit":"SME","org":"Sales","slackID":""},
        {"name":"Nick Christolos","unit":"SME","org":"Sales","slackID":""},
        {"name":"Kerry Harris","unit":"SME","org":"Sales","slackID":""},
        {"name":"Bryan Blaha","unit":"SME","org":"Sales","slackID":""},
        {"name":"Sean Kenny","unit":"SME","org":"AM","slackID":""},
        {"name":"Aaron Roberts","unit":"INT","org":"Sales","slackID":"aroberts"},
        {"name":"Ally Bresnahan","unit":"SME","org":"Sales","slackID":""},
        {"name":"Jason Mercer","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Lindsey Riordan","unit":"SMB","org":"Sales","slackID":"lriordan"},
        {"name":"Sawyer Dew","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Tucker Cohen","unit":"SME","org":"Partner","slackID":""},
        {"name":"Claire Kennedy","unit":"SMB","org":"Sales","slackID":""},
        {"name":"John Murphy","unit":"SMB","org":"Sales","slackID":"jmurphy"},
        {"name":"David Johnson","unit":"SMB","org":"Sales","slackID":"davidjohnson1562"},
        {"name":"Erin Silva","unit":"INT","org":"CSM","slackID":"esilva"},
        {"name":"Christina Nalband","unit":"SME","org":"Sales","slackID":""},
        {"name":"Katie Ferris","unit":"Siftrock","org":"Sales","slackID":""},
        {"name":"Alex Hanbury","unit":"ENT","org":"Sales","slackID":"ahanbury"},
        {"name":"Ryan Topal","unit":"SMB","org":"Sales","slackID":"ryan.topal"},
        {"name":"Derek Kelliher","unit":"ENT","org":"Sales","slackID":""},
        {"name":"Robert Boerrigter","unit":"SMB","org":"Sales","slackID":"rboerrigter"},
        {"name":"Eve Pham","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Tyler Guzzi","unit":"SMB","org":"Sales","slackID":"tguzzi"},
        {"name":"Reed Wazorko","unit":"SME","org":"AM","slackID":""},
        {"name":"Kelvin Sims","unit":"SMB","org":"Sales","slackID":"ksims"},
        {"name":"James Pidgeon","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Joe Dell'Erario","unit":"SMB","org":"Sales","slackID":"jdellerario"},
        {"name":"Evan Cassidy","unit":"ENT","org":"Sales","slackID":"ecassidy"},
        {"name":"Vittorio Monteverdi","unit":"SMB","org":"Sales","slackID":"vmonteverdi"},
        {"name":"Tanner Fogarty","unit":"ENT","org":"Sales","slackID":""},
        {"name":"Brendan Collins","unit":"SME","org":"AM","slackID":"bcollins"},
        {"name":"Katy Zingale","unit":"SME","org":"AM","slackID":"kzingale"},
        {"name":"Molly Dexter","unit":"SME","org":"Sales","slackID":""},
        {"name":"Jordan Pal","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Brad Forgetta","unit":"ENT","org":"Sales","slackID":""},
        {"name":"Bennett Boucher","unit":"SME","org":"Sales","slackID":""},
        {"name":"Trent Mosley","unit":"SME","org":"Partner","slackID":""},
        {"name":"Miles Kane","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Allen Knox","unit":"ENT","org":"Sales","slackID":"aknox8781"},
        {"name":"Kelly Barnett","unit":"SME","org":"Sales","slackID":"kbarnett"},
        {"name":"Adam Cox","unit":"SME","org":"Sales","slackID":""},
        {"name":"Lincoln Brown","unit":"SME","org":"Sales","slackID":"lbrown3382"},
        {"name":"Adrian Nardella","unit":"SMB","org":"CSM","slackID":""},
        {"name":"Lilly Steeves","unit":"SME","org":"Sales","slackID":""},
        {"name":"Paul Axelrod","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Amanda Chiang","unit":"ENT","org":"Sales","slackID":""},
        {"name":"Sara Miller","unit":"SME","org":"Sales","slackID":""},
        {"name":"Shannon Donovan","unit":"SME","org":"Sales","slackID":"sdonovan"},
        {"name":"Elliott Thomas","unit":"SMB","org":"CSM","slackID":"ejthomas2390"},
        {"name":"Blake Kelly","unit":"SME","org":"Sales","slackID":"bkelly"},
        {"name":"Jason Phillips","unit":"SME","org":"AM","slackID":"jbprugby"},
        {"name":"Michele Albanese","unit":"Siftrock","org":"CSM","slackID":""},
        {"name":"Adrianne Ober","unit":"SME","org":"CSM","slackID":"bostonadrianne"},
        {"name":"Alex Lemieux","unit":"ENT","org":"CSM","slackID":"alemieux"},
        {"name":"Amanda Arthur","unit":"ENT","org":"AM","slackID":""},
        {"name":"Bailey Best","unit":"SME","org":"CSM","slackID":"bbest"},
        {"name":"Caitlin Sullivan","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Christine Hayden","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Daniel Salvetti","unit":"SME","org":"Sales","slackID":"dsalvetti"},
        {"name":"Elizabeth Glavan","unit":"SME","org":"CSM","slackID":"eglavan"},
        {"name":"Erin Washburn","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Jaclyn Van","unit":"SMB","org":"CSM","slackID":"jvan"},
        {"name":"Jacqueline McLaughlin","unit":"SMB","org":"Sales","slackID":"jmclaughlin"},
        {"name":"Jason Richman","unit":"SME","org":"Sales","slackID":""},
        {"name":"Jon Ravesi","unit":"SME","org":"Partner","slackID":""},
        {"name":"Joshua Perk","unit":"ENT","org":"Sales","slackID":""},
        {"name":"Ken Shin","unit":"ENT","org":"AM","slackID":""},
        {"name":"Kristine O'Brien","unit":"SME","org":"CSM","slackID":""},
        {"name":"Lottie Hedden","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Mary Mitchell","unit":"ENT","org":"Sales","slackID":""},
        {"name":"Mike Gotera","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Molly Head","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Nate Hoffelmeyer","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Nathan Chein","unit":"ENT","org":"CSM","slackID":""},
        {"name":"Neil Fiedler","unit":"SME","org":"AM","slackID":"nfiedler"},
        {"name":"Robert Perez","unit":"SME","org":"Sales","slackID":""},
        {"name":"Sam Gifford","unit":"Siftrock","org":"Sales","slackID":""},
        {"name":"Seamus McGrath","unit":"SME","org":"Partner","slackID":""},
        {"name":"Sebastean Gonzalez-Johnson","unit":"SMB","org":"Sales","slackID":""},
        {"name":"Sophie Teraoka","unit":"ENT","org":"CSM","slackID":"sophie.teraoka"},
        {"name":"Taylor Miller","unit":"ENT","org":"CSM","slackID":""}
    ]
  };
  team.members.forEach(function(member){
    member.data = {
      calls: [],
      duration: 0,
      avgDuration: 0,
      interactivity: 0,
      avgInteractivity: 0,
      unitUsage: {},
      orgUsage: {},
      topics: {},
      accountTypes: {},
      opportunityTypes: {},
      owners: {},
      numberOfCalls: 0,
      stageAtCall: {},
      stageNow: {},
      stageNowClosed: 0,
      stageNowWon: 0,
      winRate: 0,
      amountAtCall: 0,
      amountNow: 0,
      closedValue: 0,
      wonValue: 0
    }
  });
};
function processData(){
  // Start by heading to Google Sheets and grabbing question requests
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '13q20Tw_8yrH0fDMnFZU-_5OoiJgIT8zW1-_IOA1IZxk',
    range: 'Questions!A2:I',
  }).then(function(response) {
    team.numberOfQuestionRequests = response.result.values.length;
    response.result.values.forEach(function(question){
      var userLookup = team.users.find(obj => {
        return obj.slackID == question[1]
      });
      if (userLookup) {
        team.questionOrgUsage[userLookup.org] = (team.questionOrgUsage[userLookup.org] || 1) + 1;
        team.questionUnitUsage[userLookup.unit] = (team.questionUnitUsage[userLookup.unit] || 1) + 1;
      } else {
        console.log('Could not map user: ', question[1]);
      }
      team.questionOwners[question[1]] = (team.questionOwners[question[1]] || 1) + 1;
      if (isNumber(parseFloat(Number(question[6].replace(/[^0-9.-]+/g,""))))) {
        team.questionValue += Math.abs(parseFloat(Number(question[6].replace(/[^0-9.-]+/g,""))));
      }
    });
  });

  var unitFilter = [];
  $(".unitFilter").each(function() {
    if (!document.getElementById(this.id).checked) {
      unitFilter.push(this.value) // create an array of units we DON'T want
    }
  });

  var orgFilter = [];
  $(".orgFilter").each(function() {
    if (!document.getElementById(this.id).checked) {
      orgFilter.push(this.value) // create an array of units we DON'T want
    }
  });

  var topicFilter = [];
  $(".topicFilter").each(function() {
    if (document.getElementById(this.id).checked) {
      topicFilter.push(this.value)
    }
  });

  var stageFilter = [];
  $(".stageFilter").each(function() {
    if (!document.getElementById(this.id).checked) {
      stageFilter.push(this.value) // create an array of units we DON'T want
    }
  });

  var typeFilter = [];
  $(".typeFilter").each(function() {
    if (!document.getElementById(this.id).checked) {
      typeFilter.push(this.value) // create an array of units we DON'T want
    }
  });

  jsonGongData.allCallsResponse.forEach(function(call){
    var analyzeThisRecord = true; // Assume we should evaluate each record than find a reason to disqualify that idea
    var userLookup = team.users.find(obj => {
      return obj.name == call.owner
    });
    $.each(unitFilter, function( index, value ) {
      if (userLookup && value == userLookup.unit) {
        analyzeThisRecord = false;
      } else if (!userLookup && value == "Undefined") {
        analyzeThisRecord = false;
      }
    });
    $.each(orgFilter, function( index, value ) {
      if (userLookup && value == userLookup.org) {
        analyzeThisRecord = false;
      } else if (!userLookup && value == "Undefined") {
        analyzeThisRecord = false;
      }
    });
    $.each(stageFilter, function( index, value ) {
      if (value == call.stageNow) {
        analyzeThisRecord = false;
      } else if (value == "null" && call.stageNow == null) {
        analyzeThisRecord = false;
      }
    });
    $.each(typeFilter, function( index, value ) {
      if (value == call.opportunityType) {
        analyzeThisRecord = false;
      } else if (value == "null" && call.opportunityType == null) {
        analyzeThisRecord = false;
      }
    });
    var topicMatch = false;
    $.each(topicFilter, function( index, value ) {
      if (!topicMatch){
        if (value == "Any Topic") {
          topicMatch = true;
        }
        call.topics.forEach(function(topic){
          if (topic.name == value) {
            topicMatch = true;
          }
        });
      }
    });

    if (analyzeThisRecord && topicMatch) {
      // GLOBAL ANALYSIS
      team.numberOfCalls++;
      team.duration += Math.abs(call.duration);
      team.interactivity += Math.abs(call.callInteractivity);
      team.amountAtCall += Math.abs(call.amountAtCall);
      team.amountNow += Math.abs(call.amountNow);
      team.stageAtCall[call.stageAtCall] = (team.stageAtCall[call.stageAtCall] || 1) + 1;
      team.stageNow[call.stageNow] = (team.stageNow[call.stageNow] || 1) + 1;
      team.accountTypes[call.accountType] = (team.accountTypes[call.accountType] || 1) + 1;
      team.opportunityTypes[call.opportunityType] = (team.opportunityTypes[call.opportunityType] || 1) + 1;
      call.topics.forEach(function(topic){
        team.topics[topic.name] = (team.topics[topic.name] || 1) + 1;
      });
      team.owners[call.owner] = (team.owners[call.owner] || 1) + 1;
      if (userLookup) {
        team.orgUsage[userLookup.org] = (team.orgUsage[userLookup.org] || 1) + 1;
        team.unitUsage[userLookup.unit] = (team.unitUsage[userLookup.unit] || 1) + 1;
      } else {
        console.log('Could not map user: ', call.owner);
      }
      if (call.stageNowClosed) {
        team.stageNowClosed++;
        team.closedValue += Math.abs(call.amountNow);
      }
      if (call.stageNowWon) {
        team.stageNowWon++;
        team.wonValue += Math.abs(call.amountNow);
      }

      // USER ANALYSIS
      team.members.forEach(function(member){
        if (call.companyParticipantNames.includes(member.name)) {
          member.data.duration += Math.abs(call.duration);
          member.data.interactivity += Math.abs(call.callInteractivity);
          member.data.calls.push(call);
          member.data.numberOfCalls++;
          member.data.amountAtCall += Math.abs(call.amountAtCall);
          member.data.amountNow += Math.abs(call.amountNow);
          member.data.stageAtCall[call.stageAtCall] = (member.data.stageAtCall[call.stageAtCall] || 1) + 1;
          member.data.stageNow[call.stageNow] = (member.data.stageNow[call.stageNow] || 1) + 1;
          member.data.accountTypes[call.accountType] = (member.data.accountTypes[call.accountType] || 1) + 1;
          member.data.opportunityTypes[call.opportunityType] = (member.data.opportunityTypes[call.opportunityType] || 1) + 1;
          call.topics.forEach(function(topic){
            member.data.topics[topic.name] = (member.data.topics[topic.name] || 1) + 1;
          });
          member.data.owners[call.owner] = (member.data.owners[call.owner] || 1) + 1;
          if (userLookup) {
            member.data.orgUsage[userLookup.org] = (member.data.orgUsage[userLookup.org] || 1) + 1;
            member.data.unitUsage[userLookup.unit] = (member.data.unitUsage[userLookup.unit] || 1) + 1;
          }
          if (call.stageNowClosed) {
            member.data.stageNowClosed++;
            member.data.closedValue += Math.abs(call.amountNow);
          }
          if (call.stageNowWon) {
            member.data.stageNowWon++;
            member.data.wonValue += Math.abs(call.amountNow);
          }
        }
      });
    }
  });

  // POST-CALL LOOP GLOBAL ANALYSIS
  team.avgDuration = team.duration / team.numberOfCalls;
  team.avgInteractivity = team.interactivity / team.numberOfCalls;
  team.winRate = team.stageNowWon / team.stageNowClosed;
  $('#teamCard').empty();
  $('#teamCard').append(`
    <div class='col-md-12 mb-12'>
      <h4 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Team summary</span> <span class='badge badge-secondary badge-pill'>Solutions Engineering</span> </h4>
      <ul class='list-group mb-3'>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>Number of calls</h6>
          </div>
          <span class='text-muted'>${addCommas(team.numberOfCalls)}</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>MRR influenced</h6>
            <small class='text-muted'>Total opportunity dollars touched</small>
          </div>
          <span class='text-muted'>$${addCommas(team.amountNow.toFixed(2))}</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>MRR closed</h6>
            <small class='text-muted'>${addCommas(team.stageNowClosed)} deals</small>
          </div>
          <span class='text-muted'>$${addCommas(team.closedValue.toFixed(2))}</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>MRR closed-won</h6>
            <small class='text-muted'>${addCommas(team.stageNowWon)} deals</small>
          </div>
          <span class='text-muted'>$${addCommas(team.wonValue.toFixed(2))}</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>Win-rate</h6>
            <small class='text-muted'>Compared to blended sales-org win-rate of 29.93%; <strong>incremental value of ${((team.winRate * 100) - 29.93).toFixed(2)}%</strong></small>
          </div>
          <span class='text-muted'>${(team.winRate * 100).toFixed(2)}%</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>Incremental MRR closed-won</h6>
          </div>
          <span class='text-muted'>$${addCommas((team.wonValue - ((team.wonValue / team.winRate)*.2993)).toFixed(2))}</span>
        </li>
        <li class='list-group-item d-flex justify-content-between bg-light'>
          <div class="text-success">
            <h6 class='my-0'>Incremental ARR closed-won</h6>
          </div>
          <span class='text-success'>$${addCommas(((team.wonValue - ((team.wonValue / team.winRate)*.2993))*12).toFixed(2))}</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>Average call duration</h6>
          </div>
          <span class='text-muted'>${addCommas((team.avgDuration/60).toFixed(0))} minutes</span>
        </li>
        <li class='list-group-item d-flex justify-content-between lh-condensed'>
          <div>
            <h6 class='my-0'>Average call interactivity</h6>
          </div>
          <span class='text-muted'>${team.avgInteractivity.toFixed(2)}</span>
        </li>
      </ul>
      <a class='text-muted' style='cursor:pointer;' onclick='new CSVExport(jsonGongData.allCallsResponse);'>🗂 Download call history &#187;</a>
    </div>
  `);

  labels = [];
  data = [];
  for (const [key, value] of Object.entries(team.accountTypes)) {
    labels.push(key);
    data.push(value);
  }
  var ctx = document.getElementById('accountTypeChart').getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
        label: '# of accounts',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
        borderWidth: 1
    }]
  }
  });

  labels = [];
  data = [];
  for (const [key, value] of Object.entries(team.orgUsage)) {
    labels.push(key);
    data.push(value);
  }
  var ctx = document.getElementById('orgUsageChart').getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
        label: '# of accounts',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
        borderWidth: 1
    }]
  }
  });

  labels = [];
  data = [];
  for (const [key, value] of Object.entries(team.stageAtCall)) {
    labels.push(key);
    data.push(value);
  }
  var ctx = document.getElementById('stageUsageChart').getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: labels,
    datasets: [{
        label: '# of accounts',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
        borderWidth: 1
    }]
  }
  });

  labels = [];
  data = [];
  for (const [key, value] of Object.entries(team.topics)) {
    labels.push(key);
    data.push(value);
  }
  var ctx = document.getElementById('topicUsageChart').getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: labels,
    datasets: [{
        label: '# of calls',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
        borderWidth: 1
    }]
  }
  });

  labels = [];
  data = [];
  for (const [key, value] of Object.entries(team.unitUsage)) {
    labels.push(key);
    data.push(value);
  }
  var ctx = document.getElementById('unitUsageChart').getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
        label: '# of accounts',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
        borderWidth: 1
    }]
  }
  });

  labels = [];
  data = [];
  for (const [key, value] of Object.entries(team.opportunityTypes)) {
    labels.push(key);
    data.push(value);
  }
  var ctx = document.getElementById('opportunityTypeChart').getContext('2d');
  var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
        label: '# of accounts',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
        borderWidth: 1
    }]
  }
  });

  // POST-CALL LOOP USER ANALYSIS
  $('#memberCards').empty();
  team.members.forEach(function(member, i){
    member.data.avgDuration = member.data.duration / member.data.numberOfCalls;
    member.data.avgInteractivity = member.data.interactivity / member.data.numberOfCalls;
    member.data.winRate = member.data.stageNowWon / member.data.stageNowClosed;
    $('#memberCards').append(`
      <div class='col-md-3 mb-3'>
         <h4 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>${member.name}</span> <span class='badge badge-secondary badge-pill'>${member.title}</span> </h4>
         <ul class='list-group mb-3'>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
               <div>
                  <h6 class='my-0'>Number of calls</h6>
               </div>
               <span class='text-muted'>${addCommas(member.data.numberOfCalls)}</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
               <div>
                  <h6 class='my-0'>MRR influenced</h6>
                  <small class='text-muted'>Total opportunity dollars touched</small>
               </div>
               <span class='text-muted'>$${addCommas(member.data.amountNow.toFixed(2))}</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
               <div>
                  <h6 class='my-0'>MRR closed</h6>
                  <small class='text-muted'>${addCommas(member.data.stageNowClosed)} deals</small>
               </div>
               <span class='text-muted'>$${addCommas(member.data.closedValue.toFixed(2))}</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
               <div>
                  <h6 class='my-0'>MRR closed-won</h6>
                  <small class='text-muted'>${addCommas(member.data.stageNowWon)} deals</small>
               </div>
               <span class='text-muted'>$${addCommas(member.data.wonValue.toFixed(2))}</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
              <div>
                <h6 class='my-0'>Win-rate</h6>
                <small class='text-muted'>Compared to blended sales-org win-rate of 29.93%; <strong>incremental value of ${((member.data.winRate * 100) - 29.93).toFixed(2)}%</strong></small>
              </div>
              <span class='text-muted'>${(member.data.winRate * 100).toFixed(2)}%</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
              <div>
                <h6 class='my-0'>Incremental MRR closed-won</h6>
              </div>
              <span class='text-muted'>$${addCommas((member.data.wonValue - ((member.data.wonValue / member.data.winRate)*.2993)).toFixed(2))}</span>
            </li>
            <li class='list-group-item d-flex justify-content-between bg-light'>
              <div class="text-success">
                <h6 class='my-0'>Incremental ARR closed-won</h6>
              </div>
              <span class='text-success'>$${addCommas(((member.data.wonValue - ((member.data.wonValue / member.data.winRate)*.2993))*12).toFixed(2))}</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
               <div>
                  <h6 class='my-0'>Average call duration</h6>
               </div>
               <span class='text-muted'>${addCommas((member.data.avgDuration/60).toFixed(0))} minutes</span>
            </li>
            <li class='list-group-item d-flex justify-content-between lh-condensed'>
               <div>
                  <h6 class='my-0'>Average call interactivity</h6>
               </div>
               <span class='text-muted'>${member.data.avgInteractivity.toFixed(2)}</span>
            </li>
         </ul>
         <div>
            <a class='text-muted' style='cursor:pointer;' onclick='new CSVExport(team.members[${i}].data.calls);'>🗂 Download call history &#187;</a><br><br><br>
            <h5 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Calls by account type</span><span class='badge badge-secondary badge-pill'>${member.name}</span></h5>
            <canvas id='accountTypeChart${i}' height='300'></canvas>
            <br><br>
            <h5 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Usage by org</span><span class='badge badge-secondary badge-pill'>${member.name}</span></h5>
            <canvas id='orgUsageChart${i}' height='300'></canvas>
            <br><br>
            <h5 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Calls by opportunity stage</span><span class='badge badge-secondary badge-pill'>${member.name}</span></h5>
            <canvas id='stageUsageChart${i}' height='300'></canvas>
            <br><br>
            <h5 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Usage by topic</span><span class='badge badge-secondary badge-pill'>${member.name}</span></h5>
            <canvas id='topicUsageChart${i}' height='300'></canvas>
            <br><br>
            <h5 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Usage by unit</span><span class='badge badge-secondary badge-pill'>${member.name}</span></h5>
            <canvas id='unitUsageChart${i}' height='300'></canvas>
            <br><br>
            <h5 class='d-flex justify-content-between align-items-center mb-3'> <span class='text-muted'>Calls by opportunity type</span><span class='badge badge-secondary badge-pill'>${member.name}</span></h5>
            <canvas id='opportunityTypeChart${i}' height='300'></canvas>
         </div>
      </div>
    `);

    labels = [];
    data = [];
    for (const [key, value] of Object.entries(member.data.accountTypes)) {
      labels.push(key);
      data.push(value);
    }
    var ctx = document.getElementById(`accountTypeChart${i}`).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
          label: '# of accounts',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
          borderWidth: 1
      }]
    }
    });

    labels = [];
    data = [];
    for (const [key, value] of Object.entries(member.data.orgUsage)) {
      labels.push(key);
      data.push(value);
    }
    var ctx = document.getElementById(`orgUsageChart${i}`).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
          label: '# of accounts',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
          borderWidth: 1
      }]
    }
    });


    labels = [];
    data = [];
    for (const [key, value] of Object.entries(member.data.stageAtCall)) {
      labels.push(key);
      data.push(value);
    }
    var ctx = document.getElementById(`stageUsageChart${i}`).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: labels,
      datasets: [{
          label: '# of accounts',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
          borderWidth: 1
      }]
    }
    });

    labels = [];
    data = [];
    for (const [key, value] of Object.entries(member.data.topics)) {
      labels.push(key);
      data.push(value);
    }
    var ctx = document.getElementById(`topicUsageChart${i}`).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
          label: '# of calls',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
          borderWidth: 1
      }]
    }
    });

    labels = [];
    data = [];
    for (const [key, value] of Object.entries(member.data.unitUsage)) {
      labels.push(key);
      data.push(value);
    }
    var ctx = document.getElementById(`unitUsageChart${i}`).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
          label: '# of accounts',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
          borderWidth: 1
      }]
    }
    });

    labels = [];
    data = [];
    for (const [key, value] of Object.entries(member.data.opportunityTypes)) {
      labels.push(key);
      data.push(value);
    }
    var ctx = document.getElementById(`opportunityTypeChart${i}`).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
          label: '# of accounts',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',],
          borderWidth: 1
      }]
    }
    });
  });
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#results").offset().top
  }, 2000);
};
function addCommas(nStr){
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
function isNumber (value) {
  if (typeof value !== 'number') {
    return false
  }
  if (value !== Number(value)) {
    return false
  }
  if (Number.isFinite(value) === false) {
    return false
  }
  return true
}
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
  }, function(error) {
    // Error goes here
  });
}
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    dataForm.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    dataForm.style.display = 'none';
  }
}
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
gapi.load('client:auth2', initClient);
