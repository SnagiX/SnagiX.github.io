class Interface {

    constructor(container) {
        this.container = container;
        this.ScrollReveal = ScrollReveal();
        this.body = document.querySelectorAll("body")[0];
        console.log(this.container);
    }
    
    // Args for drawMenu:
    // INIT_INTERFACE   - set basic functional for user (leave)
    // MENU_SYSTEM      - menu when markers are not detected (fullscreen, reload page)
    // MENU_OBJECT      - menu when only one marker was detected
    // MENU_OBJETS      - menu when objects more than two

    drawMenu(args = []) {
        if (args.includes("INIT_INTERFACE")) {
            this._initInterface();
        } else if (args.includes("MENU_SYSTEM")) {
            this._menuSystem();
        }
    }

    _menuSystem() {
        
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


{/* <div class="ar-interface__menu-container menu-container_left">
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