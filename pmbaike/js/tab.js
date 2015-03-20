
    var $c = $('.tab-box'),
        $tabs = $c.find('.tab'),
        $tabC = $c.find('.tab-content');

    $tabs.on('click', function(){
        var $curTab = $(this),
            idx = $curTab.index();
        $curTab.addClass('active').siblings().removeClass('active');
        $tabC.removeClass('active').eq(idx).addClass('active');
    });

