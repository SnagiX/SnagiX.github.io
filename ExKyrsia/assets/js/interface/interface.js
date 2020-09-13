class Interface {

    // Container with DOM tags (Nodes):
    nodeList = {}

    // Exceptions container:
    exceptions = {}

    
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
            <div class="menu-container__element_root css-interface-leave">
                <i class="fa fa-chevron-circle-left"></i>
            </div>
        </div>

        <div class="ar-interface__menu-container menu-container_right" menutype="system" isopened="false" style="display: flex">
            <div class="menu-container__element_root" f-interface="menutoggler">
                <i ar-button__menu_main class="fa fa-bars" f-interface="menutoggler"></i>
            </div>
            <div class="menu-container__element" f-interface="fullscreentoggler">
                <i ar-button__menu_main class="fa fa-expand" f-interface="fullscreentoggler"></i>
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

        //Hide menu:
        var hideArr = document.querySelectorAll("div.menu-container__element_root[f-interface=menutoggler]");
        hideArr.forEach(e => {
            this._menuToggler(e);
            this._menuToggler(e);
        });
        //Hide lists of menu:
        var hideList = document.querySelectorAll("div.element-item_root[f-interface=menulisttoggler]");
        hideList.forEach(e => {
            this._menuListToggler(e);
            this._menuListToggler(e);
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
        ScrollReveal().destroy();
        if (typeof marker.title == null) return 0;
        
        var token = this._generate_token(16);

        var textbox = document.createElement("div");
            // textbox.style.visibility = false;
            textbox.style.opacity = 0;
            textbox.classList.add("ar-title");
            textbox.setAttribute("token", token);

            var box = document.createElement("div");
                box.classList.add("ar-title__box");
                box.innerHTML += `<h2 class="ar-title__title"><span class="badge">${marker.title}</span></h2>`;

                textbox.appendChild(box);
            
            this.nodeList.body.appendChild(textbox);

        // Animating textBox:

        ScrollReveal().reveal(`.ar-title[token="${token}"]`, {
            delay: 1,
            scale: 0,
            distance: '100px',
            duration: 500,
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
                case "fullscreentoggler":
                    this._fullScreenToggler();
                break;
                case "menutoggler":
                    this._menuToggler(el);
                break;
                case "menulisttoggler":
                    this._menuListToggler(el);
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
            // console.log(this.nodeList);
            // var bars_button = this.nodeList.bars_button;

            // var bars_button_icon = bars_button.children;
            //     if (bars_button.children.length != 1) return;
            //     bars_button_icon = bars_button.children[0];

            //     bars_button_icon.setAttribute("class", "fa fa-bars");

            document.querySelector("div.ar-interface__menu-container[menutype=markers]").style.display = "none";
            document.querySelector("div.ar-interface__menu-container[menutype=marker]").style.display =  "none";
            document.querySelector("div.ar-interface__menu-container[menutype=system]").style.display =  "flex";
        }

        //Marker menu:
        _markerMenu() {
            // var bars_button = this.nodeList.bars_button;
            
            // var bars_button_icon = bars_button.children;
            //     if (bars_button.children.length != 1) return;
            //     bars_button_icon = bars_button.children[0];

            //     bars_button_icon.setAttribute("class", "fa fa-cube");


            document.querySelector("div.ar-interface__menu-container[menutype=markers]").style.display = "none";
            document.querySelector("div.ar-interface__menu-container[menutype=marker]").style.display =  "flex";
            document.querySelector("div.ar-interface__menu-container[menutype=system]").style.display =  "none";
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

    //Menu toggler (visible || invisible):
    _menuToggler(el = document.createElement()) {
        
        var parentNode = el.parentNode;

        if (parentNode.hasAttribute("isopened") == false) parentNode = parentNode.parentNode;
        var childs = parentNode.querySelectorAll("div.menu-container__element, div.menu-container__element_list");

        const attr = parentNode.getAttribute("isopened");
        const display = attr == "true" ? "none" : "flex";
        const isOpenedCondition = attr == "true" ? "false" : "true";

        for (let i in childs) {
            if (typeof childs[i] == "object") childs[i].style.display = display;
        }
        parentNode.setAttribute("isopened", isOpenedCondition);
    }

    //Menu list toggler (visible || invisible):
    _menuListToggler(el = document.createElement()) {
        
        var parentNode = el.parentNode;
        if (parentNode.hasAttribute("isopened") == false) parentNode = parentNode.parentNode;

        var childs = parentNode.querySelectorAll(`div.element-item`);

        const attr = parentNode.getAttribute("isopened");
        const display = attr == "true" ? "none" : "flex";
        const isOpenedCondition = attr == "true" ? "false" : "true";

        for (let i in childs) {
            if (typeof childs[i] == "object") childs[i].style.display = display;
        }
        parentNode.setAttribute("isopened", isOpenedCondition);
    }
}