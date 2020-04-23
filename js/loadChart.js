// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartFilms);

// Draw the chart and set the chart values
function drawChartFilms() {
  var data1 = [['Task', 'Hours per Day'], ['Drama', 0], ['Romance', 0], ['Sci-Fi', 0], ['Adventure', 0],
  ['Crime', 0], ['Mystery', 0], ['Music', 0], ['Family', 0], ['Animation', 0],
  ['Horror', 0], ['Western', 0], ['Comedy', 0], ['Thriller', 0], ['Biography', 0],
  ['Fantasy', 0], ['History', 0], ['Action', 0], ['War', 0], ['Sport', 0], ['Documentary', 0],
  ['Musical', 0]]

  $.getJSON( 'https://raw.githubusercontent.com/ProjectFantasticFive/Tubes_Anotasi_Data/master/%5BDONT%20CHANGE%20THIS%20FILE%5D%20Labeled%20IMDb%20list%20of%20films.json', function(data_films) {
    $.each( data_films, function(key, value) {
      $.each( value.data.genre, function(key, value1){
        var j = 0;
        while (value1.split(" ").join("") != data1[j][0]){
          j += 1;
        }
        data1[j][1] += 1;
      });
    });
    var data = google.visualization.arrayToDataTable(data1);

    // Optional; add a title and set the width and height of the chart
    var options = {'width':500, 'height':400, 'is3D':true, vAxis: {minValue: 0}};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('filmsChart'));
    chart.draw(data, options);
  });

  console.log(data1);


}
