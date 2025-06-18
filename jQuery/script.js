$(document).ready(function(){
    function getQuote(){
        $.get('https://dummyjson.com/quotes/random', function (data){
            $('#text').text(`"${data.quote}"`);
            $('#author').text(`- ${data.author}`);
        });
    }
    getQuote();

    $('#new-quote').click(function(){
        getQuote();
    });

});