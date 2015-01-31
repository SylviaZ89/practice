function Carousel($carousel,conf){
  this.init($carousel,conf);
}
Carousel.prototype = {
  init: function($carousel,conf){
    this.attachEl($carousel);
    this.conf = conf;
    this.timer;
    this.bind();
    this.autoPlay();
  },
  
  attachEl: function($carousel){
    var $c = this.$c = $carousel;
    this.$img = $c.find('.images');
    this.$prev = $c.find('.prev');
    this.$next = $c.find('.next');
    var imgLen = this.$img.children().size();
    
    this.$img.after('<ul class="nav-circles"></div>');
    this.$nav = $c.find('.nav-circles');
    for (var i = 0; i < imgLen; i++) {
      this.$nav.append('<li><a href="javascript:void(0)" class="circle"></a></li>');
    }
    this.$circle = this.$nav.find('.circle');
    this.$circle.first().addClass('active');
         
    this.imgW = this.$img.find('a').outerWidth(true);
    
  },
  
  bind: function(){
    var me = this;
    this.$img.on('mouseenter', $.proxy(this.pause, this));
    this.$img.on('mouseleave', $.proxy(this.autoPlay, this));
    this.$prev.on('click', function(){
      me.pause();
      me.goPrev();
      me.autoPlay();
    });
    this.$next.on('click', function(){
      me.pause();
      me.goNext();
      me.autoPlay();
    });
    this.$circle.on('click', function(){
      me.pause();
      var activeIdx = me.$nav.find('.active').parent().index(),
          curIdx = $(this).parent().index();
      if(activeIdx > curIdx){
        me.goPrev(activeIdx-curIdx);
      }
      if(activeIdx < curIdx){
        me.goNext(curIdx-activeIdx);
      }
      me.autoPlay();
    });
  },

  goPrev: function(i){
    i=i||1;
    var me = this;
    // if(type === 'slide'){
    //   this.slide(i);
    // }
    this.$img.css({'left': -(i*this.imgW)});
    for(var k=0; k<i; k++){
      this.$img.find('a').first().before(this.$img.find('a').last());
    }
    
    this.$img.animate({'left' : 0}, 400, function(){
      me.setNavStyle(me.$img.find('img').first().attr('data-idx'));
    });
  },
  
  goNext: function(i){
    i=i||1;
    var me = this;
    this.$img.animate({'left' : -(i*this.imgW)}, 400, function () {
      for(var k=0; k<i;k++){
        me.$img.find('a').last().after(me.$img.find('a').first());
      }     
      
      me.$img.css({'left': 0});
      me.setNavStyle(me.$img.find('img').first().attr('data-idx'));      
    });    
  },
  
  slide: function(i){

  }, 
  setNavStyle: function(idx){
    this.$circle.removeClass('active')
    .eq(idx).addClass('active');
  },
  pause: function(){
    clearInterval(this.timer);
  },
  autoPlay: function(){
    var me = this;
    me.timer = setInterval(function(){
      me.goNext();
    }, me.conf.interval);
  }
   
};

