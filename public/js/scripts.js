

(function ($) {

    "use strict";

	// JQUERY LIGHT BOX

	if ( $.isFunction($.fn.fluidbox) ) {
		$('a').fluidbox();
	}

	//ROUNDED TIMES COUNTDOWN

	if(isExists('#rounded-countdown')){
		var remainingSec = $('.countdown').data('remaining-sec');
		$('.countdown').ClassyCountdown({
			theme: "flat-colors-very-wide",
			end: $.now() + remainingSec
		});
	}

	//NORMAL TIMES COUNTDOWN

	if(isExists('#normal-countdown')){
		var date = $('#normal-countdown').data('date');
		$('#normal-countdown').countdown(date, function(event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><h3 class="main-time">%D</h3> <span>Days</span></div>'
				+ '<div class="time-sec"><h3 class="main-time">%H</h3> <span>Hours</span></div>'
				+ '<div class="time-sec"><h3 class="main-time">%M</h3> <span>Mins</span></div>'
				+ '<div class="time-sec"><h3 class="main-time">%S</h3> <span>Sec</span></div>'));
		});
	}


	$('a[href="#"]').on('click', function(event){
		return;
	});

	// COUNTDOWN TIME

	countdownTime();


	$('[data-nav-menu]').on('click', function(event){

		var $this = $(this),
			visibleHeadArea = $this.data('nav-menu');

		$(visibleHeadArea).toggleClass('visible');

	});


	var winWidth = $(window).width();
	dropdownMenu(winWidth);

	$(window).on('resize', function(){
		dropdownMenu(winWidth);

	});

	// Circular Progress Bar

	var isAnimated = false;
  const getRandPic = Math.floor((Math.random() * 1) + 1)

	$("form").on("submit", (e) => {
		e.preventDefault()

		let email = e.target.children[0].value,
		 		btn =  e.target.children[1]

		const validateEmail = (mail) => {
						var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						return re.test(String(mail).toLowerCase());
					}

		btn.innerHTML = `<i class="fas fa-spinner fa-pulse"></i>`

		validateEmail(email) === true ? (
			fetch('https://benshada.herokuapp.com/signup', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email
        })
      })
			.then(btn.innerHTML = `<i class="fas fa-spinner fa-pulse"></i>`)
      .then(response => response.json())
      .then(response => {
				showResponse(response, "#responseHolder", btn)
      })
      .catch(err => {
				console.log(err)
			})
		)
		: showResponse('A valid email address is required', "#responseHolder", btn)


	})
  $(".left-section").css("background-image", `url(../img/countdown/${getRandPic}.jpg)`)

})(jQuery);



function countdownTime(){

	if(isExists('#clock')){
		$('#clock').countdown('2018/01/01', function(event){
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><span class="title">%D</span> days </div>'
				+ '<div class="time-sec"><span class="title">%H</span> hours </div>'
				+ '<div class="time-sec"><span class="title">%M</span> minutes </div>'
				+ '<div class="time-sec"><span class="title">%S</span> seconds </div>'));
		});
	}
}
function dropdownMenu(winWidth){

	if(winWidth > 767){

		$('.main-menu li.drop-down').on('mouseover', function(){
			var $this = $(this),
				menuAnchor = $this.children('a');

			menuAnchor.addClass('mouseover');

		}).on('mouseleave', function(){
			var $this = $(this),
				menuAnchor = $this.children('a');

			menuAnchor.removeClass('mouseover');
		});

	}else{

		$('.main-menu li.drop-down > a').on('click', function(){

			if($(this).attr('href') == '#') return false;
			if($(this).hasClass('mouseover')){ $(this).removeClass('mouseover'); }
			else{ $(this).addClass('mouseover'); }
			return false;
		});
	}

}

function isExists(elem){
	if ($(elem).length > 0) {
		return true;
	}
	return false;
}

function initMap() {

	// Create a new StyledMapType object, passing it an array of styles,
	// and the name to be displayed on the map type control.
	var styledMapType = new google.maps.StyledMapType(
	[
		{
			"featureType": "administrative",
			"elementType": "all",
			"stylers": [
				{
					"saturation": "-100"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 65
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": "50"
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
				{
					"saturation": "-100"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "all",
			"stylers": [
				{
					"lightness": "30"
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "all",
			"stylers": [
				{
					"lightness": "40"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"hue": "#ffff00"
				},
				{
					"lightness": -25
				},
				{
					"saturation": -97
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels",
			"stylers": [
				{
					"lightness": -25
				},
				{
					"saturation": -100
				}
			]
		}
	],
		{name: 'Styled Map'});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.

	var uluru = {lat: 56.946285, lng: 24.105078};
    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
    });

	var image = 'images/google-marker.png';
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		icon: image
	});
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
}




// Mine
const showResponse = (response, responseHolder,	btn) => {
	$(responseHolder).addClass('fadeIn').html(response)
	btn.innerHTML = `NOTIFY	US`
}

$('#homeModal').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget),
      title = button.data('whatever'),
      modal = $(this),
      info = {
        about: $('.about-content').html(),
        categories: $('.categories-content').html()
      }


  modal.find('.modal-body h1').text(title)
  modal.find('.modal-body .koko-content').html(info[title])
})