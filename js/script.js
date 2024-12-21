$(document).ready(()=>{

    let apikey = "placeholderkey";

    $(".search-form").submit(()=>{
        $(".gifcontainer").empty();
        event.preventDefault();
        let searchTerm = $("#gifinput").val();
        let gifcount = $("#numberinput").val();
        
        $.ajax({
            url:
            `https://api.giphy.com/v1/gifs/search?api_key=ZeZBqIUsPLa69oSOp4pDTgvbAiw5S29F&q=${searchTerm}&limit=${gifcount}&lang=en&bundle=messaging_non_clips&rating=r`
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
    $(document).on('click', '.js-image-copy', function () {
        const imageUrl = $(this).attr('src');

        navigator.clipboard.writeText(imageUrl).then(function () {
            alert('Image link copied to clipboard: ' + imageUrl);
        }).catch(function (err) {
            console.error('Failed to copy image link: ', err);
        });
    });
})