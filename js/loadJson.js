function hiddenNav() {
  document.getElementById("navbar1").style.visibility = "hidden";
}

function showNav() {
  document.getElementById("navbar1").style.visibility = "inherit";
}
function datafilms_01(value) {
  var label = [];
    var object = value.completions[0].result;
    object.forEach((item, i) => {
      var x = " "+item.value.rectanglelabels[0].charAt(0).toUpperCase()+item.value.rectanglelabels[0].slice(1);
      if (label.includes(x)) {
      }else{
        label.push(x);
      }
    });
  return '<div class="filmrec">'
                    +'<img src="'+value.data.image+'.jpg">'
                      +'<a class="film_id" onclick="hiddenNav()" href="#'+value.data.judul.split(" ").join("")+'">'+value.data.judul+'</a>'
                      +'<a class="overlay" id="'+value.data.judul.split(" ").join("")+'"></a>'
                      +'<div class="popup">'
                          +'<h2 style="word-break: break-all;overflow: hidden;text-overflow: ellipsis;">'
                          +value.data.judul+' '
                          +'</h2>'
                          +'<div style="height: inherit; display: inline-flex;"><div style="margin: 7px;width: initial;display: inline-block;"><img src="'
                          +value.data.image+
                          '" style="height: auto;min-height: 20.9px;max-width: 140px;width: auto;"></div>'
                          +'<div style="overflow-y: scroll;margin: 10px;display: inline-block;"><p style="word-break: break-word;overflow: hidden;">'
                          +'<strong>Release Year: </strong>'
                          +value.data.tahun
                          +'<br>'
                          +'<strong>Genre: </strong>'
                          +value.data.genre
                          +'<br>'
                          +'<strong>Synopsis: </strong>'
                          +value.data.sinopsis
                          +'<br>'
                          +'<strong>Label:</strong>'
                          +label
                          +'</p></div></div>'
                          +'<a class="close" onclick="showNav()" href="#close"></a>'
                      +'</div>'
                +'</div>';
}


function allfilms(){
  $.getJSON( 'https://raw.githubusercontent.com/ProjectFantasticFive/Tubes_Anotasi_Data/master/%5BDONT%20CHANGE%20THIS%20FILE%5D%20Labeled%20IMDb%20list%20of%20films.json', function(data_films) {
    var datafilms = '';
    $.each( data_films, function(index, value) {
      datafilms += datafilms_01(value);
    });
    $('#list_of_films2').append(datafilms);
  });
}

function recfilm(value2){
    var datafilms = '';
    $.each( value2, function(index, value) {
      if (index > 4) {
        return false;
      }
      datafilms += datafilms_01(value);
    });
    $('#list_of_films1').append(datafilms);
}

function search_films(value2) {
    $('#fh5co-results').css('display', 'none');
  var txt;
    $('#fh5co-header-subscribe').change(function(event) {
      var form = $('#fh5co-header-subscribe');
      txt = form.find('input[name="myInput01"]').val();
      if(txt == ''){
        $('#fh5co-results').css('display', 'none');
        $('#fh5co-core-feature').css('display', 'inherit');
        $('#fh5co-services').css('display', 'inherit');
        return;
      }else{
        $('#fh5co-core-feature').css('display', 'none');
        $('#fh5co-services').css('display', 'none');
        $('#fh5co-results').css('display', 'inherit');
      }
        var datafilms = '';
        $.each( value2, function(index, value) {
          var object = value.completions[0].result;
          var ada = 0;
          object.forEach((item, i) => {
            if(txt.toLowerCase() == item.value.rectanglelabels[0]){
              ada = 1;
              return;
            }
          });
          if (ada == 1) {
            datafilms += datafilms_01(value);
          }

        });
        if (datafilms == '') {
          $('#films_result').empty().append('<p>Yang kamu cari tidak ada</p>');
        }else {
          $('#films_result').empty().append(datafilms);
        }
    });
}

function loadjson() {
  $.getJSON( 'https://raw.githubusercontent.com/ProjectFantasticFive/Tubes_Anotasi_Data/master/%5BDONT%20CHANGE%20THIS%20FILE%5D%20Labeled%20IMDb%20list%20of%20films.json', function(data_films) {
    recfilm(data_films);
    search_films(data_films);
  });
}
