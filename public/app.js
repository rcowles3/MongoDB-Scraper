// Grab the articles as a json object
$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        // Display the articles information on the page
        $(".articles").append(
            // "<div class=" 
            "<div data-id='" + data[i]._id + "' class='card'>" +
            "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
            "<div class='card-body'>" +
            "<h4 class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
            "<p class='card-text'>" + data[i].description + "</p>" +
            "<a href='" + data[i].link + "'>Link Full Article ></>" + "<br>" + "<br>" +
            "<button id='saveBtn' class='btn btn-outline-primary my-2 my-sm-0' type='submit'>Save Articles" + "</button>" +
            "</div>" +
            "</div>" + "<br>"
        );
    }
});

// Whenever button to scrape sports data is clicked, render those articles
$(document).on("click", "#scrapeBtn", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function () {
        location.reload();
    })
});