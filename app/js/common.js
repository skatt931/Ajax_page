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
            let output = `<ul>`;
            $.each(data, function (key, val) {
                if( key < 10 ){
                    output += `<li>`;
                    output += `An employee ${val.name || 'name'} provides great job as ${val.position || 'position'}. Even if ${val.name || 'name'} is only ${val.age || 'age'} years old, he/she has a lot of experiences.
						His/Her supervisor mentioned following note about him/she: ${val.note || '"there is no notes"'}`;
                    output += `</li>`;
                }
            })
            output += '</ul>'
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
            let output = `<table id="myTable" border="1">`;
                output += '<thead><tr><th>Name</th><th >Position</th><th>Age</th><th>Note</th></tr></thead><tbody>';
                $.each(data, function (key, val) {
                    output += `<tr data-item="${item++}">`;
                    output += `<td data-name>${val.name || 'name'}  </td> <td data-position>${val.position || 'position'}  </td> <td data-age>${val.age || 'age'}  </td>  <td data-note>${val.note || '"There is no notes"'}  </td>`;
                    output += '</tr>';
                });
            output += `</table>`;
            vex.dialog.alert({
                unsafeMessage: output,
            });
            console.log(output);

            //Sort method for Names
            $("#myTable").tablesorter();
        });

    });

});
