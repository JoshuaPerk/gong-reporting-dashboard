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
$(".reveal").hide();
$('#inputGongData').focus();

var jsonGongData;
let labels = [];
let data = [];

let team = {
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
    {"name":"William Kiley","unit":"SMB","org":"Sales"},
    {"name":"Michael Rogewitz","unit":"SMB","org":"Sales"},
    {"name":"Maddie Gauthier","unit":"SMB","org":"Sales"},
    {"name":"Jeff Sullivan","unit":"INT","org":"Sales"},
    {"name":"Mari O'Leary","unit":"SME","org":"Sales"},
    {"name":"Max Sandoval","unit":"SME","org":"AM"},
    {"name":"Collin O'Brien","unit":"SMB","org":"AM"},
    {"name":"Madelyn Ligtenberg","unit":"SMB","org":"Sales"},
    {"name":"Nick Brown","unit":"SME","org":"AM"},
    {"name":"Jeff Andrew Mabute-Louie","unit":"SME","org":"Sales"},
    {"name":"Stephanie Durocher","unit":"SMB","org":"Sales"},
    {"name":"Ciaran Nugent","unit":"SMB","org":"Sales"},
    {"name":"Michael Pantano","unit":"SMB","org":"Sales"},
    {"name":"Courtney Thompson","unit":"SMB","org":"Sales"},
    {"name":"Steve Palombo","unit":"SME","org":"Sales"},
    {"name":"Hambisa Goso","unit":"SME","org":"Sales"},
    {"name":"Ryan Heavey","unit":"SME","org":"Sales"},
    {"name":"Michael Grundig","unit":"SMB","org":"Sales"},
    {"name":"Dan Salvetti","unit":"SME","org":"Sales"},
    {"name":"Nick Christolos","unit":"SME","org":"Sales"},
    {"name":"Kerry Harris","unit":"SME","org":"Sales"},
    {"name":"Bryan Blaha","unit":"SME","org":"Sales"},
    {"name":"Sean Kenny","unit":"SME","org":"AM"},
    {"name":"Aaron Roberts","unit":"INT","org":"Sales"},
    {"name":"Ally Bresnahan","unit":"SME","org":"Sales"},
    {"name":"Jason Mercer","unit":"SMB","org":"Sales"},
    {"name":"Lindsey Riordan","unit":"SMB","org":"Sales"},
    {"name":"Sawyer Dew","unit":"SMB","org":"Sales"},
    {"name":"Tucker Cohen","unit":"SME","org":"Partner"},
    {"name":"Claire Kennedy","unit":"SMB","org":"Sales"},
    {"name":"John Murphy","unit":"SMB","org":"Sales"},
    {"name":"David Johnson","unit":"SMB","org":"Sales"},
    {"name":"Erin Silva","unit":"INT","org":"CSM"},
    {"name":"Christina Nalband","unit":"SME","org":"Sales"},
    {"name":"Katie Ferris","unit":"Siftrock","org":"Sales"},
    {"name":"Alex Hanbury","unit":"ENT","org":"Sales"},
    {"name":"Ryan Topal","unit":"SMB","org":"Sales"},
    {"name":"Derek Kelliher","unit":"ENT","org":"Sales"},
    {"name":"Robert Boerrigter","unit":"SMB","org":"Sales"},
    {"name":"Eve Pham","unit":"SMB","org":"Sales"},
    {"name":"Tyler Guzzi","unit":"SMB","org":"Sales"},
    {"name":"Reed Wazorko","unit":"SME","org":"AM"},
    {"name":"Kelvin Sims","unit":"SMB","org":"Sales"},
    {"name":"James Pidgeon","unit":"SMB","org":"Sales"},
    {"name":"Joe Dell'Erario","unit":"SMB","org":"Sales"},
    {"name":"Evan Cassidy","unit":"ENT","org":"Sales"},
    {"name":"Vittorio Monteverdi","unit":"SMB","org":"Sales"},
    {"name":"Tanner Fogarty","unit":"ENT","org":"Sales"},
    {"name":"Brendan Collins","unit":"SME","org":"AM"},
    {"name":"Katy Zingale","unit":"SME","org":"AM"},
    {"name":"Molly Dexter","unit":"SME","org":"Sales"},
    {"name":"Jordan Pal","unit":"SMB","org":"Sales"},
    {"name":"Brad Forgetta","unit":"ENT","org":"Sales"},
    {"name":"Bennett Boucher","unit":"SME","org":"Sales"},
    {"name":"Trent Mosley","unit":"SME","org":"Partner"},
    {"name":"Miles Kane","unit":"SMB","org":"Sales"},
    {"name":"Allen Knox","unit":"ENT","org":"Sales"},
    {"name":"Kelly Barnett","unit":"SME","org":"Sales"},
    {"name":"Adam Cox","unit":"SME","org":"Sales"},
    {"name":"Lincoln Brown","unit":"SME","org":"Sales"},
    {"name":"Adrian Nardella","unit":"SMB","org":"CSM"},
    {"name":"Lilly Steeves","unit":"SME","org":"Sales"},
    {"name":"Paul Axelrod","unit":"SMB","org":"Sales"},
    {"name":"Amanda Chiang","unit":"ENT","org":"Sales"},
    {"name":"Sara Miller","unit":"SME","org":"Sales"},
    {"name":"Shannon Donovan","unit":"SME","org":"Sales"},
    {"name":"Elliott Thomas","unit":"SMB","org":"CSM"},
    {"name":"Blake Kelly","unit":"SME","org":"Sales"},
    {"name":"Jason Phillips","unit":"SME","org":"AM"},
    {"name":"Michele Albanese","unit":"Siftrock","org":"CSM"},
    {"name":"Adrianne Ober","unit":"SME","org":"CSM"},
    {"name":"Alex Lemieux","unit":"ENT","org":"CSM"},
    {"name":"Amanda Arthur","unit":"ENT","org":"AM"},
    {"name":"Bailey Best","unit":"SME","org":"CSM"},
    {"name":"Caitlin Sullivan","unit":"ENT","org":"CSM"},
    {"name":"Christine Hayden","unit":"ENT","org":"CSM"},
    {"name":"Daniel Salvetti","unit":"SME","org":"Sales"},
    {"name":"Elizabeth Glavan","unit":"SME","org":"CSM"},
    {"name":"Erin Washburn","unit":"ENT","org":"CSM"},
    {"name":"Jaclyn Van","unit":"SMB","org":"CSM"},
    {"name":"Jacqueline McLaughlin","unit":"SMB","org":"Sales"},
    {"name":"Jason Richman","unit":"SME","org":"Sales"},
    {"name":"Jon Ravesi","unit":"SME","org":"Partner"},
    {"name":"Joshua Perk","unit":"ENT","org":"Sales"},
    {"name":"Ken Shin","unit":"ENT","org":"AM"},
    {"name":"Kristine O'Brien","unit":"SME","org":"CSM"},
    {"name":"Lottie Hedden","unit":"ENT","org":"CSM"},
    {"name":"Mary Mitchell","unit":"ENT","org":"Sales"},
    {"name":"Mike Gotera","unit":"ENT","org":"CSM"},
    {"name":"Molly Head","unit":"ENT","org":"CSM"},
    {"name":"Nate Hoffelmeyer","unit":"ENT","org":"CSM"},
    {"name":"Nathan Chein","unit":"ENT","org":"CSM"},
    {"name":"Neil Fiedler","unit":"SME","org":"AM"},
    {"name":"Robert Perez","unit":"SME","org":"Sales"},
    {"name":"Sam Gifford","unit":"Siftrock","org":"Sales"},
    {"name":"Seamus McGrath","unit":"SME","org":"Partner"},
    {"name":"Sebastean Gonzalez-Johnson","unit":"SMB","org":"Sales"},
    {"name":"Sophie Teraoka","unit":"ENT","org":"CSM"},
    {"name":"Taylor Miller","unit":"ENT","org":"CSM"},
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
$('#processData').click(function(){
  try {
    // navigator.clipboard.readText().then(text => alert(text));
    jsonGongData = JSON.parse($('#inputGongData').val());
    $('.dataForm').hide();
    $('.results').show();
    console.log('Success: inputGongData parsed to JSON.');
  } catch (e) {
    console.log('The data pasted in inputGongData in not valid JSON.');
    return;
  }

  try {
    team.numberOfCalls = jsonGongData.allCallsResponse.length;
    console.log('Total number of calls: ', team.numberOfCalls);
  } catch (e) {
    console.log('Unable to count the total number of calls.');
    return;
  }

  jsonGongData.allCallsResponse.forEach(function(call){

    // GLOBAL ANALYSIS
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
    var userLookup = team.users.find(obj => {
      return obj.name == call.owner
    });
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
  });

  // POST-CALL LOOP GLOBAL ANALYSIS
  team.avgDuration = team.duration / team.numberOfCalls;
  team.avgInteractivity = team.interactivity / team.numberOfCalls;
  team.winRate = team.stageNowWon / team.stageNowClosed;
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
});
