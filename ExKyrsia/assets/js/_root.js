// 'use strict';

// import * as _$interface from './interface/interface.js';

// console.log(_$interface.hdi());

// var _interface = new _$interface.Interface();

///////////////
// Variables //
///////////////

var main = {};

///////////////
// Functions //
///////////////

document.addEventListener("click", (e) => {

    // Actions by f-button functions:

    if (e.target.hasAttribute("f-button")) {
        console.log(e.target.getAttribute("f-button"));
        switch (e.target.getAttribute("f-button")) {

            // display:

                //fulscreen:
                case "display_fullscreen":
                    let icon = document.querySelector("i.fa[f-button=display_fullscreen]");
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                        icon.classList.remove("fa-compress");
                        icon.classList.add("fa-expand");
                    } else {
                        document.documentElement.requestFullscreen();

                        icon.classList.remove("fa-expand");
                        icon.classList.add("fa-compress");
                    }
                break;
                case "page_reload":
                    location.reload();
                break;
        }
    }

    // group_buttons

    if (e.target.hasAttribute("ar-button__menu_main")) {
        let menu_right = document.querySelectorAll("div.ar-menu__right.ar-menu_main>div[ar-button__content]");
        // console.log(menu_right);
        for (let i in menu_right) {
            if (typeof menu_right[i] == "number") break;
            menu_right[i].classList.toggle("ar-button_hidden");
        }
        let icon = document.querySelector("i.fa[ar-button__menu_main]");
        console.log(icon);
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times-circle");
    }
});

// Title toggler
function titleToggler(container, text, action = "show", text_content = "") {
    if (action == "show") {
        if (container.classList.contains("d-none")) container.classList.remove("d-none");
        text.innerHTML = text_content;
        container.style.opacity = 0
        container.animate([
            {opacity: 0},
            {opacity: 1}
        ], 350);
        container.style.opacity = 1;
        setTimeout(() => {
            if (container.classList.contains("d-none")) {
                container.style.opacity = 0
            } else {
                container.animate([
                    {opacity: 1},
                    {opacity: 0}
                ], 350);
            }
            
            setTimeout(() => {
                container.style.opacity = 0;
                container.classList.add("d-none");
            }, 350);
        }, 1500);
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                if (container.classList.contains("d-none")) {
                    container.style.opacity = 0;
                    return;
                }
            }, 10);
        }
    } else if (action == "hide") {
        container.classList.add("d-none");
        container.style.opacity = 0;
    }
}

///////////////////////
// AFRAME components //
///////////////////////

AFRAME.registerComponent("markerevents", {
    init: function () {
        var marker = this.el;
        marker.setAttribute('emitevents', 'true');   

        if (typeof window.main.statistics != "object") {
            window.main.statistics = {
                scansRealTime: 0,
                scansTotal: 0
            };
        }

        marker.addEventListener('markerFound', function () {

            // statistics
            window.main.statistics.scansRealTime += 1;
            window.main.statistics.scansTotal += 1;

            // menu
            if (window.main.statistics.scansRealTime == 1) {
                document.querySelector("div.ar-menu__right.ar-menu_main").classList.toggle("d-none");
                document.querySelector("div.ar-menu__right.ar-menu_object").classList.toggle("d-none");
            }
            
            //Title
            titleToggler(
                document.querySelector("div.ar-title__box"), 
                document.querySelector("h2.ar-title__title"), 
                "show",
                marker.getAttribute("title")
            );

        });
        marker.addEventListener('markerLost', function () {

            // statistics
            window.main.statistics.scansRealTime -= 1;

            // menu
            if (window.main.statistics.scansRealTime <= 0) {
                document.querySelector("div.ar-menu__right.ar-menu_main").classList.toggle("d-none");
                document.querySelector("div.ar-menu__right.ar-menu_object").classList.toggle("d-none");
            }

            //Title
            titleToggler(document.querySelector("div.ar-title__box"), document.querySelector("h2.ar-title__title"), "hide");
        });
    }
});