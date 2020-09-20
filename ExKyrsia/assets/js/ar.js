// Interface:
var _interface = new Interface();

document.addEventListener("DOMContentLoaded", () => {
    
    _interface.init(document.querySelector(".ar-interface"));
    _interface.markerMenu("system");

    ScrollReveal().reveal('.ar-interface', {
        delay: 50,
        distance: '70px',
        reset: false,
        duration: 500,
        interval: 150,
        scale: 0.8,
    });
    
});

////////////
// EVENTS //
////////////

// AFRAME

AFRAME.registerComponent("eventsmarker", {
    init: function () {

        var marker = this.el;
        marker.setAttribute('emitevents', 'true');

        // Events:

            marker.addEventListener('markerFound', function () {
                
                // Modules:

                    // Interface:
                    _interface.currentMarker(marker);
                    _interface.showTitle(marker);
                    _interface.vibrate(45);
                    _interface.markerMenu("marker");
            });

            marker.addEventListener('markerLost', function () {
                // Modules:

                    // Interface:
                    _interface.markerMenu("system");

            });
    }
});

// CLICK

document.addEventListener("click", (e) => {
    let el = e.target;

    // Interface functions:

    _interface.btnClickEvent(el);
})