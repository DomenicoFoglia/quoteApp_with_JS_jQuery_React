$(document).ready(function(){
    function updateSocialLinks(quote, author) {
        const text = `"${quote}" - ${author}`;
        const encoded = encodeURIComponent(text);

        $('#twitter-share').attr('href', `https://twitter.com/intent/tweet?text=${encoded}`);
        $('#facebook-share').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`);
    }


    function getQuote(){
        $.get('https://dummyjson.com/quotes/random', function (data){
            $('#text').text(`"${data.quote}"`);
            $('#author').text(`- ${data.author}`);
            updateSocialLinks(data.quote, data.author);
        }).fail(function(){
            $('#text').text("Errore nel caricamento");
            $('#author').text("");
        });
    };


    $('#copy-quote').click(function () {
        const quote = $('#text').text();
        const author = $('#author').text();
        const fullText = `${quote} ${author}`;

        navigator.clipboard.writeText(fullText).then(() => {
            const btn = $('#copy-quote');
            btn.text('Copiato!');
        });
    });


    getQuote();

    $('#new-quote').click(function(){
        getQuote();
    });

});
