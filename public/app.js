

// Grab the articles as a json object
$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        // Display the articles information on the page
        $(".articles").append(
            // "<div class=" 
            "<div class='card'>" +
            "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
            "<div class='card-body'>" +
            "<h4 class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
            "<p class='card-text'>" + data[i].description + "</p>" +
            "<a href='" + data[i].link + "'>Link Full Article ></>" +
            "</div>" +
            "</div>" + "<br>"
        );
    }
});

// Whenever a link to the specific sport is clicked, render those articles
// $(document).on("click", "a", function () {
//     var sport = $(this).attr("id");


//     // Grab the articles as a json object
//     $.getJSON("/articles", function (data) {

//         // console.log(data);

//         for (var i = 0; i < data.length; i++) {
//             // Display the articles information on the page
//             $(".articles").append(
//                 // "<div class=" 
//                 "<div class='card'>" +
//                 "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
//                 "<div class='card-body'>" +
//                 "<h4 class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
//                 "<p class='card-text'>" + data[i].description + "</p>" +
//                 "<a href='" + data[i].link + "'>Link Full Article ></>" +
//                 "</div>" +
//                 "</div>" + "<br>"
//             );
//         }
//     });

// });