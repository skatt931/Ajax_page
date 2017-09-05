$(function() {

    //Declare variables
    let HtmlPopup = $('.HtmlPopup');
    let FirstItemsPopup = $('.FirstItemsPopup');
    let DataInTablePopup = $('.DataInTablePopup');
    let ImageSliderPopup= $('.ImageSliderPopup');

    vex.defaultOptions.className = 'vex-theme-flat-attack';

    //2.First popup, showing content from another html page.
    HtmlPopup.on('click', function contentFromHtml(){
       let l = $('.content').load('content.html div', function (data) {
           vex.dialog.alert({
               unsafeMessage: data,
           });
           console.log(data);
       });
    });

    //3.Second popup, showing first 10 items from people.json
    FirstItemsPopup.on('click', function showFirstItems(){
        $.getJSON('people.json', function (data) {
            let output = `<div class="cover"><ul>`;
            $.each(data, function (key, val) {
                if( key < 10 ){
                    output += `<li>`;
                    output += `An employee ${val.name || 'name'} provides great job as ${val.position || 'position'}. Even if ${val.name || 'name'} is only ${val.age || 'age'} years old, he/she has a lot of experiences.
						His/Her supervisor mentioned following note about him/she: ${val.note || '"there is no notes"'}`;
                    output += `</li>`;
                }
            })
            output += '</ul></div>'
            vex.dialog.alert({
                unsafeMessage: output,
            });
            console.log(output);
        });
    });

    //4.Third popup, showing table with data from people.json
    DataInTablePopup.on('click', function showDataInTable(){
        $.getJSON('people.json', function (data) {
            let item = 0;
            let output = `<div class="cover"><table id="myTable" border="1">`;
                output += '<thead style="cursor: pointer"><tr><th>Name</th><th >Position</th><th>Age</th><th>Note</th></tr></thead><tbody>';
                $.each(data, function (key, val) {
                    output += `<tr data-item="${item++}">`;
                    output += `<td data-name>${val.name || 'name'}  </td> <td data-position>${val.position || 'position'}  </td> <td data-age>${val.age || 'age'}  </td>  <td data-note>${val.note || '"There is no notes"'}  </td>`;
                    output += '</tr>';
                });
            output += `</table></div>`;
            vex.dialog.alert({
                unsafeMessage: output,
            });
            console.log(output);

            //Sort method for Names
            $("#myTable").tablesorter();
        });

    });

    //5.Fourth popup Image Slider Popup
    ImageSliderPopup.on('click', function showImageSliderPopup() {
        $.getJSON('slides.json', function (data) {
            var counter = 0;
            let output = `<div class="image-sliders">`;

            if(counter <= 0 ){
                if(counter >= 3) {
                    counter = 0;
                } else {
                    if(data[counter].type == 'html') {
                        output += `<div id="text-slide">${data[counter].content}</div>`;
                        output += `<img src="${data[counter].content}" class="img-fluid" id="main-img" alt="Responsive image" style="display: none">`
                    } else {
                        output += `<img src="${data[counter].content}" class="img-fluid" id="main-img" alt="Responsive image">`
                    }
                    counter++;
                }
            }
            output += `</div>`

            vex.dialog.alert({
                unsafeMessage: output,
            });

            //Selectors in modal window
            let $fluid = $('#main-img');
            let $textSlide = $('#text-slide');
            var timerID;

            //Starting slide show
            function startSlideShow() {
                timerID = setInterval(function(){
                    console.log(counter);
                    if(counter >= 0) {
                        if(counter > 3) {
                            counter = 0;
                            $textSlide.css('display', 'block');
                            $fluid.css('display', 'none');
                            counter++;
                        } else {
                            $textSlide.css('display', 'none');
                            $fluid.css('display', 'block');
                            $fluid.attr('src', data[counter++].content);
                        }
                    }
                },2000);
            }
            startSlideShow();


            //Functions to start or stop slideshow
            $('.image-sliders').mouseenter(function(){
                console.log("enter");
                clearInterval(timerID);
            });
            $('.image-sliders').mouseleave(function(){
                console.log("leave");
                startSlideShow();
            });
            $('div:not(.vex-content)').on('click', function() {
                console.log('"not" working');
                clearInterval(timerID);
            });
        });

    })

});
