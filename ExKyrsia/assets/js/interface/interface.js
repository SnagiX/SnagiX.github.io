class Interface {

    // Container with DOM tags (Nodes):
    nodeList = {}

    // Exceptions container:
    exceptions = {}

    // Marker container:
    markers = []

    
    // MAIN CONSTRUCTOR

    constructor(container = "") {
        //Some code here (in future)
        this.nodeList.container = container;

    }

    //Init interface with system functionality:
    init(container) {

        this.nodeList.body = document.getElementsByTagName("body")[0];

        this.nodeList.container = container;

        container.innerHTML += `
        <div class="ar-interface__menu-container menu-container_left" isopened="false">
            <div class="menu-container__element_root css-interface-leave" f-interface="leave">
                <i class="fa fa-chevron-circle-left" f-interface="leave"></i>
            </div>
        </div>

        <div class="ar-interface__menu-container menu-container_right" menutype="system" isopened="false" style="display: flex">
            <div class="menu-container__element_root" f-interface="menutoggler">
                <i ar-button__menu_main class="fa fa-bars" f-interface="menutoggler"></i>
            </div>
            <div class="menu-container__element" f-interface="fullscreentoggler">
                <i ar-button__menu_main class="fa fa-expand" f-interface="fullscreentoggler"></i>
            </div>
            <div class="menu-container__element" f-interface="reloadpage">
                <i ar-button__menu_main class="fa fa-sync-alt" f-interface="reloadpage"></i>
            </div>
        </div>
        
        <div class="ar-interface__menu-container menu-container_right" menutype="marker" isopened="false" style="display: none">
            <div class="menu-container__element_root" f-interface="menutoggler">
                <i ar-button__menu_main class="fa fa-cube" f-interface="menutoggler"></i>
            </div>
            <div class="menu-container__element_list" isopened="false" listid="1">
                <div class="element-item_root" f-interface="menulisttoggler">
                    <i class="fa fa-cog" f-interface="menulisttoggler"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-search-plus"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-search-minus"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-undo"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-redo-alt"></i>
                </div>
            </div>
            <div class="menu-container__element_list" isopened="false" listid="2">
                <div class="element-item_root" f-interface="menulisttoggler">
                    <i class="fa fa-info-circle" f-interface="menulisttoggler"></i>
                </div>
                <div class="element-item" f-interface="showtitle">
                    <i class="fa fa-heading" f-interface="showtitle"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-user-circle"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-align-center"></i>
                </div>
            </div>
        </div>
        
        <div class="ar-interface__menu-container menu-container_right" menutype="markers" isopened="false" style="display: none">
            <div class="menu-container__element_root">
                <i ar-button__menu_main class="fa fa-cubes"></i>
            </div>
            <div class="menu-container__element_list">
                <div class="element-item_root">
                    <i class="fa fa-cog"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-search-plus"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-search-minus"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-undo"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-redo-alt"></i>
                </div>
            </div>
            <div class="menu-container__element_list">
                <div class="element-item_root">
                    <i class="fa fa-info-circle"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-heading"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-user-circle"></i>
                </div>
                <div class="element-item">
                    <i class="fa fa-align-center"></i>
                </div>
            </div>
        </div>
        `;

        //Add to nodeList three containers:

        this.nodeList.menu_system = document.querySelector("div.ar-interface__menu-container[menutype=system]");
        this.nodeList.menu_marker = document.querySelector("div.ar-interface__menu-container[menutype=marker]");
        this.nodeList.menu_markers = document.querySelector("div.ar-interface__menu-container[menutype=markers]");

        // Hide menu and lists of menu:
        const prepared = ["div.menu-container__element_root[f-interface=menutoggler]", "div.element-item_root[f-interface=menulisttoggler]"]
        var type = "container";

        prepared.forEach(e => {
            const arr = document.querySelectorAll(e);
            arr.forEach(e => {
                this._menuToggler(type, e);
                this._menuToggler(type, e);
            });
            type = "list";
        });
    }

    // Marker menu (val : str ("system" || "marker" || "markers" (unavailable)):
    
    markerMenu(val) {
        switch (val) {
            case "system":
                this._systemMenu();
                break;

            case "marker":
                this._markerMenu();
                break;
        
            case "markers":

                break;
            default:
                return;
        }
    }

    currentMarker(marker) {
        this.markers.unshift(marker);
        return;
    }

    // Vibration:

    vibrate(ms) {
        if("vibrate" in navigator)  return navigator.vibrate(ms);
        if("oVibrate" in navigator)  return navigator.oVibrate(ms);
        if("mozVibrate" in navigator)  return navigator.mozVibrate(ms);
        if("webkitVibrate" in navigator)  return navigator.webkitVibrate(ms);
        return;
    }

    //Show title function:

    showTitle(marker) {
        // ScrollReveal().destroy();
        if (typeof marker.title == undefined) return 0;
        
        var token = this._generate_token(16);

        var textbox = document.createElement("div");
            textbox.style.opacity = 0;
            textbox.classList.add("ar-title");
            textbox.setAttribute("token", token);

            textbox.innerHTML += `
                <div class="ar-title__box">
                    <h2 class="ar-title__title"><span class="badge">${marker.title}</span></h2>
                </div>
            `;
            
            this.nodeList.body.appendChild(textbox);

        // Animating textBox:

        ScrollReveal().reveal(textbox, {
            scale: 0,
            distance: '100px',
            duration: 300,
            reset: false,
            beforeReveal: () => {
                textbox.style.opacity = 1;    
            },
            afterReveal: () => {
                setTimeout(() => {
                    textbox.animate([
                        {opacity: 1},
                        {opacity: 0}
                    ], 350);
                    setTimeout(() => {
                        textbox.remove();
                    }, 350);
                }, 1500);
            },
        });
    }

    // EVENTS:

        // Click:

        btnClickEvent(el) {
            if (el.hasAttribute("f-interface") == false) return;
            
            var func = el.getAttribute("f-interface");

            switch (func) {
                case "leave":
                    history.go(-1);
                break;
                case "showtitle":
                    this.markers.forEach(e => {
                        this.showTitle(e);
                    });
                break;
                case "fullscreentoggler":
                    this._fullScreenToggler();
                break;
                case "reloadpage":
                    location.reload();
                break;
                case "menutoggler":
                    this._menuToggler("container", el);
                break;
                case "menulisttoggler":
                    this._menuToggler("list", el);
                break;
            }
        }



    // Private zone - private functions:

    //Generating unique tokens:

    _generate_token(length) {
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-+=!.,$#^&*(){}[]|".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    // Some methods for markerMenu:

        //System menu:
        _systemMenu() {
            this.nodeList.menu_markers.style.display = "none";
            this.nodeList.menu_marker.style.display =  "none";
            this.nodeList.menu_system.style.display =  "flex";
        }

        //Marker menu:
        _markerMenu() {
            this.nodeList.menu_markers.style.display = "none";
            this.nodeList.menu_marker.style.display =  "flex";
            this.nodeList.menu_system.style.display =  "none";
        }

        //Markers menu:
        _markersMenu() {
            this.nodeList.menu_markers.style.display = "flex";
            this.nodeList.menu_markers.style.display =  "none";
            this.nodeList.menu_system.style.display =  "none";
        }

    //Fullscreen toggle:
    _fullScreenToggler() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen(); 
          }
        }
      }

    // MenuToggler:
    //
    // Menu Toggler's method:
    // Attributes:
    // type : str ("container" || "list")
    // el : obj (DOM element)
    _menuToggler(type = "container", el = document.createElement()) {
        var parentNode = el.parentNode;
        if (parentNode.hasAttribute("isopened") == false) parentNode = parentNode.parentNode;

        const prepared = type == "list" ? "div.element-item" : "div.menu-container__element, div.menu-container__element_list";

        var childs = parentNode.querySelectorAll(prepared);
        
        const attr = parentNode.getAttribute("isopened");
        const display = attr == "true" ? "none" : "flex";
        const time = 200;
        const opacity = attr == "true" ? 1 : 0;

        const isOpenedCondition = attr == "true" ? "false" : "true";

        childs.forEach(e => {
            e.style.opacity = opacity;
            if (display == "flex") e.style.display = display;

            e.animate([
                {opacity: opacity},
                {opacity: (opacity == 0 ? 1 : 0)}
            ], time);
            setTimeout(() => {
                e.style.opacity = (opacity == 0 ? 1 : 0);
                if (display == "none") e.style.display = display;
            }, time);
        });
        parentNode.setAttribute("isopened", isOpenedCondition);
    }
}