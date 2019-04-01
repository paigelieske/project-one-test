$("#submitbtn").on("click", function (evt) {
    evt.preventDefault();

    var queryURL;
    $("#results").empty();

    var eventName = $("#eventName").val().trim();
    eventName = eventName.toLowerCase();

    var date = $("#date");
    var eventWhen = date.val();
    eventWhen = moment(eventWhen).format("MM-DD-YYYY");

    var eventWhere = $("#city").val().trim();

    // eventWhere = eventWhere.toLowerCase();
    // eventName = eventName.replace(/\s+/g, "-")
    console.log("input: " + eventName)
    console.log("what: " + eventName);
    console.log("when: " + eventWhen);
    console.log("where: " + eventWhere);

    var queryURL = 'https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&q=' + eventName + "&per_page=50";
    var queryURL = "https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&q=" + eventName + "&per_page=50";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#results').html('<tbody></tbody>');
        var results = response.events;
        $(".results").empty();
        // $(".results").empty();
        console.log(results.length);
        console.log("blah");

        if (!results.length) {
            $("#results").text("Your search has 0 results.  Please try again.");
            return;
        }

        for (var i = 0; i < results.length; i++) {
            var eventResult = $("<table>");
            var eventMainTitle = results[i].title;
            eventMainTitle = eventMainTitle.toLowerCase();

            var eventShortTitle = $("<p>").text(results[i].short_title);
            var where = $("<p>").text(results[i].venue.display_location);
            var when = $("<p>").text(results[i].datetime_local);
            var ticketLink = $("<a>").text("Visit SeatGeek to View Tickets");

            var where = results[i].venue.display_location;

            var whereValidation = results[i].venue.city;

            var when = results[i].datetime_local;
            when = moment(when).format("MM-DD-YYYY @ h:mm A");

            var whenValidation = moment(when).format("MM-DD-YYYY");
            console.log(whenValidation);

            var ticketLink = $("<a>").text("Visit SeatGeek to View");
            ticketLink.attr("href", results[i].url);
            // $("#artist-div").append("<a href=" + response.url + "> Visit Bands in Town to see more information about " + response.name + "</a>");

            // var image = $("<img>").attr("src", results[i].performers[0].image);
            if (eventMainTitle.indexOf(eventName) > -1) {
                // $(".form").empty();
                // eventResult.html(eventShortTitle);
                // eventResult.append(where);
                // eventResult.append(when);
                // eventResult.append(ticketLink);
                // $(".row").prepend(eventResult);
                // var eventResult = $("<table>")

            // console.log(results.length);
            // console.log("blah");

            // if (eventMainTitle.indexOf(eventName) === -1) {
            //     console.log("you failed");
            // }

            if (eventMainTitle.indexOf(eventName) > -1 && whereValidation.indexOf(eventWhere) > -1 && whenValidation.indexOf(eventWhen) > -1) {
                // var table = $("<table>");
                // var tableBody = $("<tbody>");
                var newRow = $("<tr>").append(
                    $("<td>").text(eventShortTitle),
                    $("<td>").text(where),
                    $("<td>").text(when),
                    $("<td>").text(ticketLink)
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $("tbody").append(newRow);
                $(".row").prepend("table");

                // var tableData = $("tbody")
                // tableData.append(newRow)
                // $(table).append(tableBody);
                $('#results tbody').append(newRow);
                // $("#results").prepend(table);
                clearInterval(window.animate);
                $("#bdy").css("background", "#fff")
            }
            else if (eventMainTitle.indexOf(eventName) > -1 && whereValidation.indexOf(eventWhere) > -1) {
                // var table = $("<table>");
                // var tableBody = $("<tbody>");
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                // $(table).append(tableBody);
                $('#results tbody').append(newRow);
                clearInterval(window.animate);
                $("#bdy").css("background", "#fff")
            };

            // else if (eventMainTitle.indexOf(eventName) > -1 &&whenValidation.indexOf(eventWhen) > -1) {
            //     var table = $("<table>");
            //     var tableBody = $("<tbody>");
            //     var newRow = $("<tr>").append(
            //         $("<td>").append(eventShortTitle),
            //         $("<td>").append(where),
            //         $("<td>").append(when),
            //         $("<td>").append(ticketLink)
            //     )
            //     $(table).append(tableBody);
            //     $(tableBody).append(newRow);
            //     $("#results").prepend(table);
            //     clearInterval(window.animate);
            //     $("#bdy").css("background", "#fff")
            // };
        }
    })

            // $(".results > tbody").append(newRow);
            // $("#bdy").append(".results");
    $("#eventName").val("");
    $("#date").val("");
    $("#city").val("");
});

$(".localEvents").on("click", function (evt) {
    evt.preventDefault();

    var eventType = $(this).val("value");
    eventType = eventType[0].id;
    console.log(eventType);

    $("#results").empty();

    var eventWhere = $("#city").val().trim();
    console.log(eventWhere);

    var musicURL = "https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&taxonomies.name=" + eventType + "&geoip=" + eventWhere + "&range=15mi&per_page=25";

    $.ajax({
        url: musicURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $('#results').html('<tbody></tbody>');
        var results = response.events;

        for (var i = 0; i < results.length; i++) {

            var eventMainTitle = results[i].title;
            eventMainTitle = eventMainTitle.toLowerCase();

            var eventShortTitle = $("<p>").text(results[i].short_title);

            var where = results[i].venue.display_location;

            var when = results[i].datetime_local;
            when = moment(when).format("MM-DD-YYYY @ h:mm A");


            var whenFuture = moment().add(7, "days");
            whenFuture = moment(whenFuture).format("MM-DD-YYYY");
            console.log(whenFuture);

            var ticketLink = $("<a>").text("Visit SeatGeek to View");
            ticketLink.attr("href", results[i].url);

            if (results.length > 0 && whenFuture > when) {
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )

                $('#results tbody').append(newRow);
                clearInterval(window.animate);
                $("#bdy").css("background", "#fff")
            }
        }
        // $(".imageDiv").append(image);
        // $(".pure-form").append(".imageDiv");
        $("#eventName").val("");
    })

}); 
}); 