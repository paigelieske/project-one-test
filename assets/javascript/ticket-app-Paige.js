$(document).ready(function(){
    $(this).scrollTop(0);
});

$("#submitbtn").on("click", function (evt) {
    evt.preventDefault();

    $("#results").empty();

    var eventName = $("#eventName").val().trim();
    eventName = eventName.toLowerCase();

    var date = $("#date");
    var eventWhen = date.val();
    eventWhen = moment(eventWhen).format("MM-DD-YYYY");

    var eventWhere = $("#city").val().trim();
    eventWhere = eventWhere.toLowerCase();

    // eventName = eventName.replace(/\s+/g, "-")
    console.log("eventName: " + eventName);
    console.log("eventWhen: " + eventWhen);
    console.log("eventWhere: " + eventWhere);

    var queryURL = "https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&q=" + eventName + "&per_page=100";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#results').html('<tbody></tbody>');

        var results = response.events;
        console.log(results.length);

        if (!results.length || !eventName) {
            $("#results").html("Your search has 0 results.  Please try again.");
            $("#eventName").val("");
            $("#date").val("");
            $("#city").val("");
            return;
        }

        for (var i = 0; i < results.length; i++) {
            var eventMainTitle = results[i].title;
            eventMainTitle = eventMainTitle.toLowerCase();

            var eventShortTitle = $("<p>").text(results[i].short_title);

            var where = results[i].venue.display_location;

            var whereValidation = results[i].venue.city;
            whereValidation = whereValidation.toLowerCase();

            var when = results[i].datetime_local;
            when = moment(when).format("MM-DD-YYYY @ h:mm A");

            var whenValidation = moment(when).format("MM-DD-YYYY");
            console.log(whenValidation);

            var ticketLink = $("<a>");
            ticketLink.attr("href", results[i].url);
            var ticketImage = $("<img src = assets/images/seatgeek.png>");
            ticketImage.addClass("seatgeek");
            ticketLink.html(ticketImage);

            if (eventMainTitle.indexOf(eventName) > -1 && whereValidation.indexOf(eventWhere) > -1 && whenValidation.indexOf(eventWhen) > -1) {
                console.log("if statement: " + whenValidation);
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $('#results tbody').append(newRow);
            }

            else if (whenValidation.indexOf(eventWhen) > -1 && !eventWhere) {
                console.log("else when statement: " + whenValidation);
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $('#results tbody').append(newRow);
            }

            else if (whereValidation.indexOf(eventWhere) > -1 && eventWhen === "Invalid date") {
                console.log("else where statement: " + whereValidation);
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $('#results tbody').append(newRow);
            }

            // else if (whereValidation.indexOf(eventWhere) < 0) {
            //     $("#results").html("Your search has 0 results.  Please try again.");
            // }

            $("#eventName").val("");
            $("#date").val("");
            $("#city").val("");
        }
    })
});

// $('body').keypress(function (e) {
//     var code = e.keyCode || e.which;

//     if (code === 13) {
//         e.preventDefault();
//         mainSearch();
//     }
// })

// $("#submitbtn").on("click", function () {
//     mainSearch();
// });

$(".localEvents").on("click", function (evt) {
    evt.preventDefault();

    var eventType = $(this).val("value");
    eventType = eventType[0].id;
    console.log(eventType);

    $(".modal").show();

    $("#zipClick").on("click", function (evt) {

        evt.preventDefault();

        var zip = $("#zipInput").val().trim();
        console.log(zip);

        $("#results").empty();

        var musicURL = "https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&taxonomies.name=" + eventType + "&geoip=" + zip + "&range=15mi&per_page=25";

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

                var ticketLink = $("<a>");
                ticketLink.attr("href", results[i].url);
                var ticketImage = $("<img src = assets/images/seatgeek.png>");
                ticketImage.addClass("seatgeek");
                ticketLink.html(ticketImage);


                if (results.length > 0 && whenFuture > when) {
                    var newRow = $("<tr>").append(
                        $("<td>").append(eventShortTitle),
                        $("<td>").append(where),
                        $("<td>").append(when),
                        $("<td>").append(ticketLink)
                    )

                    $('#results tbody').append(newRow);
                    $(".modal").hide();
                    $('html').scrollTop(0);
                }
            }
        })
    })
})

$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function () {
    $("#back2Top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});