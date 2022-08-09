(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    loadProducts();
    
})(jQuery);


function loadProducts(){    
    $.get("data/data.json", function(data){
        $.each(data, function(i,v){
            console.log(i);
            var idContainer = `#${i}-container`;
            var content = "";
            $.each(v, function(ix, vx){
                content += itmeProduct(vx);
            });
            

            $(idContainer).html(content);
        });
    });
}
function itmeProduct(itemProduct){
    var item = `<div class='col-xl-3 col-lg-4 col-md-6'>`;
    item += `	<div class='product-item'>`;
    item += `		<div class='position-relative bg-light overflow-hidden'>`;
    item += `			<img class='img-fluid w-100' src='${itemProduct.img}' alt=''>`;
    if(itemProduct.isNew){
        item += `			<div class='bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3'>New</div>`;
    }
    item += `		</div>`;
    item += `		<div class='text-center p-4'>`;
    item += `			<a class='d-block h5 mb-2' href='#'>${itemProduct.nombre}</a>`;
    item += `			<span class='text-primary me-1'>$${itemProduct.precio}</span>`;
    item += `			<span class='text-body text-decoration-line-through'>$${itemProduct.precioNormal}</span>`;
    item += `		</div>`;
    item += `		<div class='d-flex border-top'>`;
    item += `			<small class='w-50 text-center border-end py-2'>`;
    item += `				${itemProduct.clave}`;
    item += `			</small>`;
    item += `			<small class='w-50 text-center py-2'>`;
    item += `				<a class='text-body' target='_blank' href='https://api.whatsapp.com/send?phone=5215562137156&text=Me%20interesa%20su%20producto%3A%20${itemProduct.clave}'><i class='fa fa-shopping-bag text-primary me-2'></i>Comprar</a>`;
    item += `			</small>`;
    item += `		</div>`;
	item += `  </div>`;
    item += `</div>`;

    return item;

    /*
    <div class="col-xl-3 col-lg-4 col-md-6">
                            <div class="product-item">
                                <div class="position-relative bg-light overflow-hidden">
                                    <img class="img-fluid w-100" src="img/product-7.jpg" alt="">
                                    <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                </div>
                                <div class="text-center p-4">
                                    <a class="d-block h5 mb-2" href="">Fresh Tomato</a>
                                    <span class="text-primary me-1">$19.00</span>
                                    <span class="text-body text-decoration-line-through">$29.00</span>
                                </div>
                                <div class="d-flex border-top">
                                    <small class="w-50 text-center border-end py-2">
                                        <a class="text-body" href=""><i class="fa fa-eye text-primary me-2"></i>View detail</a>
                                    </small>
                                    <small class="w-50 text-center py-2">
                                        <a class="text-body" href=""><i class="fa fa-shopping-bag text-primary me-2"></i>Add to cart</a>
                                    </small>
                                </div>
                            </div>
                        </div>
    */
}