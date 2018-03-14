// Array of Tv Shows.
var topics = ["Parks and Recreation", "Brooklyn Nine-Nine", "Scrubs", "Arrested Development", "The Office", "How I Met Your Mother",];
// Convenience variables/jQuery selectors.
var btnHolder = $("#btn-holder");
var giphHolder = $("#giph-holder");

// Function for rendering buttons from 'topics' array.
function renderBtn() {
    btnHolder.empty();
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button type='button' class='btn btn-primary btn-group m-2'>");
        btn.addClass("tv");
        btn.attr("name", topics[i]);
        btn.text(topics[i]);
        btnHolder.append(btn);
    }
}

// Function for changing gif from static to dynamic. The function looks at the end of the 'src' attribute and changes it ('_s.gif' => '.gif').
function toggleGiph() {
    var imageStateStill = $(this).attr("src");
    if (imageStateStill.endsWith("200_s.gif")) {
        $(this).attr('src', imageStateStill.replace(/_s.gif/, ".gif"));
    } else if (imageStateStill.endsWith("200.gif")) {
        $(this).attr('src', imageStateStill.replace(/.gif/, "_s.gif"));
    }
}

// Function makes an AJAX request and then takes the response and loops through the array of gifs that are returned from the response and 'prints' them to the page.
function giphyDisplay() {
    var tvShow = $(this).attr("name");
    var apiKey = "eAFKeOjlTldUvzjggovAVPjRKowwoyai";
    var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + tvShow + "&api_key=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        giphHolder.empty();
        for (var j = 0; j < response.data.length; j++) {
            var tvFig = $("<figure class='figure'>");
            var tvRating = $("<figcaption class='figure-caption'>");
            var tvGiph = $("<img class='img-fluid mr-3 mb-3'>");
            tvRating.text("Rating: " + response.data[j].rating);
            tvGiph.attr("src", response.data[j].images.fixed_height_still.url);
            tvFig.append(tvGiph);
            tvFig.append(tvRating);
            giphHolder.prepend(tvFig);
        }
    })
}

// Renders initiail 'starter' buttons
renderBtn();

// Event listeners for when the buttons and gif are clicked
$(document).on("click", ".tv", giphyDisplay);
$(document).on("click", "img", toggleGiph);
$(document).on("click", "#addBtn", function (event) {
    event.preventDefault();
    if ($("#userInput").val().trim() === null || $("#userInput").val().trim() == "") {
        alert("Enter TV Show");
    } else {
        topics.push($("#userInput").val().trim());
        renderBtn();
    }
})


