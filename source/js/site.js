import $ from 'jquery'
import { Foundation } from 'foundation-sites/js/foundation.core'
import { Sticky } from 'foundation-sites/js/foundation.sticky'
import { Reveal } from 'foundation-sites/js/foundation.reveal'
import { Box } from 'foundation-sites/js/foundation.util.box'
import { Keyboard } from 'foundation-sites/js/foundation.util.keyboard'
import { Motion } from 'foundation-sites/js/foundation.util.motion'
import { Nest } from 'foundation-sites/js/foundation.util.nest'
import { MediaQuery } from 'foundation-sites/js/foundation.util.mediaQuery'
import { Triggers } from 'foundation-sites/js/foundation.util.triggers'
import { Toggler } from 'foundation-sites/js/foundation.toggler'
import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu'
import { AccordionMenu } from 'foundation-sites/js/foundation.accordionMenu'
import { ResponsiveMenu } from 'foundation-sites/js/foundation.responsiveMenu'
import { Accordion } from 'foundation-sites/js/foundation.accordion'
import 'scss/site.scss'
import 'featherlight/src/featherlight'
import 'featherlight/src/featherlight.gallery'

// AccordionMenu.defaults.parentLink = true

Foundation.addToJquery($)

Foundation.Box = Box
Foundation.Keyboard = Keyboard
Foundation.Motion = Motion
Foundation.Nest = Nest
Foundation.MediaQuery = MediaQuery
Foundation.Triggers = Triggers
Foundation.Sticky = Sticky

Foundation.plugin(Toggler, 'Toggler')
Foundation.plugin(Sticky, 'Sticky')
Foundation.plugin(DropdownMenu, 'DropdownMenu')
Foundation.plugin(AccordionMenu, 'AccordionMenu')
Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu')
Foundation.plugin(Reveal, 'Reveal')
Foundation.plugin(Accordion, 'Accordion')

$(document).foundation()

$('a[rel="lightbox"]').featherlightGallery()

$.featherlightGallery.prototype.afterContent = function () {
    var text = this.$currentTarget.find('img').attr('title'),
        caption = this.$instance.find('.featherlight-caption')

    if (caption.length == 0) {
        $('<div class="featherlight-caption u-mt-s">')
            .html(text)
            .appendTo(this.$instance.find('.featherlight-content'))
    } else {
        caption.html(text || '')
    }
}

//Back to Top

$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#top-button').fadeIn(); 
        } else { 
            $('#top-button').fadeOut(); 
        }
    }); 
    $('#top-button').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});

// Loading page logic
var loadingContainer = document.getElementById("loader-container");
var websiteContainer = document.getElementById("wrapper");

document.addEventListener("DOMContentLoaded", function() {
    
    window.addEventListener("load", function() {

        if (window.location.pathname === "/") {
            setTimeout(function() {
                websiteContainer.style.opacity = "1";
                loadingContainer.classList.add("loaded");
            }, 100);

            setTimeout(function() {
                loadingContainer.style.display = "none";
            }, 1000);
        } else {
            websiteContainer.style.opacity = "1";
            loadingContainer.style.display = "none";
        }
    });
});

// Will remove overlay after 40secs for users that cannnot load properly.
setTimeout(function() {
    websiteContainer.style.opacity = "1";
    loadingContainer.style.display = "none";
}, 40000);