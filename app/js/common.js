$(function() {

    vex.defaultOptions.className = 'vex-theme-flat-attack';

    $('.popup').on('click', function(){
        vex.dialog.alert({
            message: "OK",
        });
    });
});
