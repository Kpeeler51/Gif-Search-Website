// Wait until the DOM is fully loaded before running JavaScript
$(document).ready(()=>{

    // default search function disabled. Instead term searched will
    // become searchTerm and amount of gifs requested will become gifCount.
    $(".search-form").submit(()=>{
        $(".gifcontainer").empty();
        event.preventDefault();
        let searchTerm = $("#gifinput").val();
        let gifCount = $("#numberinput").val();
        
        // .ajax requests searchTerm and gifCount from the Giphy API.
        //.done() function is used to handle the response.
        //.each() function loops through the response data and appends each GIF to the HTML.
        // The image is also given an alt attribute containing the GIF's alt text from giphy API.
        $.ajax({
            url:
            `https://api.giphy.com/v1/gifs/search?api_key=ZeZBqIUsPLa69oSOp4pDTgvbAiw5S29F&q=${searchTerm}&limit=${gifCount}&lang=en&bundle=messaging_non_clips&rating=r`
        })
        .done((response) => {
            let gifData = response.data;
            $.each(gifData, (_i, e)=>{
                let gifImg= e.images.original.webp
                let gifAlt = e.alt_text
                $(".gifcontainer").append(`
                    <img class="flex-grid-item js-image-copy" src="${gifImg}" 
                    alt="gif of ${gifAlt}"/>
                    `)
            })

        })
    })

    // When user clicks on a GIF, it's copied to clipboard.
    // The user is alerted when text is copied to the clipboard.
    $(document).on('click', '.js-image-copy', function () {
        const imageUrl = $(this).attr('src');

        navigator.clipboard.writeText(imageUrl).then(function () {
            alert('Image link copied to clipboard: ' + imageUrl);
        }).catch(function (err) {
            console.error('Failed to copy image link: ', err);
        });
    });
})