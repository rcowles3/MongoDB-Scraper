// Grab the articles as a json object
$.getJSON("/articles", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        // Display the articles information on the page
        $("#articles").append(           
            // "<div class=" 
            "<div class='card col-md-4'>" +
            "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
            "<div class='card-body'>" +
            "<h4 class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
            "<p class='card-text'>" + data[i].description + "</p>" +
            "<a href='" + data[i].link + "'>Link Full Article ></>" +
            "</div>" +
            "</div>"
        );

        //     <div class="card" style="width: 20rem;">
        //     <img class="card-img-top" src="..." alt="Card image cap">
        //     <div class="card-body">
        //       <h4 class="card-title">Card title</h4>
        //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //       <a href="#" class="btn btn-primary">Go somewhere</a>
        //     </div>
        //   </div>

    }
});