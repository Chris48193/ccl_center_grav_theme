// Loop through each trigger element
$(".box_trigger").on("click", function() {
    // Get the value of the data-open attribute
    var dataOpenValue = $(this).data("open");
    
    // If data-open value exists
    if (dataOpenValue) {
        // Find the element with corresponding id and display (or hide) it
        $("#" + dataOpenValue).toggle();

        // Deactivate any other element
        $(".box_trigger").each(function() {
            if ($(this).data("open") != dataOpenValue) {
                $(this).removeClass("active");

                $("#" + $(this).data("open")).css("display", "none");
            }
        })

        // Add or remove the "active" class to the element
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");

            // Scroll to the element
            var offsetTop = $("#" + dataOpenValue).offset().top;

            console.log(offsetTop);
            
            // Animate scrolling to the target element
            $('html, body').animate({
                scrollTop: offsetTop - 100
            }, 700); // Adjust the duration as needed
        }
    }
});