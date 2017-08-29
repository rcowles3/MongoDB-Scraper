// Grab the articles as a json object
$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        // Display the articles information on the page
        $(".articles").append(
            // "<div class=" 
            "<div data-id='" + data[i]._id + "' class='card'>" +
            "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
            "<div class='card-body'>" +
            "<h4 id='articleTitle' class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
            "<p id='articleDesc' class='card-text'>" + data[i].description + "</p>" +
            "<a href='" + data[i].link + "'>Link Full Article ></a>" + "<br>" + "<br>" +
            "<button data-id='" + data[i]._id + "' id='saveBtn' class='btn btn-outline-primary my-2 my-sm-0' type='submit'>Save Articles" + "</button>" +
            "</div>" +
            "</div>" + "<br>"
        );
    }
});

// Grab the articles as a json object
$.getJSON("/articles/saved", function (data) {
    
        for (var i = 0; i < data.length; i++) {
            // Display the articles information on the page
            $(".articlesSaved").append(
                // "<div class=" 
                "<div data-id='" + data[i]._id + "' class='card'>" +
                "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
                "<div class='card-body'>" +
                "<h4 id='articleTitle' class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
                "<p id='articleDesc' class='card-text'>" + data[i].description + "</p>" +
                "<a href='" + data[i].link + "'>Link Full Article ></a>" + "<br>" + "<br>" +
                "<button data-id='" + data[i]._id + "' id='saveBtn' class='btn btn-outline-primary my-2 my-sm-0' type='submit'>Save Articles" + "</button>" +
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

// When someone clicks to save an article, render the saved articles
$(document).on("click", "#saveBtn", function () {

    var thisId = $(this).attr("data-id");
    
    console.log("Article Saved ID: \n\n", thisId);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("articleTitle").val(),
            description: $("articleDesc").val()
        }
    }).done(function (data) {
        console.log(data);
    
    })
});