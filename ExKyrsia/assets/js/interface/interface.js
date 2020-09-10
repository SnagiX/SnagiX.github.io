class Interface {

    fa_icons = {
        tag: "i",
        class_root: "fa",
        class: {
            leave: "fa-chevron-circle-left",
            menu: "fa-bars",
            
        }
    }

    constructor(container) {
        this.container = container;
        this.ScrollReveal = ScrollReveal();
        this.body = document.querySelectorAll("body")[0];
        // Exceptions container:
        this.exceptions = {};
    }

    // Exceptions:

    interfaceException(flag, message) {
        switch (flag) {
            case "INIT_INTERFACE":
                this.exceptions.INIT_INTERFACE = 1;
            break;
            case "MENU_SYSTEM":
                this.exceptions.MENU_SYSTEM = 1;
            break;
            default:
                this.exceptions.GENERAL = 1;
            break;
        }
        console.error("Interface exception -", message);
    }
    
    // Args for drawMenu:
    // INIT_INTERFACE   - set basic functional for user (leave)
    // MENU_SYSTEM      - menu when markers are not detected (fullscreen, reload page)
    // MENU_OBJECT      - menu when only one marker was detected
    // MENU_OBJETS      - menu when objects more than two

    drawMenu(args = []) {
        if (this.exceptions.GENERAL === 1) throw console.error("Interface exception - unknown error");
        if (args.includes("INIT_INTERFACE") && this.exceptions.INIT_INTERFACE !== 0) {
            this._initInterface();
        } else if (args.includes("MENU_SYSTEM") && this.exceptions.MENU_SYSTEM !== 0) {
            this._menuSystem();
        }
    }

        // returns: bool (0 || 1)
        //
        // Args for _deleteMenuElements:
        // REMOVE_CLASSES       - delete classes of root DOM tag
        // REMOVE_ID            - delete id of root DOM tag

        _deleteMenuElements(element, flags = [], dict = {}) {
            if (typeof element != "object") return 0;

            // removing childNodes:

            element.innerHTML = "";
            
            // Remove some attributes from DOM tag:

            switch (flags) {
                case flags.includes("REMOVE_CLASSES"):
                    element.classList.setAttribute("class", "");
                    break;
                case flags.includes("REMOVE_ID"):
                    element.setAttribute("id", "");
                    break;
            }

            return 1;
        }

        _menuSystem() {
            
            // right container:
            
            var menu_right = document.getElementsByClassName("menu-container_right")[0];
                if (typeof menu_right == "undefined") {
                    throw this.interfaceException("MENU_SYSTEM", "incorrect class name or class doesn't exists");
                } else {

                    // delete everything before:

                    if(this._deleteMenuElements(menu_right) != 1) {
                        throw this.interfaceException("MENU_SYSTEM", "cannot clear elements in "+menu_right);
                    }

                }
                
                // draw system menu:

                var menu_root_btn = document.createElement("div");
                    menu_root_btn.classList.add("menu-container__element_root");
                    menu_root_btn.innerHTML += `<i ar-button__menu_main class="fa fa-bars"></i>`;

                    menu_right.appendChild(menu_root_btn);
                
        }

        _initInterface() {
                        
            //Create menu containers (left & right):
            var menu_left = document.createElement("div");
                menu_left.classList.add("ar-interface__menu-container");
                menu_left.classList.add("menu-container_left");
                
                // leave button:

                var leave_button = document.createElement("div");
                    leave_button.innerHTML += `<i class="fa fa-chevron-circle-left"></i>`;
                    leave_button.setAttribute("class", "menu-container__element_root css-interface-leave");

                    menu_left.appendChild(leave_button);

                this.container.appendChild(menu_left);
            
            var menu_right = document.createElement("div");
                menu_right.classList.add("ar-interface__menu-container");
                menu_right.classList.add("menu-container_right");
                menu_right.setAttribute("isopened", "false");

            this.container.appendChild(menu_right);

        }

        _generate_token(length) {
            // edit the token allowed characters
            var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
            var b = [];  
            for (var i=0; i<length; i++) {
                var j = (Math.random() * (a.length-1)).toFixed(0);
                b[i] = a[j];
            }
            return b.join("");
        }



    showTitle(marker = document.createElement()) {

        if (typeof marker.title == "null") return 0;
        
        var token = this._generate_token(16);

        var textbox = document.createElement("div");
            textbox.classList.add("ar-title");
            textbox.setAttribute("token", token);
            textbox.style.visibility = false;

            var box = document.createElement("div");
                box.classList.add("ar-title__box");
                box.innerHTML += `<h2 class="ar-title__title"><span class="badge">${marker.title}</span></h2>`;

                textbox.appendChild(box);
            

            // this.body.insertBefore(textbox, this.body.firstChild);
            this.body.appendChild(textbox);


        // ANIMATION

        ScrollReveal().destroy();

        function afterRevealFunc() {
            setTimeout(() => {
                textbox.remove();
            }, 1500);
        }

        ScrollReveal().reveal(`.ar-title[token="${token}"]`, {
            delay: 1,
            scale: 0,
            distance: '100px',
            duration: 500,
            afterReveal: afterRevealFunc,
        });
    }
}


{/* <div class="ar-interface__menu-container menu-container_left" isopened="false">
    <div class="menu-container__element_root css-interface-leave">
        <i class="fa fa-chevron-circle-left"></i>
    </div>
</div>

<div class="ar-interface__menu-container menu-container_right" isopened="false">
    <div class="menu-container__element_root">
        <i ar-button__menu_main class="fa fa-bars"></i>
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
</div> */}