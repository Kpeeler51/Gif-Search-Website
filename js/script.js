$(document).ready(()=>{
    let apikey = "placeholderkey";
    $(".search-form").submit(()=>{
        event.preventDefault();
        let searchTerm = $("#searchinput").val();
        
        $.ajax({
            url:
            `https://api.giphy.com/v1/gifs/search?api_key=ZeZBqIUsPLa69oSOp4pDTgvbAiw5S29F&q=${searchTerm}&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        })
        .done((response) => {
            let gifData = response.data;
            $.each(gifData, (i, e)=>{
                let gifImg= e.images.fixed_width.webp
                $(".gifcontainer").append(`
                    <img class = "col" src="${gifImg}" 
                    alt="gif of ${searchTerm}"/>
                    `)
            })

        })
    })
})