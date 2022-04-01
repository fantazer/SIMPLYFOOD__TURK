$(document).ready(function () {
	window.condition = {};

	let body = $('body')

	window.condition.modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0,
		"name": '',
		update() {
		},
		get changeCondition() {
			return this.isModalShow;
		},
		set changeCondition(isModalShow) {
			this.isModalShow = isModalShow;
			this.update(this.isModalShow);
		}
	};

	var scrollWidth= window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			window.condition.modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -window.condition.modalState.scrollPos,
				width: '100%',
				paddingRight: scrollWidth
			});
		}
		window.condition.modalState.isModalShow = true;
		window.condition.modalState.changeCondition = 1;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: window.condition.modalState.scrollPos,
			paddingRight: 0
		});
		$(window).scrollTop(window.condition.modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function () {
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		}, 600);
		window.condition.modalState.isModalShow = false;
		window.condition.modalState.changeCondition = 0;
		window.condition.modalState.name = ''
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
				window.condition.modalState.name = el
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
	};

	body.on('click','.modal-get',function(){
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.js-modal-close, .modal-hide').click(function () {
		closeModal();
	});

	$(document).on('keyup',function(e){
		e.key === 'Escape' ? closeModal() : ''
	})

	$('.modal-wrap').click(function(e){
		e.target.className === 'modal-wrap' ? closeModal() : false
	});

	//modal msg
	var showModalMsg = function(current,time){
		$('.modal-msg').removeClass('active')
		setTimeout(function(){
			$('.modal-msg[data-modalMsg=' + current + ']').addClass('active')
			//console.log(11);
		},time)
	}
	//modals===end

	// fix top-menu
/*	var shrinkHeader = 250;
	var head = $('.header1');
	var heightHeader = head.height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				body.css('paddingTop',heightHeader);
				head.addClass('shrink');
			}
			else {
					body.css('paddingTop',0);
					head.removeClass('shrink');
			}
	});*/
	// fix top-menu === end

	// ============ TRIGGER EVENT ============

	// toggle single
	body.on('click','.js-toggle',function(){
		$(this).toggleClass("active")
	})
	// toggle single === end

	// slide toggle
	body.on('click','.js-slide',function(){
		$(this).closest('.js-slide-wrap').find('.js-slide-cont').slideToggle(500);
	});
	// slide toggle === end

	// toggle class one from list

	body.on('click','.js-tick',function(){
		if($(this).hasClass("js-disable")) return
		var parent = $(this).closest('.js-tick-cont');
		parent.find('.js-tick').removeClass('active');
		$(this).addClass('active')
	});

	// toggle class one from list === end

	//toggle class + neighbor
	body.on('click','.js-commutator-el', function(){
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		}else{
			selector = $(".js-commutator-cont");
		}
		selector.each(function(){
			if($(this).data("item")=== thisItem){
				$(this).toggleClass('active');
			}else{
				isEach ? $(this).removeClass("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	// switch
	body.on('click', '.js-switch', function (e) {
		if (e.target.className != 'style-input') {
			var typeItem = $(this).data("item");
				console.log($(this));
			if ($(this).closest('.js-switch-wrap').length === 0) {
				console.log("her");
				var groupItem = $(this).data("group");
				var selector = $('.js-switch[data-group=' + groupItem + ']');
				var size = selector.size()
				selector.each(function () {
					$(this).removeClass("active");
				});
				$('.js-switch-cont').each(function () {
					if ($(this).data("group") === groupItem) {
						if ($(this).data("item") === typeItem) {
							if (size === 0) {
								$(this).toggleClass("hidden")
							} else {
								$(this).removeClass("hidden")
							}
						} else {
							$(this).addClass("hidden");
						}
					}
				});
			}else{
				var parent = $(this).closest('.js-switch-wrap');
				parent.find('.js-switch').removeClass('active')
				parent.find('.js-switch-cont').each(function () {
						if($(this).data("item") === typeItem) {
							$(this).removeClass("hidden")
						} else {
							$(this).addClass("hidden");
						}
				});
			}
			$(this).addClass("active");
		}
	});
	// switch === end

	// Tab toggle
	var actionTab;
	(
		actionTab = function () {
			body.on('click', '.js-tab', function () {
				if($(this).hasClass("js-disable")) return
				var current = $(this).index();
				var parentEl = $(this).closest('.js-tab-wrap')
				var listEl = parentEl.find('.js-tab-cont');
				listEl.filter(function () {
					return $(this).parents('.js-tab-wrap')[0] === parentEl[0]
				}).removeClass('active').eq(current).addClass('active')
			});
		}
	)()
	// Tab toggle  === end

	// accordion row toggle
	body.on('click','.js-accordion-head', function(e){
		var current = $(this).closest('.js-accordion-el').index()
		$(this).closest('.js-accordion').find('.js-accordion-el').each(function(){
			if($(this).index()!=current){
				 $(this).find('.js-accordion-head').removeClass('active')
				 $(this).find('.js-accordion-content').slideUp('active')
			}else{
				 $(this).find('.js-accordion-content').slideToggle('active')
				 $(this).find('.js-accordion-head').toggleClass('active')
			}
		})
	});
	// accordion row toggle === end

	// ============ TRIGGER EVENT END ============

	// dropdown
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	});
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	});
	$('.dropdown .dropdown-menu__el').click(function () {
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	// dropdown === end

	// incr
	var incrEl = {}
	body.on('click', '.js-inc-nav', function (e) {
		incrEl.parent = $(this).closest(".js-incr-wrap");
		incrEl.value = parseInt(incrEl.parent.find('.js-incr-val').html());
		incrEl.state = incrEl.parent.find('.js-incr-val')
		incrEl.min = incrEl.parent.data('min')*1 || 0
	});
	body.on('click', '.js-inc-nav--minus', function (e) {
		incrEl.value = incrEl.value <= incrEl.min ? incrEl.min : --incrEl.value
		incrEl.state.html(incrEl.value);
		console.log(incrEl.value);
	});
	body.on('click', '.js-inc-nav--plus', function (e) {
		++incrEl.value;
		incrEl.value = incrEl.value > 100 ? 100 : incrEl.value;
		incrEl.state.html(incrEl.value);
	});
	// incr === end


	// slide menu
	var hideSlideMenu = function(el){
		$(".head-toggle").removeClass('active');
		$(".slide-block").removeClass("active");
	}
	$('.js-slide-block-toggle').click(function (event) {
		$(".js-slide-block-toggle").not(this).removeClass('active');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("active")
			} else {
				$(this).removeClass("active")
			}
		})
		$(this).toggleClass('active');
	});

	$(document).mouseup(function (e) {
		var parent = $(".slide-block").add('.js-slide-block-toggle');
		if (!parent.is(e.target) && parent.has(e.target).length === 0) {
			hideSlideMenu();
		}
	});
	// slide menu === end


	// review slider
	$('.review-slider').slick({
		slidesToShow: 4,
		speed: 800,
		dots:false,
		arrows:false,
		autoplay:false,
		autoplaySpeed: 4800,
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 3.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 769,
					settings: {
						slidesToShow: 2.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 640,
					settings: {
						slidesToShow: 1.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			}
		]
	});
	// review slider === end

	// animate scroll to id
	$(".js-scroll-to").mPageScroll2id({
		//offset:50,
		forceSingleHighlight:true,
		keepHighlightUntilNext:true,
		scrollSpeed:900
	});
	$(".slide-nav .js-scroll-to").click(function(){
		$('body').removeClass('body-fix')
		$('.slide-block').removeClass('slide-block--open');
		$('.head-toggle').removeClass('slide-block-toggle--open');
	});
	// animate scroll to id === end

	// slide menu
	body.on('click','.js-slide-block-toggle', function(event){
		$(".js-slide-block-toggle").not(this).removeClass('slide-block-toggle--open');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("slide-block--open")
			} else {
				$(this).removeClass("slide-block--open")
			}
		})
		$(this).toggleClass('slide-block-toggle--open');
		$('body').toggleClass('body-fix')
	});
	// slide menu === end

	// align center tab config
		/*$('.config-nav').scrollLeft($('.config-nav').width()/2 - $('.config-nav__el').width()/2)*/
	// align center tab config === end

	// FORM validate
	$.validator.addMethod("wordCount",
		function (value, element, params) {
			var count = getWordCount(value);
			if (count >= params[0]) {
				return true;
			}
		},
		jQuery.validator.format("A minimum of {0} words is required here.")
	);
	$.validator.addMethod('fnType', function (value, element) {
		return value.match(/^[+-]?\d+$/);
	}, 'Введите правильный телефон');


	var validateConfig = {
		"name": {
			required: true,
			minlength: 2,
			messages: {
				required: 'gerekli alan',
				minlength: 'Değer daha uzun olmalı',
			},
		},
		"simpleText": {
			required: true,
			minlength: 5,
			messages: {
				required: 'gerekli alan',
				minlength: 'Değer daha uzun olmalı',
			},
		},
		"email": {
			required: true,
			email:true,
			messages: {
				required: 'gerekli alan',
				email: 'yanlış değer'
			},
		},
		"phone": {
			required: true,
			minlength: 5,
			messages: {
				required: 'gerekli alan',
				number: 'yanlış değer',
				minlength: 'Değer daha uzun olmalı',
			},
		},
	}

	$('.js-validate').each(function () {
		let currentForm = $(this);
		currentForm.config = {};
		let isModal = currentForm.data('is_modal')
		let openModal = currentForm.data('open_modal')
		let redirectUrl = currentForm.data('redirect_url')
		$(this).validate({
			highlight: function (element) { //даем родителю класс если есть ошибка
				$(element).parent().addClass("field-error");
			},
			unhighlight: function (element) {
				$(element).parent().removeClass("field-error");
			},
			rules: {
				agree: {
					required: true
				}
			},
			messages: {
				agree: {
					required: false
				}
			},
			submitHandler: function () {
				var currentSendData = '';
				currentForm.each(function(){
					$(this).find(".js-input-data").each(function(){
						currentSendData = currentSendData + "&"+$(this).data('condition')+"="+$(this).val()
					})
				})
				console.log(currentSendData);
				$(':input', '.js-validate') //очитска формы от данных
					.not(':button, :submit, :reset, :hidden')
					.val('')
					.removeAttr('checked')
					.removeAttr('selected')
				$.ajax({
					type: "POST",
					url: "mail.php",
					data: currentSendData.slice(1),
					success: function (data) {
						isModal ? window.condition.closeModal(isModal) : true
						openModal ? window.condition.initModal(openModal) : true
						redirectUrl ? window.location.replace(redirectUrl) : true
					}
				});
			}
		})
		$(this).find(".js-input-data").each(function () {
			if($(this).data("type")){
				$(this).rules("add", validateConfig[$(this).data("type")]);
			}
		});
	});
	// FORM validate === end
	window.condition.closeModal = closeModal
	window.condition.initModal = initModal
	window.condition.showModalMsg = showModalMsg

});
