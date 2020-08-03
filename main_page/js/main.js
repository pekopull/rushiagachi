$( document ).ready(function() {
    
  $(".btn-menu").click(function(){
    let $this = $(this);
    if(! $(".btn-menu").hasClass("open")) {
      $this.next().css("display","list-item");
      $this.addClass("open");
    }
    else if($(".btn-menu").hasClass("open")) {
      $this.next().css("display","none");
      $this.removeClass("open");
    }
  });

  $(".has-second-list").click(function(){
    let $this = $(this);
    $this.find(".second-floor-in-list").slideToggle();
  })

  $(window).scroll(function(){
    var winheight = $(window).scrollTop();
    if(winheight>0){
      $(".nav-outer").css("background","#32416B");
      $(".nav-outer").addClass("scrollNav-animate");
    }
    else{
      $(".nav-outer").css("background","unset");$(".nav-outer").removeClass("scrollNav-animate");
    }
  });

  /*警告 這段jquery會吃掉網頁暫存 不建議使用*/
   $(window).resize(function(){
     if($(window).width()>1200 && $(".btn-menu").hasClass("open")) {
      $(".btn-menu").trigger('click');
      $(".ham").removeClass("active");
    }
   });
  /*警告 上段jquery會吃掉網頁暫存 不建議使用*/
  function turnLogoHeight() {
    let win = $(window).height();
    $(".firstcut_main").css("height",win);
  }
  turnLogoHeight();
});


