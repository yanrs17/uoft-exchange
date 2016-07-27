$(document).ready(function() {

    $('section').hide();
    $('#home').show();



    $(window).resize(function()
    {
       if ($(window).width() >= 768) {
            stickyNav();

            $(window).scroll(function() {
                stickyNav();
            });
        }
    });

    // TODO Maybe it is already signed in.
    // $('#alreadySignedIn').hide();

    // var auth2 = gapi.auth2.getAuthInstance();
    // if (auth2.isSignedIn.get()) {
    //     console.log("haha");
    //     $('#unSignedIn').hide();
    // }

    // hamburgerMenu();
    // displayMenu();


    // $(window).resize(function() {
    //     displayMenu();
    //     hamburgerMenu();
    //     showMenu();
    // });

});

// function hamburgerMenu() {
//     if ($(window).width() <= 480){

//         if ($("nav.navbar button#hamburger-menu").length === 0){
//             var $button = $("<button>", {
//                 id: 'hamburger-menu',
//                 text: 'Menu',
//                 display: 'block'
//             }).click(function(){
//                 $("nav.navbar ul").toggleClass("open");
//             }).appendTo('nav.navbar');
//         }

//         $("nav.navbar").attr('id', "hamburgerMenu");
//     } else {
//         $("nav.navbar").attr('id', "hamburgerMenu");

//         if ($("nav.navbar button#hamburger-menu").length > 0) {
//             $("nav.navbar button#hamburger-menu").remove();
//         }
//     }
// }

// function displayHamburger() {
//     if ($(window).width() <= 480){
//         $("nav.navbar ul").hide();
//     }
// }

// function displayMenu() {
//     if ($(window).width() <= 480){
//         $('nav.navbar button#hamburger-menu').click(function() {
//             $("nav.navbar ul").show();
//         })
//     }
// }

// function showMenu() {
//     if ($(window).width() > 480){
//         $("nav.navbar ul").show();
//     }
// }

$('#btn-home').click(function() {
    $('section').hide();
    $('#home').show();
    $('#profile').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-books').click(function() {
    $('section').hide();
    $('#search-books').show();
    $('#profile').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-courses').click(function() {
    $('section').hide();
    $('#search-courses').show();
    $('#profile').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-feedback').click(function() {
    $('section').hide();
    $('#feedback').show();
    $('#profile').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-contact').click(function() {
    $('section').hide();
    $('#contact').show();
    $('#profile').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-signup').click(function() {
    $('section').hide();
    $('#profile').hide();
    $('#signup').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-profile').click(function() {
    $('section').hide();
    $('#userProfile').show();
    $('.errmsg').hide();
    $('.msg').hide();
});

$('#btn-profile').click(function() {
    getProfile();
});



function stickyNav(){
    var navPosition = $('#navbar').position();
    var scrollTop = $(window).scrollTop();

    if (scrollTop > navPosition.top) {
        $('#navbar').addClass('sticky');
    } else {
        $('#navbar').removeClass('sticky');
    }
};

function getProfile() {
    $.ajax(
    {
        url: "profile",
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            if (data.length > 0) {
                var $container = $("<section>", {id: "container", class: "menu-item"});
                var $title1 = $("<h2>", {id: "info"});
                $title1.text("Imformation: ");
                var $title2 = $("<h2>", {id: "offerbook"});
                $title2.text("Offer Books: ");
                var $title3 = $("<h2>", {id: "offercourse"});
                $title3.text("Offer Course: ");
                var $paragraph1 = $("<p>", {id: "profileparagraph"});
                var $linebreak = $("<br>");
                $container.append($title1);
                $paragraph1.append("Email: " + data[0][0].email + "<br>" +
                                    "Phone: " + data[0][0].phone + "<br>" +
                                    "Year of Study: " + data[0][0].year_of_study + "<br>" +
                                    "Major: " + data[0][0].major);
                $container.append($paragraph1);

                $container.append($title2);
                if (data.length > 1) {
                    var $paragraph2 = $("<p>", {id: "profileparagraph"});
                    for (var i = 0; i < data[1].length; i++) {
                        $paragraph2.append("Course: " + data[1][i].title + "<br>" +
                                            "Section: " + data[1][i].sect + "<br>" +
                                            "Department: " + data[1][i].dept + "<br>" +
                                            "Code: " + data[1][i].num);
                        $paragraph2.append("<hr>");
                    }
                    $container.append($paragraph2);
                }

                $container.append($title3);
                if (data.length > 2) {
                    var $paragraph3 = $("<p>", {id: "profileparagraph"});
                    for (var j = 0; j < data[2].length; j++) {
                        $paragraph3.append("Title: " + data[2][j].title + "<br>" +
                                            "Author: " + data[2][j].author + "<br>" +
                                            "Publisher: " + data[2][j].publisher + "<br>"
                                            );
                        $paragraph3.append("<hr>");
                    }
                    $container.append($paragraph3);
                }
                $container.insertBefore($("footer"));

            } else {
                var $paragraph =  $("<p></p>", {id: "404"});
                $paragraph.text("404 Not Found!")
                $('body').append($paragraph);
            }
        }
    });
}


// Google Login:
// Source: https://developers.google.com/identity/sign-in/web/sign-in
// The following code is used to check
// if the user has signed in for Google
// var auth2 = gapi.auth2.getAuthInstance();
// if (auth2.isSignedIn.get()) {
//     // Statements
// }

// Google SignIn
// function onSignIn(googleUser) {
//     var auth2 = gapi.auth2.getAuthInstance();
//     if (auth2.isSignedIn.get()) {
//         $.ajax(
// 		{
// 			url: "/googlelogin",
// 			method: "GET",
//
//             success: function(data) {
//
//                 $('#alreadySignedIn').show();
//                 $('#unSignedIn').hide();
//                 var profile = auth2.currentUser.get().getBasicProfile();
//                 $('#greeting').html("Hi, " + profile.getEmail());
//
//                 $("#email").html("Email: " + profile.getEmail());
//                 $("#phone").html("Phone: " + ""); // Empty for now
//                 $("#year_of_study").html("");
//                 $("#major").html();
//                 $("#is_admin").html();
//                 console.log('ID: ' + profile.getId());
//                 console.log('Full Name: ' + profile.getName());
//                 console.log('Given Name: ' + profile.getGivenName());
//                 console.log('Family Name: ' + profile.getFamilyName());
//                 console.log('Image URL: ' + profile.getImageUrl());
//                 console.log('Email: ' + profile.getEmail());
//                 location.reload();
//             }
// 		});
//
//     }
// }
// Google SignOut
// function signOut() {
//     $.ajax(
//     {
//         url: "/googlelogout",
//         method: "GET",
//         success: function(data) {
//             var auth2 = gapi.auth2.getAuthInstance();
//             auth2.signOut().then(function () {
//                 console.log('User signed out.');
//             });
//         }
//     });
//
// }
