// Interface:
var _interface = new Interface();

document.addEventListener("DOMContentLoaded", () => {
    
    _interface.init(document.querySelector(".ar-interface"));

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

AFRAME.registerComponent("eventsmarker", {
    init: function () {

        var marker = this.el;
        marker.setAttribute('emitevents', 'true');

        // Events:

            marker.addEventListener('markerFound', function () {
                // console.log(marker);
                
                // Modules:

                    // Interface:
                    _interface.showTitle(marker);
                        
            });

            marker.addEventListener('markerLost', function () {

            });
    }
});

document.addEventListener("click", (e) => {
    let el = e.target;

    // Interface functions:

    _interface.btnClickEvent(el);
})