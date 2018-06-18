// Scrape Button Handler
$(document).on('click', '.scraper', function( event ) {

    event.preventDefault();

    $.get('/scrape')
        .then( () => console.log('Hold tight, scraping for Articles...') );
});