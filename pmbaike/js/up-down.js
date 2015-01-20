

var Updown = {

    init: function(){
        this.$c = $(document)
        this.$b = $('body');
        this.$top = $('.to-top');
        this.$bottom = $('.to-bottom');
        this.bind();
    },

    bind: function(){
        this.$top.on('click', $.proxy(this.goToTop, this));
        this.$bottom.on('click', $.proxy(this.goToBottom, this));
        this.$top.on('mouseover', $.proxy(this.scrollUp, this));
        this.$bottom.on('mouseover', $.proxy(this.scrollDown, this));
        this.$top.on('mouseleave', $.proxy(this.scrollStop, this));
        this.$bottom.on('mouseleave', $.proxy(this.scrollStop, this));
        this.$c.on('scroll',  $.proxy(this.scroll, this));
    },

    goToTop: function(){
        clearInterval(this.timer);
        this.$b.animate({scrollTop: '0px'}, 800);
    },
    goToBottom: function(){
        clearInterval(this.timer);
        this.$b.animate({scrollTop:this.$c.height()}, 800);
    },
    scrollUp: function(){     
        clearInterval(this.timer);
        var curTop = this.$c.scrollTop();
        this.timer = setInterval(function(){
          curTop -= 1;
          $(document).scrollTop(curTop);           
        } ,50);
    },
    scrollDown: function(){
        clearInterval(this.timer);
        var curTop = this.$c.scrollTop();
        this.timer = setInterval(function(){
        curTop += 1;
        $(document).scrollTop(curTop);           
      } ,50);
    },
    scrollStop: function(){
        clearInterval(this.timer);
    },
    scroll: function(){
        var scrollTop = this.$c.scrollTop();
        if(scrollTop > 150){
            this.$top.fadeIn(500);
        }else{
            this.$top.fadeOut(500);
        }
    }

};

Updown.init();
