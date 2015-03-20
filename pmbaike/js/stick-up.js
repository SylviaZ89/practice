
var StickUp = {

    init: function(){
        this.$c = $(document);
        this.$el = $('.contact-feed');
        this.$target = $('.tags-box');
        this.targetHeight = this.$target.offset().top + 
                        this.$target.outerHeight();
        this.bind();
    },

    bind: function(){
        this.$c.on('scroll',$.proxy(this.do, this));
    },

    do: function(){
        var scrollTop = this.$c.scrollTop();
        if(scrollTop > this.targetHeight ){
            this.stick();
        }else{
            this.cancelStick();
        }
    },

    stick: function(){
        if(this.$el.hasClass('sticked')){
            return;
        }
        this.$el.addClass('sticked').css({
            'position' : 'fixed',
            'top' : '15px',
        });
    },

    cancelStick: function(){
        this.$el.removeClass('sticked').css('position', 'static');
    }

};

StickUp.init();