var wavesurfer;
var santacruz;
var map;
var markersLocation;
var markers;
var sidebar;
var videoFileArray = [
  "https://caminar.joseavera.com/videos/Lugar_Rio_Fragas.mp4",
  "https://caminar.joseavera.com/videos/Lugar_Castillo_Santa_Cruz.mp4",
];
var offset = 0;
var videosLength = videoFileArray.length;
var i = 0;

// const colors = colormap({
//   colormap: 'hot',
//   nshades: 256,
//   format: 'float'
// });
// const fs = require('fs');
// fs.writeFile('hot-colormap.json', JSON.stringify(colors));

function initAndLoadSpectrogram(colorMap) {

  // Create an instance
  var options = {
    container: '#waveform',
    waveColor: 'white',
    progressColor: 'gray',
    loaderColor: 'gray',
    cursorColor: 'tomato',
    responsive: true,
    hideScrollbar: true,
    plugins: [
      WaveSurfer.spectrogram.create({
        container: '#wave-spectrogram',
        labels: true,
        colorMap: colorMap,
        pixelRatio: 1
        // fftSamples: 1024

      }),
      // WaveSurfer.regions.create({
      //   regions: [
      //     {
      //       id: "myRegion",
      //       start: 0,
      //       end: 10,
      //       loop: true,
      //       color: '#cccccc'
      //     }
      //   ]
      // }),
      WaveSurfer.markers.create({
        markers: [
          {
            time: 8,
            label: "Mirlo común (Turdus merula)",
            color: '#ff990a'
          },
          {
            time: 23,
            label: "Jilguero (Carduelis carduelis) ",
            color: '#00ffcc',
            // position: 'top'
          }
        ]
      }),
      WaveSurfer.cursor.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          'background-color': '#000',
          color: '#fff',
          padding: '2px',
          'font-size': '10px'
        }
      })
    ]
  };


  wavesurfer = WaveSurfer.create(options);

  wavesurfer.load("sounds/birds.mp3");
   wavesurfer.on("ready", function () {
       wavesurfer.play();

   });
    wavesurfer.on("finish", function () {
      wavesurfer.play();
    });

}


// Init & load
document.addEventListener('DOMContentLoaded', function () {
 
  // Load a colormap json file to be passed to the spectrogram.create method.
  WaveSurfer.util
    .fetchFile({ url: 'https://caminar.joseavera.com/assets/colormap-master/hot-colormap.json', responseType: 'json' })
    .on('success', colorMap => {
      initAndLoadSpectrogram(colorMap);
    });



});








// var wavesurfer = WaveSurfer.create({
//   container: '#waveform',
//   waveColor: '#D2EDD4',
//   progressColor: '#46B54D'
// });

// wavesurfer.on('ready', function () {
//   var spectrogram = Object.create(WaveSurfer.Spectrogram);
//   spectrogram.init({
//     wavesurfer: wavesurfer,
//     container: "#wave-spectrogram",
//     fftSamples: 1024,
//     labels: true
//   });
// });


// var wavesurfer = WaveSurfer.create({
//   container: '#waveform',
//   waveColor: '#D2EDD4',
//   // your options here
//   plugins: [
//     WaveSurfer.spectrogram.create({
//       wavesurfer: wavesurfer,
//       container: "#wave-spectrogram",
//       labels: true
//     })
//   ]
// });

//load audio file						
// wavesurfer.load("sounds/birds.mp3"); // load audio

// wavesurfer.on('ready', function () {
//   var spectrogram = Object.create(WaveSurfer.Spectrogram);
//   spectrogram.init({
//     wavesurfer: wavesurfer,
//     container: "#wave-spectrogram",
//     fftSamples: 1024,
//     labels: true
//   });
// });








function init2() {
  map = new L.Map('map', {
    // Set latitude and longitude of the map center (required)
    center: [43.348528, -8.350083],
    minZoom: 7,
    maxZoom: 18,
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 18,
  });

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 20
  }).addTo(map);

  sidebar = L.control.sidebar('sidebar', {
    position: 'left'
  });

  map.addControl(sidebar);

  var marker = L.marker([51.2, 7]).addTo(map).on('click', function () {
    $(".sidebar-content").html($(".leaflet-popup-content").html());

    // sidebar.toggle();
    map.setView(santacruz, 13);
  });
  map.on('drag', function () {
    sidebar.hide();
  })

  map.on('click', function () {
    santacruz = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
    map.setView(santacruz, 13);
    sidebar.hide();
  })

  sidebar.on('show', function () {
    santacruz = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
    map.setView(santacruz, 13);
    console.log('Sidebar will be visible.');
  });

  sidebar.on('shown', function () {
    console.log('Sidebar is visible.');
    santacruz = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
    map.setView(santacruz, 13);
  });

  sidebar.on('hide', function () {
    santacruz = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
    map.setView(santacruz, 13);
    console.log('Sidebar will be hidden.');
  });

  sidebar.on('hidden', function () {
    santacruz = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
    map.setView(santacruz, 13);
    console.log('Sidebar is hidden.');

  });

  L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
    santacruz = new L.LatLng(map.getCenter().lat, map.getCenter().lng);
    map.setView(santacruz, 13);
    console.log('Close button clicked.');
  });

  L.Routing.control({
    waypoints: [
      L.latLng(43.348528, -8.350083),
      L.latLng(43.4014444, -8.3301389),
      L.latLng(43.414056, -8.073917 ),
      L.latLng(43.410463, -8.080610),
      L.latLng(43.053616, -2.7942439),
        L.latLng(43.410463, -2.929092),
          L.latLng(41.432184, 1.774475),
            L.latLng(41.837750, 2.098278)

    ],
    draggableWaypoints: false,
    routeWhileDragging: false,
    lineOptions: {
      addWaypoints: false
    }
  }).addTo(map)


  

  map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

  santacruz = new L.LatLng(43.348528, -8.350083);
  map.setView(santacruz, 13);

  // Define an array. This could be done in a seperate js file.
  // This tidy formatted section could even be generated by a server-side script
  // or fetched seperately as a jsonp request.
  markers = [
    [-8.350083, 43.348528, "Fuente Castillo Santa Cruz"],
    [-8.3301389, 43.4014444, "A Marola"],
    [-8.073917, 43.414056, "Fragas do Eume (Ruta dos Encomendeiros)"],
    [-8.080610, 43.410463, "Fragas do Eume (Salto de Agua)"],
    [-2.7942439, 43.053616, "Gorbea (Vacas y caballos)"],
    [-2.929092, 43.256149, "Calle San Francisco, Bilbao"],
    [1.774475, 41.432184,"Zona de Bosquecito en Sant Sadurní d’Anoia"],
    [2.098278, 41.837750, "Moiá, casa de María, geoloc aprox"]
  ];


  //Loop through the markers array
  for (var i = 0; i < markers.length; i++) {
    var santacruz = new L.LatLng(43.348528, -8.350083);

    var lon = markers[i][0];
    var lat = markers[i][1];
    var popupText = markers[i][2];

    markerLocation = new L.LatLng(lat, lon);
    console.log(markerLocation);
    var marker = new L.Marker(markerLocation);

    var circle = L.circle([lat, lon], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);

    marker = L.marker([lat, lon]).addTo(map).on('click', function () {
      sidebar.toggle();
    });

    map.addLayer(marker);

  //  var miniMap = new L.Control.GlobeMiniMap({
  //    //uncomment to assign colors
  //    // land:'#FFFF00',
  //    // water:'#3333FF',
  //    // marker:'#CC0000'
  //   //  topojsonSrc: "assets/leaflet-globeminimap-master/src/world.json",
  //  }).addTo(map);

 

    marker.bindPopup(popupText);

    


  }

}

function initVideos(map) {
  $(videoFileArray).each(function (j) {
    videosLength--;
    setTimeout(function () {
      console.log(j);
      console.log(offset);
      map.setView(new L.LatLng(markers[i][1], markers[i][0]), 13);

      if (i < markers.length) {
        ++i;
      } else {
        --i;
      }

      $("#videoLayer")
        .fadeOut(400, function () {
          console.log(i);

          $("#videoLayer source").attr("src", videoFileArray[j]);
          $("#videoLayer")[0].load();
        })
        .fadeIn(400);

      if (i >= videoFileArray.length - 1) {
        offset = 0;
        initVideos();
        // setTimeout(function () {

        // }, 1000);
      }
    }, 10000 + offset);
    offset += 10000;
  });
 
}




  function init() {
         




    map.setView(santaCruz, 13, { animation: true });
         
  
// var marker = L.marker(
//   [42.88052, -8.54569],
//   { 
//     draggable: true,
//     title: "",
//     opacity: 0.75
// });

    // var cities = L.layerGroup([littleton, denver, aurora, golden]);



        
      }


init2();
initVideos(map);

$(".go-to-map-link").click(function () {
  $('#waveform_box').toggle();
  sidebar.hide();
  $("#sidebar").css("opacity", "1");
  // $('video').fadeOut();
  // $('#map').fadeIn();
  $("video").toggleClass("invisible", "visible");
  $("#map").toggleClass("invisible", "visible");
  $(".home-title-container").toggle();
});
$(".mute-link").click(function () {
  $(".mute-link i").toggleClass("fa-volume-up", "fa-volume-mute");
  // wavesurfer.playPause(); 
  wavesurfer.toggleMute();
});

$(".share-link").click(function () {
  alert("open share");
});

   



var lFollowX = 0,
  lFollowY = 0,
  x = 0,
  y = 0,
  friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  translate = "translate(" + x + "px, " + y + "px) scale(1.2)";

  $(".bg").css({
    "-webit-transform": translate,
    "-moz-transform": translate,
    transform: translate,
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on("mousemove click", function (e) {
  var lMouseX = Math.max(
    -100,
    Math.min(100, $(window).width() / 2 - e.clientX)
  );
  var lMouseY = Math.max(
    -100,
    Math.min(100, $(window).height() / 2 - e.clientY)
  );
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;
});

moveBackground();



