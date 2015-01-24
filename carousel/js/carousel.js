function Carousel($carousel){
  this.init($carousel);
}
Carousel.prototype = {
  init: function($carousel){
    this.attachEl($carousel);
    this.bind();
    this.autoPlay();
  },
  
  attachEl: function($carousel){
    var $c = this.$c = $carousel;
    this.$img = $c.find('.images');
    this.$prev = $c.find('.prev');
    this.$next = $c.find('.next');
    this.$nav = $c.find('.nav-circles')
    this.$circle = $c.find('.circle');
      
    this.imgW = this.$img.find('a').outerWidth(true);
    this.timer;
    this.interval = 3000;
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
    }, me.interval);
  }
   
};

