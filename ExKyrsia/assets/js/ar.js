 
document.addEventListener("DOMContentLoaded", () => {
        
});

AFRAME.registerComponent("eventsmarker", {
    init: function () {

        // Modules:

            // Interface:
            var interface = new Interface(document.querySelector(".ar-interface"));
            interface.container = document.querySelector(".ar-interface");
            interface.drawMenu(["INIT_INTERFACE"]);
            interface.drawMenu(["MENU_SYSTEM"]);

            ScrollReveal().reveal('.ar-interface', {
                delay: 50,
                distance: '70px',
                reset: true,
                duration: 500,
                interval: 150,
                scale: 0.8
            });

        var marker = this.el;
        marker.setAttribute('emitevents', 'true');

        // Events:

            marker.addEventListener('markerFound', function () {
                // console.log(marker);
                
                // Modules:

                    // Interface:
                    interface.showTitle(marker);
                        
            });

            marker.addEventListener('markerLost', function () {

            });
    }
});