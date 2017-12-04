/* Globals */

// This string will basically serve as a hash key for finding events
var accessString;
var selectedDay = 11;
var selectedFam = 0;

function initArrs(){
  sessionStorage.setItem('eventIndex', 0);
  sessionStorage.setItem('msgIndex', 0);
}

function saveEvent(){
  // Figure which event you're on if on a single day
  var eventNum = sessionStorage.getItem('eventIndex');
  var famCode = findFamCode(sessionStorage.getItem('selectedFam'));
  console.log(famCode);
  /* Using JSON.stringify */
  var eventObj =
  {
    name: document.getElementById('eventNameInput').value,
    date: document.getElementById('dateInput').value,
    descrip: document.getElementById('descripInput').value,
    member: famCode
  };

  var eventStr = 'event' + eventNum;
  sessionStorage.setItem(eventStr, JSON.stringify(eventObj));

  // Increment event number
  eventNum = parseInt(eventNum) + 1;
  sessionStorage.setItem('eventIndex', eventNum);

  eventAlert();

  // Reset form values
  resetEvent();
}

function eventAlert(){

  var name = sessionStorage.getItem('selectedFam');
  if (name == 0){
    name = 'you';
  }
  if (name == 1){
    name = 'Leila';
  }
  if (name == 2){
    name = 'Meg';
  }
  if (name == 3){
    name = 'Rachel';
  }
  if (name == 4){
    name = 'Ryan';
  }
  console.log(name);

  // For Alerts
  var str = ' <div class="alert alert-success alert-dismissable fade in"> \
              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> \
              <strong> Event created for '+ name +'! </strong> \
              </div> ';


  // Edge case: If no message is written
  if ( document.getElementById('eventNameInput').value == "" || document.getElementById('dateInput').value == "" || document.getElementById('descripInput').value == ""){
    str = '<div class="alert alert-danger alert-dismissable fade in"> \
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> \
                <strong>Fill out all of the event info!</strong> \
           </div>';
  }

  document.getElementById('eventAlert').innerHTML = str;

}

// Takes var day, aka desired date to be displayed
function displayEvent( day, memb ){
  var desiredDate = "2017-12-" + day;
  var eventNum = parseInt(sessionStorage.getItem('eventIndex'));
  for (i=0;i<eventNum;i++){
    var eventStr = 'event' + i;
    var eventObj = JSON.parse(sessionStorage.getItem(eventStr));
    if (eventObj.date == desiredDate && eventObj.member == memb){
      var newEvent = '<div class="panel panel-primary"> \
                				<div class="panel-heading">' + eventObj.name + '</div> \
                				<div class="panel-body"> \
                          <p>' + eventObj.date + '</p> \
                          <p>' + eventObj.descrip + '</p> \
                				</div> \
                			</div>';
      document.getElementById('dayContent1').innerHTML += (newEvent);
    }
  }
}

function refreshCalendar(memb){
  var eventNum = parseInt(sessionStorage.getItem('eventIndex'));
  for(i=0;i<eventNum;i++){
    var dayStr = "day" + parseInt(selectedDay);
  }
  denoteEvents(memb);
}

// Shows which days have events stored
function denoteEvents(memb){
  var eventNum = parseInt(sessionStorage.getItem('eventIndex'));
  for(i=0;i<eventNum;i++){
    var eventObj = JSON.parse(sessionStorage.getItem('event'+i));
    var date = eventObj.date;
    var day = date.slice(date.length-2);
    var dayStr = "day" + parseInt(day);
    console.log(date);
    var eventClass = document.getElementById(dayStr).className;
    if (eventObj.member == memb){
      document.getElementById(dayStr).className = "filled";
    }
    if (eventClass == "active"){
      document.getElementById(dayStr).className = "active";
    }
  }
}

function selectDay( day, memb ){
  clearEventDisplay();
  // Previously selected day
  var dayStr1 = "day" + parseInt(selectedDay);
  // New day
  var dayStr2 = "day" + parseInt(day);
  console.log(dayStr2);

  // Store old class name to check if it was a "filled" event
  var eventClass = document.getElementById(dayStr2).className;
  document.getElementById(dayStr1).className -= "active";
  document.getElementById(dayStr2).className = "active";

  selectedDay = day;
  displayEvent(selectedDay, memb);
  denoteEvents(memb);
}

function clearEventDisplay(){
  document.getElementById('dayContent1').innerHTML = "";
}

function resetEvent(){
  // Reset form values
  document.getElementById('eventNameInput').value = "";
  document.getElementById('dateInput').value = "";
  document.getElementById('descripInput').value = "";
}

function msgRecipient(){
  var list = document.getElementsByName('rl')[0];

  return (list.options[list.selectedIndex].value);

}

function clearMsg(){
  document.getElementById('msgInput').value = "";
}



function famSelect(index){
  sessionStorage.setItem('selectedFam',index);
}

function setRecip(){
  var list = document.getElementsByName('rl')[0];
  list.selectedIndex = sessionStorage.getItem('selectedFam');
}

function findFamCode(who){
  var name = who;
  if (name == 0){
    name = '';
  }
  if (name == 1){
    name = 'l';
  }
  if (name == 2){
    name = 'm';
  }
  if (name == 3){
    name = 'ra';
  }
  if (name == 4){
    name = 'r';
  }

  return name;
}

function loadCal(who){
  var famcode = findFamCode(who);
  for (i=2;i<=31;i++){
    var str = "<li onclick='selectDay('0" + i + "','" + famcode + "')'> <span id='day" + i + "'>" + i + "</span></li>";
    document.getElementById('cul').innerHTML += str;
  }
}

function clearMsgDisplay(){
  document.getElementById('textBubble').innerHTML = "";
}

// Takes var day, aka desired date to be displayed
function displayMsg(){
  clearMsgDisplay();

  var memb = document.getElementById('recipList').selectedIndex;
  if (memb != sessionStorage.getItem('selectedFam')){
    clearMsgDisplay();
  }
  var msgNum = parseInt(sessionStorage.getItem('msgIndex'));
  var bigSpace = '<p>_</p><p>_</p><p>_</p><p>_</p><p>_</p><p>_</p><p>_</p>'
  if (memb>0){
    for (i=0;i<msgNum;i++){

      var msgStr = 'msg' + i;
      var msgObj = JSON.parse(sessionStorage.getItem(msgStr));

      if (msgObj.member == memb){

        var newMsg = '<div class = "panel panel-primary"> <div class="panel-body"> \
                  <p>' + msgObj.msg + '</p> \
                 </div></div>';

        document.getElementById('textBubble').innerHTML =  document.getElementById('textBubble').innerHTML + 'Me' + (newMsg);
      }
    }
    document.getElementById('textBubble').innerHTML = document.getElementById('textBubble').innerHTML + bigSpace;
  }
}

// Sends message into session storage
function sendMsg(){

  var famNum = document.getElementById('recipList').selectedIndex;
  sessionStorage.setItem('selectedFam',famNum);
  // Edge case: If no recip is selected
  if (famNum == 0){
    var str = '<div class="alert alert-danger alert-dismissable fade in"> \
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> \
                <strong>Choose a recipient!</strong> \
           </div>';
    document.getElementById('msgAlert').innerHTML = str;
    return;
  }

  var msgObj =
  {
    msg: document.getElementById('msgInput').value,
    member: famNum
  };

  var msgStr = 'msg' + sessionStorage.getItem('msgIndex');
  sessionStorage.setItem(msgStr, JSON.stringify(msgObj));

  var str = ' <div class="alert alert-success alert-dismissable fade in"> \
              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> \
              <strong>Message sent to '+ msgRecipient() +'!</strong> \
              </div> ';

  // Edge case: If no message is written
  if ( document.getElementById('msgInput').value == "" ){
    str = '<div class="alert alert-danger alert-dismissable fade in"> \
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> \
                <strong>Write your message first!</strong> \
           </div>';
    document.getElementById('msgAlert').innerHTML = str;
    return;
  }

  document.getElementById('msgAlert').innerHTML = str;
  var newMsgIndex = parseInt(sessionStorage.getItem('msgIndex')) + 1;
  sessionStorage.setItem('msgIndex', newMsgIndex);

  document.getElementById('msgInput').value = "";
  displayMsg();
}

function checkLogin(){
  var input1 = document.getElementById('loginInput').value;
  console.log(1);
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function calendarDrop() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function displayTest(){
  console.log(document.getElementById('recipList').selectedIndex);
}

function fillActivities(){
  var eventNum = parseInt(sessionStorage.getItem('eventIndex'));
  for (i=0;i<eventNum;i++){
    var eventStr = 'event' + i;
    var eventObj = JSON.parse(sessionStorage.getItem(eventStr));
    var fam = eventObj.member;
    var titleStr;
    if (fam == ''){
      titleStr = "Coming up for me:";
    }
    if (fam == 'l'){
      titleStr = "Added for Leila:";
    }
    if (fam == 'r'){
      titleStr = "Added for Ryan:";
    }
    if (fam == 'ra'){
      titleStr = "Added for Rachel:";
    }
    if (fam == 'm'){
      titleStr = "Added for Meg:";
    }
    var newEvent = '<div class="panel panel-primary"> \
                      <div class="panel-heading">' + titleStr + '</div> \
                      <div class="panel-body"> \
                        <p>' + eventObj.name + '</p> \
                        <p>' + eventObj.date + '</p> \
                      </div> \
                    </div>';
    document.getElementById('activityBlurb').innerHTML = (newEvent) + document.getElementById('activityBlurb').innerHTML;

  }
  if (eventNum == 0){
    document.getElementById('activityBlurb').innerHTML = "<p> No recent events... </p>";
  }
}

/*
function createShape(){
  var svg = createShape.select("#drawArea")
  .append("svg")
  .attr("width", 700)
  .attr("height", 500);

  var g1 = svg.append("g")
.attr("transform", "translate(" + 150 + "," + 100 + ")")
  .attr("class", "first")
  .call(drag)
  .append("circle").attr({
    r: 20,
  })
  .style("fill", "#F00")

}
*/

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function trackEvt1(){
  console.log("calendar1 button clicked");
  // tracker code here, refer to slide #26
  tracker = ga.getAll()[0];
  tracker.send('event','cal 1 button','clicked');
}

function trackEvt2(){
  console.log("calendar2 button clicked");
  // tracker code here, refer to slide #26
  tracker = ga.getAll()[0];
  tracker.send('event','cal 2 button','clicked');
}
