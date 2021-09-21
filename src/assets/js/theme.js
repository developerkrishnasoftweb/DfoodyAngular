// -----------------------------

//   js index
/* =================== */
/*  
    ## preloader
    ## Counter Up
    ## sticky
    ## SmartMenu Nav
    ## Countdown 
    ## smooth scroll
    ## WOW
    ## Searchbox JS
    ## Quantity Increment Decrement JS
    ## owl carousel
    ## Youtube Player JS
    ## Contact Form
    ## Cart Box
    

*/
// -----------------------------
(function($) {
    "use strict";



    /*---------------------
        preloader
    --------------------- */

    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
            // Counter Up
            $('.counter-up').counterUp();
        });

    });




    /*-----------------
    sticky
    -----------------*/
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 85) {
            $('header').addClass('navbar-fixed-top');
        } else {
            $('header').removeClass('navbar-fixed-top');
        }
    });

    
    /*----------------------------
     SmartMenu Nav
    ------------------------------ */
    $('#dfoodyMenu').smartmenus({
        subMenusSubOffsetX: 6,
        subMenusSubOffsetY: -8
    });

    $(function() {
        var $mainMenuState = $('#dfoodyMenu-state');
        if ($mainMenuState.length) {
            // animate mobile menu
            $mainMenuState.change(function(e) {
                var $menu = $('#dfoodyMenu');
                if (this.checked) {
                    $menu.hide().slideDown(250, function() {
                        $menu.css('display', '');
                    });
                } else {
                    $menu.show().slideUp(250, function() {
                        $menu.css('display', '');
                    });
                }
            });
            // hide mobile menu beforeunload
            $(window).on('beforeunload unload', function() {
                if ($mainMenuState[0].checked) {
                    $mainMenuState[0].click();
                }
            });
        }
    });

    
    
    /*-----------------
    scroll-up
    -----------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>',
        easingType: 'linear',
        scrollSpeed: 1500,
        animation: 'fade'
    });


    
    /**================================ 
    Countdown 
    ================================**/
    $('.countdown').countdown('2020/5/1', function(event) {
        $('#cday').html(event.strftime('%D <span id="clabel"><br>Days</span>'));
        $('#chour').html(event.strftime('%-H <span id="clabel"><br>Hours</span>'));
        $('#cminute').html(event.strftime('%M <span id="clabel"><br>Minutes</span>'));
        $('#csec').html(event.strftime('%S <span id="clabel"><br>Seconds</span>'));
    });

    /*---------------------
    smooth scroll
    --------------------- */
    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;

        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - 80
        }, 1200);
    });

    
    /*---------------------
    WOW
    --------------------- */
    if ($('.wow').length > 0) {
        var wowSel = 'wow';
        var wow = new WOW({
            boxClass: wowSel,
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: function(box) {

            },
            scrollContainer: null
        });
        wow.init();
    }
    

    /*---------------------
    Search Box JS
    --------------------- */
   

    $('.searchIcon').on('click', function() {
        $('.hSearchBox').removeClass('hide');
        $('.hSearchBox').toggleClass('active');
    });

    
    $(document).on('click', function (e) {
        if ($(e.target).closest(".hSearchBox.active").length === 0) {
            if ($(e.target).closest(".searchIcon").length === 0) {
                $('.hSearchBox').addClass('hide');
            }
        }
    });

    /*---------------------
    User Box JS
    --------------------- */
    // $('.userIcon').on('click', function() {
    //     $('.user-dpandel').toggleClass('active');
    // });

    

    // Quantity Increment Decrement JS
    var incrementPlus;
    var incrementMinus;

    var buttonPlus = $(".cart-qty-plus");
    var buttonMinus = $(".cart-qty-minus");

    var incrementPlus = buttonPlus.click(function() {
        var $n = $(this)
            .parent(".button-inc-dec")
            .parent(".cartinc-dec")
            .find(".qty");
        $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function() {
        var $n = $(this)
            .parent(".button-inc-dec")
            .parent(".cartinc-dec")
            .find(".qty");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount - 1);
        }
    });




    /*---------------------
    owl carousel
    --------------------- */

    // Popular Food Carousel
    function popular_food_carousel() {
        var owl = $(".popular-food-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: false,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }
    popular_food_carousel();


    // Testimonial Carousel
    function testimonial_carousel() {
        var owl = $(".testimonial-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: false,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            center: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                }
            }
        });
    }
    testimonial_carousel();


    // Testimonial Carousel 2
    function testimonial2_carousel() {
        var owl = $(".testimonial2-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 20,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 3
                }
            }
        });
    }
    testimonial2_carousel();

    


    


    /*---------------------
        Youtube Player JS
    --------------------- */
    $(window).on('load', function() {
        if ($('.play-1, .play-2').length > 0) {
            $(".play-1, .play-2").yu2fvl();
        }
    });






    
     /*---------------------
    Contact Form
    --------------------- */
    $('.cf-msg').hide();
    $('form#cf button#submit').on('click', function() {

        var firstName = $('#firstName').val();
        var email = $('#email').val();
        var subjectName = $('#subjectName').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
            alert('Please enter valid email');
            return false;
        }

        firstName = $.trim(firstName);
        subjectName = $.trim(subjectName);
        email = $.trim(email);
        msg = $.trim(msg);

        if (firstName != '' && email != '' && msg != '') {
            var values = "firstName=" + firstName + "&subjectName=" + subjectName + "&email=" + email + " &msg=" + msg;
            $.ajax({
                type: "POST",
                url: "assets/php/mail.php",
                data: values,
                success: function() {
                    $('#firstName').val('');
                    $('#subjectName').val('');
                    $('#email').val('');
                    $('#msg').val('');

                    $('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.cf-msg').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')
        }
        return false;
    });



    // // RTL Switcher
    // $('.psg-icon').on('click', function(){
    //     $(this).parent().toggleClass('active');
    // });




    /*---------------------
    // Cart Box
    --------------------- */
    
    (function() {
        $(document).on('click', function() {
          var $item = $(".shopping-cart");
          if ($item.hasClass("active")) {
            $item.removeClass("active");
          }
        });
      
        $(".shopping-cart").each(function() {
          var delay = $(this).index() * 50 + "ms";
          $(this).css({
            "-webkit-transition-delay": delay,
            "-moz-transition-delay": delay,
            "-o-transition-delay": delay,
            "transition-delay": delay
          });
        });
        $("#cart").on('click',function(e) {
          e.stopPropagation();
          $(".shopping-cart").toggleClass("active");
        });
      
        $("#addtocart").on('click',function(e) {
          e.stopPropagation();
          $(".shopping-cart").toggleClass("active");
        });
      })();
      
}(jQuery));

//set button id on click to hide first modal
$("#login").on( "click", function() {
    $('#loginModal').modal('hide');  
    $('#consult').modal('show');  
});
//trigger next modal
$("#register").on( "click", function() {
    $('#consult').modal('hide');  
    $('#loginModal').modal('show');  
});

// Quantity
$(document).ready(function(){
    $('.count').prop('disabled', true);
       $(document).on('click','.plus',function(){
        $('.count').val(parseInt($('.count').val()) + 1 );
    });
    $(document).on('click','.minus',function(){
        $('.count').val(parseInt($('.count').val()) - 1 );
            if ($('.count').val() == 0) {
                $('.count').val(1);
            }
        });
 });