$(window).scroll(function(){
    if($(document).scrollTop() > 50) {
        $("header").css("background-color","black")
    }  
    else{
        $("header").css("background-color","transparent")
    }
});



var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 1.3,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 30,
    slideToClickedSlide: true,
    autoplay: true,
    autoplaySpeed: 1000,
    loop: true
});



$(document).ready(function(){
    $(".home_css").click(function(){
        $(".home_css").css("color","rgb(186,159,93)")
        $(".home_css").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css").click(function(){
        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not4, .home_css_not5, .home_css_not6").css("color","white")
        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not4, .home_css_not5, .home_css_not6").css("border-bottom","none")
    })


    $(".home_css_not1").click(function(){
        $(".home_css_not1").css("color","rgb(186,159,93)")
        $(".home_css_not1").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css_not1").click(function(){
        $(".home_css").css("color","white")
        $(".home_css").css("border-bottom","none")

        $(".home_css_not2, .home_css_not3, .home_css_not4, .home_css_not5, .home_css_not6").css("color","white")
        $(".home_css_not2, .home_css_not3, .home_css_not4, .home_css_not5, .home_css_not6").css("border-bottom","none")
    })


    $(".home_css_not2").click(function(){
        $(".home_css_not2").css("color","rgb(186,159,93)")
        $(".home_css_not2").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css_not2").click(function(){
        $(".home_css").css("color","white")
        $(".home_css").css("border-bottom","none")

        $(".home_css_not1, .home_css_not3, .home_css_not4, .home_css_not5, .home_css_not6").css("color","white")
        $(".home_css_not1, .home_css_not3, .home_css_not4, .home_css_not5, .home_css_not6").css("border-bottom","none")
    })


    $(".home_css_not3").click(function(){
        $(".home_css_not3").css("color","rgb(186,159,93)")
        $(".home_css_not3").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css_not3").click(function(){
        $(".home_css").css("color","white")
        $(".home_css").css("border-bottom","none")

        $(".home_css_not1, .home_css_not2, .home_css_not4, .home_css_not5, .home_css_not6").css("color","white")
        $(".home_css_not1, .home_css_not2, .home_css_not4, .home_css_not5, .home_css_not6").css("border-bottom","none")
    })


    $(".home_css_not4").click(function(){
        $(".home_css_not4").css("color","rgb(186,159,93)")
        $(".home_css_not4").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css_not4").click(function(){
        $(".home_css").css("color","white")
        $(".home_css").css("border-bottom","none")

        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not5, .home_css_not6").css("color","white")
        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not5, .home_css_not6").css("border-bottom","none")
    })
    

    $(".home_css_not5").click(function(){
        $(".home_css_not5").css("color","rgb(186,159,93)")
        $(".home_css_not5").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css_not5").click(function(){
        $(".home_css").css("color","white")
        $(".home_css").css("border-bottom","none")

        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not4, .home_css_not6").css("color","white")
        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not4, .home_css_not6").css("border-bottom","none")
    })


    $(".home_css_not6").click(function(){
        $(".home_css_not6").css("color","rgb(186,159,93)")
        $(".home_css_not6").css("border-bottom","2px solid rgb(186,159,93)")
    })
    $(".home_css_not6").click(function(){
        $(".home_css").css("color","white")
        $(".home_css").css("border-bottom","none")

        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not4, .home_css_not5").css("color","white")
        $(".home_css_not1, .home_css_not2, .home_css_not3, .home_css_not4, .home_css_not5").css("border-bottom","none")
    })
})




particlesJS
("particles-js", 
{"particles":
{"number":
{"value":400,"density":
{"enable":true,"value_area":800}
},
"color":{"value":"#fff"},
"shape":{"type":"circle",
"stroke":{"width":0,"color":"#000000"},
"polygon":{"nb_sides":5},
"image":{"src":"img/github.svg","width":100,"height":100}
},
"opacity":{"value":0.5,"random":true,
"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}
},
"size":{"value":10,"random":true,
"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}
},
"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},
"move":{"enable":true,"speed":6,"direction":"bottom","random":false,"straight":false,"out_mode":"out","bounce":false,
"attract":{"enable":false,"rotateX":600,"rotateY":1200}
}
},
"interactivity":{"detect_on":"canvas",
"events":{"onhover":{"enable":true,"mode":"bubble"},
"onclick":{"enable":true,"mode":"repulse"},"resize":true
},
"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},
"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},
"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},
"remove":{"particles_nb":2}
}
},"retina_detect":true});
var count_particles, stats, update; stats = new Stats; stats.setMode(0); 
stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; 
stats.domElement.style.top = '0px'; 
document.body.appendChild(stats.domElement); 
count_particles = document.querySelector('.js-count-particles'); 
update = function() 
{ stats.begin(); 
    stats.end(); 
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) 
    { 
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; 
    } 
    requestAnimationFrame(update); 
}; 
requestAnimationFrame(update);;