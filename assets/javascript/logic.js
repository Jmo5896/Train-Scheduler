  $(document).ready(function() {
  // Make sure that your app suits this basic spec:
    // When adding trains, administrators should be able to submit the following:
    // Train Name
    // Destination 
    // First Train Time -- in military time
    // Frequency -- in minutes
    // Code this app to calculate when the next train will arrive; this should be relative to the current time.
    // Users from many different machines must be able to view same train times.
    // Styling and theme are completely up to you. Get Creative!
    function addTrainRow(train) {
    
      var newTR = $('<tr>');
      newTR.append('<td>' + train.trainName + '</td>' + '<td>' + train.destination + '</td>' + '<td>' + train.frequency + '</td>' + '<td>' + train.nextArrival + '</td>' + '<td>' + train.minutesAway + '</td>');
  
      $('#trains-go-here').append(newTR);
      
    }

    function calculateNextArrival(freq, firstTrain) {
      var firstTimeConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years');
      var currentTime = moment();
      var diffTime = moment().diff(firstTimeConverted, 'minutes');
      var tRemainder = diffTime % freq;
      var tMinutesTillTrain = freq - tRemainder;
      console.log(firstTimeConverted);
      console.log(currentTime);
      console.log(diffTime);
      console.log(tRemainder);
      console.log(tMinutesTillTrain);
      
    }

    function calculateMinutesAway(frequency) {

    }

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB8dneo-zAn4Wy7z_M4mczkmQgG5_ZiGDI",
    authDomain: "train-schedules-49f5c.firebaseapp.com",
    databaseURL: "https://train-schedules-49f5c.firebaseio.com",
    projectId: "train-schedules-49f5c",
    storageBucket: "",
    messagingSenderId: "636812806676"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $('form').on('submit', function () {
    
    // var nextArr = calculateNextArrival($('#input-frequency').val().trim(), $('#input-first-train-time').val().trim());

    var train = {
      
      destination: $('#input-destination').val().trim(),
      firstTrainTime: $('#input-first-train-time').val().trim(),
      frequency: $('#input-frequency').val().trim(),
      nextArrival: '',
      minutesAway: 'test'
      
    };

    database.ref().child($('#input-trainName').val().trim()).set(train);
    console.log(train);
    alert('train has been added');
    
    $('#input-trainName').val('');
    $('#input-destination').val('');
    $('#input-first-train-time').val('');
    $('#input-frequency').val('');

  });

  database.ref().on('value', function(snapshot, preChildKey) {
   
    for (let trainName in snapshot.val()) {
      let train = {
        trainName: trainName,
        destination: snapshot.val()[trainName].destination,
        firstTrainTime: snapshot.val()[trainName].firstTrainTime,
        frequency: snapshot.val()[trainName].frequency,
        nextArrival: snapshot.val()[trainName].nextArrival,
        minutesAway: snapshot.val()[trainName].minutesAway
      };
      
      addTrainRow(train); 
    }

   calculateNextArrival(3, moment());
  });


  //NO CODE BELOW THIS LINE
});
