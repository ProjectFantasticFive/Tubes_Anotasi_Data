;(function () {

	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}


	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};


	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
	});


}());

function datafilms_01(value) {
	var label = [];
		var object = value.completions[0].result;
		object.forEach((item, i) => {
			label.push(" "+item.value.rectanglelabels[0].charAt(0).toUpperCase()+item.value.rectanglelabels[0].slice(1));
		});
		console.log(label);
	return '<div class="filmrec">'
										+'<img src="'+value.data.image+'.jpg">'
											+'<a class="film_id" href="#'+value.data.judul.split(" ").join("")+'">'+value.data.judul+'</a>'
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
													+'<a class="close" href="#close"></a>'
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
