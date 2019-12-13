$(function(){
        $('.season--winter').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed: 5000,
            speed: 1500,
            prevArrow:'<img src="images/svg/left-arrow--winter.svg" alt="1" class="left-arrow--winter">',
            nextArrow: '<img src="images/svg/right-arrow--winter.svg" alt="2" class="right-arrow--winter">',
            responsive: [
            {
              breakpoint: 1000,
              settings: {
              arrows: false,
              }
            }
        ]
        });
    
        $('.season--summer').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1500,
            prevArrow:'<img src="images/svg/left-arrow--summer.svg" alt="1" class="left-arrow--summer">',
            nextArrow: '<img src="images/svg/right-arrow--summer.svg" alt="2" class="right-arrow--summer">',
            responsive: [
            {
              breakpoint: 1000,
              settings: {
              arrows: false,
              }
            }
        ]
        });
        $('.reviews').slick({
            dots: true, 
            arrows: true, 
            slidesToShow: 3,
            slidesToScroll: 1,
              responsive: [
            {
              breakpoint: 1000,
              settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 1,
              }
            },
            {
              breakpoint: 550,
              settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              }
            }
        ]
    });
});

$(function() {
	var header = $('#header');
	var intro = $('#main__page').innerHeight();
	var scrollOffSet = 0;
	
	$(window).on("scroll", function() {
		var scrollOffSet = $(this).scrollTop();
		
		if(scrollOffSet>=intro) {
			header.addClass('header--fixed');
		} else {
			header.removeClass('header--fixed');
		}
});

$('#nav__toggle').on('click',function(event) {
		event.preventDefault();
		
    $(this).toggleClass('active');
		$('#nav').toggleClass('active');
		$('header').toggleClass('active');

	})
});

//flowing-scroll
$("[data-scroll]").on("click", function(event) {
    event.preventDefault();

    var $this = $(this),
        blockId = $this.data('scroll'),
        blockOffset = $(blockId).offset().top -5;

    $("#nav a").removeClass("active");
    $this.addClass("active");

    $("html, body").animate({
        scrollTop:  blockOffset
    }, 1500);
});

//Webcam Video Pop-up
$(".vpop").on('click', function(e) {
  e.preventDefault();
  $(".video-popup-overlay,.video-popup-iframe-container,.video-popup-container,.video-popup-close").show();
  
  var srchref='',autoplay='',id=$(this).data('id');
  if($(this).data('type') == 'vimeo') var srchref="//player.vimeo.com/video/";
  else if($(this).data('type') == 'youtube') var srchref="https://www.youtube.com/embed/";
  
  if($(this).data('autoplay') == true) autoplay = '?autoplay=1';
  
  $(".video-popup-iframe").attr('src', srchref+id+autoplay);
  
  $(".video-popup-iframe").on('load', function() {
    $(".video-popup-container").show();
  });
});

$(".video-popup-close, .video-popup-overlay").on('click', function(e) {
  $(".video-popup-iframe-container,.video-popup-container,.video-popup-close,.video-popup-overlay").hide();
  $(".video-popup-iframe").attr('src', '');
});

//Booking Form
function openForm() {
  document.getElementById("bookingForm").style.display = "block";
}

function closeForm() {
  document.getElementById("bookingForm").style.display = "none";
}

//Presentation
(function($) {
  'use strict';

  var Hero = {
    getDebounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    getSlick: function($method) {
      $('[data-init="slick"]').each(function () {
        var el = $(this);

        var breakpointsWidth = { tn: 319, xs: 479, ss: 519, sm: 767, md: 991, lg: 1199 };

        var slickDefault = {
          dots: true,
          arrows: false,

          fade: true,
          infinite: true,
          autoplay: true,
          pauseOnHover: true,
          speed: 1000,
          adaptiveHeight: true,

          slidesToShow: 1,
          slidesToScroll: 1,

          mobileFirst: true
        };

        // Merge settings.
        var settings = $.extend(slickDefault, el.data());
        delete settings.init;

        // Build breakpoints.
        if (settings.breakpoints) {
          var _responsive = [];
          var _breakpoints = settings.breakpoints;

          var buildBreakpoints = function buildBreakpoints(key, show, scroll) {
            if (show !== 0) {
              if (breakpointsWidth[key] != 991 && breakpointsWidth[key] != 1199) {
                _responsive.push({
                  breakpoint: breakpointsWidth[key],
                  settings: {
                    slidesToShow: parseInt(show),
                    slidesToScroll: 1
                  }
                });
              } else {
                _responsive.push({
                  breakpoint: breakpointsWidth[key],
                  settings: {
                    slidesToShow: parseInt(show),
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true
                  }
                });
              }
            };
          };

          if ((typeof _breakpoints === 'undefined' ? 'undefined' : _typeof(_breakpoints)) === "object") {
            $.each(_breakpoints, buildBreakpoints);
          }

          delete settings.breakpoints;
          settings.responsive = _responsive;
        };

        if ($method != 'unslick') el.slick(settings);else el.slick($method);
      });
    },

    getYoutubePlayer: function() {
      $('[data-video="youtube"]').each(function() {
        $(this).YTPlayer({
          showControls: false
        });
      });
    },

    getVimeoPlayer: function() {
      $('[data-video="vimeo"]').each(function() {
        $(this).vimeo_player({
          showControls: false
        });
      });
    },

    init: function() {
      var self = this;

      // Call functions use debounce resize function
      var resizeDebounce = self.getDebounce(function() {
      }, 250);

      self.getSlick();
      self.getYoutubePlayer();
      self.getVimeoPlayer();

      window.addEventListener('resize', resizeDebounce);
    }
  };

  $(document).ready(function() {
    Hero.init();
  });

})(jQuery);
