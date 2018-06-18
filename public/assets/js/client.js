// Scrape Button Handler
$(document).on('click', '.scraper', function( event ) {

    event.preventDefault();

    $.get('/scrape')
        .then( function(data) {

            alert(data);

            window.location.replace('/');
        });
});