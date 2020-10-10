$(document).ready(function () {
    $(".menu").click(function (event) {
        if( event.which == 1 || event.which == 2 ) {
            let link_to_redirect = $(this).children(".title-text").children('a').attr('href')
            console.log(link_to_redirect);
            document.location.href = link_to_redirect;
        }
    });
    $(".dialog").click(function () {
        let link_to_red = $(this).children(".title-text-dialogs").children('a').attr('href');
        console.log(link_to_red);
        document.location.href = link_to_red;
    })

});