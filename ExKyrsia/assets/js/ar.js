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

        // Modules:

            // markerObj:

            var _markerObj = new MarkerObj(marker, true);

        marker.setAttribute('emitevents', 'true');

        // Events:

            marker.addEventListener('markerFound', e => {

                // Modules:

                    // Interface:
                    _interface.currentMarker(marker, "add");
                    _interface.showTitle(marker);
                    _interface.vibrate(45);
                    _interface.markers.length > 1 ? _interface.markerMenu("markers") : _interface.markerMenu("marker");

                    // markerObj:
                    _markerObj.zoom(1);
            });

            marker.addEventListener('markerLost', e => {
                // Modules:

                    // Interface:
                    _interface.currentMarker(marker, "remove");
                    _interface.markers == 0 ? _interface.markerMenu("system") : _interface.markerMenu("marker")

            });
    }
});

// CLICK

document.addEventListener("click", e => {
    let el = e.target;

    // Interface functions:

    _interface.btnClickEvent(el);

});