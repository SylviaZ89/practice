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
    this.imgLen = this.$img.children().size();
    
    this.$img.after('<ul class="nav-circles"></div>');
    this.$nav = $c.find('.nav-circles');
    for (var i = 0; i < this.imgLen; i++) {
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
      me.move(-1);
      me.autoPlay();
    });
    this.$next.on('click', function(){
      me.pause();
      me.move(1);
      me.autoPlay();
    });
    this.$circle.on('click', function(){
      me.pause();
      var activeIdx = me.$nav.find('.active').parent().index(),
          curIdx = $(this).parent().index();
      me.move(curIdx - activeIdx);     
      me.autoPlay();
    });
  },
 
  move: function(i){
    if(i !== 0){
      if(this.conf.animType === 'slide'){
        this.slide(i);
      }
      if(this.conf.animType === 'fade'){
        this.$img.addClass('fade-layout');
        this.$img.find('a').first().css({'opacity' : 1});       
        this.fade(i);
      }
      else return;
    }
  },
 
  slide: function(i){
    var me = this;
    if(i > 0){
      this.$img.animate({'left' : -(i*this.imgW)}, 400, function () {
        for(var k=0; k<i;k++){
          me.$img.find('a').last().after(me.$img.find('a').first());
        }          
        me.$img.css({'left': 0});
        me.setNavStyle(me.$img.find('img').first().attr('data-idx'));      
      }); 
    }else{     
      this.$img.css({'left': i*this.imgW});
      for(var k=0; k>i; k--){
        this.$img.find('a').first().before(this.$img.find('a').last());
      }      
      this.$img.animate({'left' : 0}, 400, function(){
        me.setNavStyle(me.$img.find('img').first().attr('data-idx'));
      });   
    }
  },

  fade: function(i){
    var me = this;   
    if(i > 0){
      this.$img.find('a').eq(i).siblings().stop().animate({'opacity' : 0},400);
      this.$img.find('a').eq(i).stop().animate({'opacity' : 1},400,function(){        
        for(var k=0; k<i;k++){
          me.$img.find('a').last().after(me.$img.find('a').first());
        }
        me.setNavStyle(me.$img.find('img').first().attr('data-idx'));        
      }); 
         
    }else{     
      this.$img.find('a').eq(this.imgLen+i).siblings().stop().animate({'opacity' : 0},400);
      this.$img.find('a').eq(this.imgLen+i).stop().animate({'opacity' : 1},400,function(){
        for(var k=0; k>i; k--){
          me.$img.find('a').first().before(me.$img.find('a').last());
        }     
        me.setNavStyle(me.$img.find('img').first().attr('data-idx'));
      });  
    }
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
      me.move(1);
    }, me.conf.interval);
  }
   
};

