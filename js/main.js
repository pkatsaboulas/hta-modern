$(function(){

    var $window       = $(window),    
        fsImg         = $('.img-fs'),
        startwidth    = 640, 
        startheight   = 360,
        ratio         = startheight/startwidth,
        imagewidth    = $(this).width(),
        imageheight   = $(this).height(),
        browserwidth  = $window.width(),
        browserheight = $window.height();

    $window.on('resize', function(){ 
        
        imagewidth    = $(this).width();
        imageheight   = $(this).height();
        browserwidth  = $window.width();
        browserheight = $window.height();
                    
        fsImage();  
                        
    });

    function fsImage(){
     
        if ((browserheight/browserwidth) > ratio){
            fsImg.height(browserheight);
            fsImg.width(browserheight / ratio);
        } else {
            fsImg.width(browserwidth);
            fsImg.height(browserwidth * ratio);
        };
        fsImg.css('left', (browserwidth - fsImg.width())/2);
        fsImg.css('top', (browserheight - fsImg.height())/2);

    };
    fsImage();  

    var raf           = requestAnimationFrame;
    var lastScrollTop = $window.scrollTop();

    if (raf) {
        loop();
    }

    function loop() {

        var scrollTop = $window.scrollTop();
        var y         = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');
        var bottom    = $window.height() + scrollTop == $(document).height();

        if (lastScrollTop === scrollTop) {
            raf(loop);
            return;
        } else {
            lastScrollTop = scrollTop;
            raf(loop);
        }

        if( y == 'down' && scrollTop > 100 ){
            $('header').addClass('hide');
        } else{
            $('header').removeClass('hide');
        }
        lastScrollTop = scrollTop;

        if(scrollTop > 0){
            $('.scroll-cue').addClass('hide');
        }
        if ( bottom ){
            $('header').removeClass('hide');
        }

    }

    // Scrolling animation stuff
    var scrollTime = 1.2;
    var scrollDistance = 200;

    $window.on("mousewheel", function(event){

        event.preventDefault();

        var delta       = event.originalEvent.wheelDelta/120;
        var scrollTop   = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta*scrollDistance) * 3;
        
        TweenMax.to($window, scrollTime, {
            scrollTo : { y: finalScroll, autoKill:true },
            ease: Power1.easeOut,
            overwrite: 5                         
        });

    });


});


