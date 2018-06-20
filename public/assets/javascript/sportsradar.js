var queryURL = 'https://api.sportradar.us/soccer-t3/intl/en/schedules/2018-06-01/results.json?api_key=vcwrmkujsgx84c9sae8zc5vn';

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      data.forEach(here => {
        console.log("scheduled date",data[0].sport_event.scheduled);
        console.log("season name",data[0].season.name);
        console.log("start_date",data[0].season.start_date);
        console.log("end_date",data[0].season.end_date);
      });
    } else {
      console.log('error');
    }
  });

request.send();