var firebase = require('firebase');
var five = require("johnny-five");

var board = new five.Board();
var led;

firebase.initializeApp({
  databaseURL: 'https://iotproject-245bf.firebaseio.com/',
  serviceAccount: 'iotProject-fb606820497a.json'
});

var ref = firebase.database().ref('iot-arduino-basic');
var msgsReference = ref.child('messages');

board.on("ready", function() {
  led = new five.Led(10);
  console.log('Board is Ready  !!!!')

ref.child('messages').on("child_added", function(snapshot) {
  var message = snapshot.val();  
  if (message.state == 'on')
    led.on();
  else if (message.state == 'blink')
    led.blink(300);
  else if (message.state == 'off')  
    led.off();
  else if (message.state == 'fadein')
    led.fadeIn();
  else if (message.state == 'fadeout')
    led.fadeOut();
});});