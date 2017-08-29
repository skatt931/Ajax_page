$(function() {

    //Declare variables
    let showHtmlPopup = $('.showHtmlPopup');
    let showFirstItems = $('.showFirstItems');
    let showDataInTable = $('.showDataInTable');
    let showImageSlider= $('.showImageSlider');

    vex.defaultOptions.className = 'vex-theme-flat-attack';

    //First popup, showing content from another html page.
    showHtmlPopup.on('click', function contentFromHtml(){
       let l = $('.content').load('content.html div', function (data) {
           vex.dialog.alert({
               unsafeMessage: data,
           });
           console.log(data);
       });
    });

    //Second popup, showing first 10 items from people.json


});
