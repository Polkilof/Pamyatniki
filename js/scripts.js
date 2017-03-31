$(document).ready(function(){

	$('.slide-baner').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 70000,
		fade: true
	});

	$('.baner .slick-prev').click(function(){
		$('.slide-baner').slick('slickPrev');
		return false;
	});

	$('.baner .slick-next').click(function(){
		$('.slide-baner').slick('slickNext');
		return false;
	});

	$('.slide-milestones').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				adaptiveHeight: true
			}
		},
		]
	});

	$('.slide-baner .slide-item').each(function() {
		$(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')').find('> img').hide();
	});

	$('<a href="#" class="open-menu">Open Menu</a>').prependTo('#header .container');
	$('<span class="fader"/>').appendTo('#header');
	$('.open-menu').click(function(){
		$('body').toggleClass('menu-opened');
		return false;
	});

	$('.fader').click(function(){
		$('body').removeClass('menu-opened');
	});

	$('body').on('touchmove', function(event) {
		if ($('body').hasClass('menu-opened') && $(window).width() < 992) {
			if ($('#main-nav ul').has(event.target).length) {
				return true;
			} else {
				event.preventDefault();
			}
		}
	});

	$('.fader').on('touchmove', function() {
		if ($('body').hasClass('menu-opened') && $(window).width() < 992) {
			$('body').removeClass('menu-opened');
		}
	});

	function mapInitialize(map_) {
		var coords_ = $('#'+ map_).data('coords');
			if (coords_){
				var latitude = coords_.split(',')[0];
				var longtitude = coords_.split(',')[1];
			}
			
		var iconBase = 'images/map-marker.png';

		var latlng = new google.maps.LatLng(latitude,longtitude);
		
		var myOptions = {
			center: latlng,
			scrollwheel: false,
			zoom: 14,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			disableDoubleClickZoom: true
		};
		
		var map = new google.maps.Map(document.getElementById(map_), myOptions);
		
		var stylesBW = [
			{
				featureType: "all",
				stylers: [
					{ saturation: 0 }
				]
			}
		];

		map.setOptions({styles: stylesBW});

		var marker = new google.maps.Marker({
			position: latlng,
			icon: iconBase,
			map: map
		});
	
	};
	$('.map').each(function(){
		var map_ = $(this).attr('id');
		mapInitialize(map_);
	});

	$('.radio').each(function() {
		$(this).children('label').append('<span class="control-indicator"></span>');
	});

	$('.select').SumoSelect({
		floatWidth: 0,
		forceCustomRendering : true
	});

	$('.card-page .table input[type="radio"]').prop('checked', false);
	$('.card-page .table .active [type="radio"]').prop('checked', true);

	$('.card-page .table tr').click(function() {
		if (!$(this).find('.radio').hasClass('active')) {
			$(this).find('input[type=radio]').prop('checked', true );
			$(this).find('.radio').attr('checked');
			$(this).siblings().find('.active').removeClass('active');
			$(this).siblings().find('input[type=radio]').removeAttr('checked');
		}
	});

	$('.materials .materials-block').click(function(event) {
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active').parent().siblings().children('.active').removeClass('active');
		} else{
			$(this).removeClass('active');
		}

		addMaterial( $(this) );

		allCount();
		allPrice();
		totalPrice();

		event.preventDefault();
	});

	addMaterial($('.materials .materials-block.active'));

	function addMaterial(_this) {
		var price = _this.attr('data-price'),
			name = _this.children('p').text();
			

		$('.table-choosed tbody .material-tr .name-material').empty();
		$('.table-choosed tbody .material-tr .selection').empty();
		$('.table-choosed tbody .material-tr .name-material').text(name);
		$('.table-choosed tbody .material-tr .selection').text(price);
	}

	$('.table-stella tr').click(function() {
		if ( !$(this).find('.radio').hasClass('active') ) {

			$(this).find('.radio').addClass('active');
			$(this).parents('tr').siblings('tr').find('.active').removeClass('active');

			addStella( $(this) );

		}

		allCount();
		allPrice();
		totalPrice();
	});

	function addStella(_this) {
		var price = _this.find('td:last').text(),
			size = _this.find('.radio').find('span:not(.control-indicator)').text(),
			thickness = _this.find('td:nth-child(2)').text(),
			priceSlice = price.slice(0, -2),
			sizeSlice = size.slice(0, -3),
			sizeSlice = sizeSlice.replace(/\s+/g, ''),
			thicknessSlice = thickness.slice(0, -3),
			textEl = (sizeSlice+'x'+thicknessSlice);

		$('.table-choosed tbody .stella-tr .size').empty();
		$('.table-choosed tbody .stella-tr .selection').empty();
		$('.table-choosed tbody .stella-tr .size').text(textEl);
		$('.table-choosed tbody .stella-tr .selection').text(priceSlice);
	}

	addStella( $('.table-stella .active').parents('tr') );

	$('.table-curbstone tr').click(function() {
		if ( !$(this).find('.radio').hasClass('active') ) {

			$(this).find('.radio').addClass('active');
			$(this).parents('tr').siblings('tr').find('.active').removeClass('active');

		}

		addCurbstone( $(this) );

		allCount();
		allPrice();
		totalPrice();
	});

	function addCurbstone(_this) {
		var price = _this.find('td:last').text(),
			size = _this.find('.radio').find('span:not(.control-indicator)').text(),
			thickness = _this.find('td:nth-child(2)').text(),
			priceSlice = price.slice(0, -2),
			sizeSlice = size.slice(0, -3),
			sizeSlice = sizeSlice.replace(/\s+/g, ''),
			thicknessSlice = thickness.slice(0, -3),
			textEl = (sizeSlice+'x'+thicknessSlice);

		$('.table-choosed tbody .curbstone-tr .size').empty();
		$('.table-choosed tbody .curbstone-tr .selection').empty();
		$('.table-choosed tbody .curbstone-tr .size').text(textEl);
		$('.table-choosed tbody .curbstone-tr .selection').text(priceSlice);
	}

	addCurbstone( $('.table-curbstone .active').parents('tr') );

	$('.sizes-table tr').click(function() {
		if ( !$(this).find('.radio').hasClass('active') ) {

			$(this).find('.radio').addClass('active');
			$(this).parents('tr').siblings('tr').find('.active').removeClass('active');
			$('.table-choosed tbody .sizes-tr').removeClass('hidden');

			var price = $(this).find('td:last').text(),
				size = $(this).find('.radio').find('span:not(.control-indicator)').text(),
				thickness = $(this).find('td:nth-child(2)').text(),
				priceSlice = price.slice(0, -2),
				sizeSlice = size.slice(0, -3),
				sizeSlice = sizeSlice.replace(/\s+/g, ''),
				thicknessSlice = thickness.slice(0, -3),
				textEl = (sizeSlice+'x'+thicknessSlice);

			$('.table-choosed tbody .sizes-tr .size').empty();
			$('.table-choosed tbody .sizes-tr .selection').empty();
			$('.table-choosed tbody .sizes-tr .size').text(textEl);
			$('.table-choosed tbody .sizes-tr .selection').text(priceSlice);

		}


		if ($(this).hasClass('disable') ) {
			$('.table-choosed tbody .sizes-tr').addClass('hidden');
			$('.table-choosed tbody .sizes-tr .size').empty();
			$('.table-choosed tbody .sizes-tr .selection').empty();
		}
		allCount();
		allPrice();
		totalPrice();
	});


	function addFIO(_this) {
		var contentEl = _this.text(),
			contentEl = contentEl.slice(12, -5);

		$('.table-choosed tbody .fio-tr .selection').empty();
		$('.table-choosed tbody .fio-tr .selection').text(contentEl);
	}

	$('.select-fio .optWrapper li').click(function() {
		addFIO( $(this) );
		allCount();
		allPrice();
		totalPrice();
	});
	
	addFIO( $('.select-fio .CaptionCont span') );

	function addPhoto(_this) {
		var contentEl = _this.text(),
			contentEl = contentEl.slice(12, -5);

		$('.table-choosed tbody .photo-tr .selection').empty();
		$('.table-choosed tbody .photo-tr .selection').text(contentEl);
	}

	$('.select-photo .optWrapper li').click(function() {
		addPhoto( $(this) );
		allCount();
		allPrice();
		totalPrice();
	});

	addPhoto( $('.select-photo .CaptionCont span') );

	function totalPrice(){
		var sumPrice = parseInt($('.card-page .sidebar .sum-price').text()),
			setup = $('.setup-table .active').parents('tr').find('td:last strong').text(),
			setup = setup.slice(0, -3),
			setup = parseInt(setup.replace(/\s+/g, '')),
			delivery = $('.delivery-table .active').parents('tr').find('td:last strong').text(),
			delivery = delivery.slice(0, -3),
			delivery = parseInt(delivery.replace(/\s+/g, '')),
			allPrice = sumPrice + setup + delivery,
			winterDiscount = allPrice/100*7,
			discount = allPrice/100*5,
			discountPpensioners = allPrice/100*3;


		$('.card-page .sidebar .winter-discount').text(winterDiscount);
		$('.card-page .sidebar .discount').text(discount);
		$('.card-page .sidebar .discount-pensioners').text(discountPpensioners);
		$('.card-page .sidebar .all-discount').text(winterDiscount + discount +discountPpensioners);
		$('.card-page .sidebar .total-price').text(allPrice - discountPpensioners);
	}

	$('.delivery-table tr').click(function() {
		if ( !$(this).find('.radio').hasClass('active') ) {

			$(this).find('.radio').addClass('active');
			$(this).parents('tr').siblings('tr').find('.active').removeClass('active');

		}
		totalPrice();
	});

	$('.setup-table tr').click(function() {
		if ( !$(this).find('.radio').hasClass('active') ) {

			$(this).find('.radio').addClass('active');
			$(this).parents('tr').siblings('tr').find('.active').removeClass('active');

		}
		totalPrice();
	});

	allCount();
	allPrice();
	totalPrice();

	function allCount() {
		var count = $('.table-choosed tbody tr:visible').length;
		$('.table-choosed .all-count').text(count);
	}

	function allPrice() {
		var sum = 0;
		$('.table-choosed tr:visible .selection').each(function() {
			var str = $(this).text();
			str = str.replace(/\s+/g, '');
			sum += parseInt(str)
		});
		$('.table-choosed .sum td:last span').text(sum);
	}


	var limitItems = 8;
	var respLazyLoaderOptions = function() {
		if ($(window).width() < 768) {
			limitItems = 4;
		}
	};
	respLazyLoaderOptions();
	$('.works-loading').lazyLoader({
		jsonFile: 'json/load-more.json',
		mode: 'click',
		limit: limitItems,
		records: 16,
		more_caption: 'Загрузить еще',
		offset: 1
	});

});
