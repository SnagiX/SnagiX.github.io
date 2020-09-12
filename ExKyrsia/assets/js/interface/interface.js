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

        //Create SYSTEM menu containers (left & right):
        var menu_left = document.createElement("div");
            menu_left.classList.add("ar-interface__menu-container");
            menu_left.classList.add("menu-container_left");
        
            // leave button:

            var leave_button = document.createElement("div");
                leave_button.innerHTML += `<i class="fa fa-chevron-circle-left" f-interface="leave"></i>`;
                leave_button.setAttribute("class", "menu-container__element_root css-interface-leave");

                // Set function to this button: 

                leave_button.setAttribute("f-interface", "leave");

                //Write variable in nodeList:

                this.nodeList.leave_button = leave_button;

                // Append created DOM obj.:

                menu_left.appendChild(leave_button);

        //Write variable in nodeList:

        this.nodeList.menu_left = menu_left;

        // Append created DOM obj.:

        this.nodeList.container.appendChild(menu_left);


    
        var menu_right = document.createElement("div");
            menu_right.classList.add("ar-interface__menu-container");
            menu_right.classList.add("menu-container_right");
            menu_right.setAttribute("isopened", "false");

            // Bars button:

            var bars_button = document.createElement("div");
                bars_button.innerHTML += `<i class="fa fa-dot-circle" f-interface="menutoggler"></i>`;
                bars_button.setAttribute("class", "menu-container__element_root");

                // Set function to this button: 

                bars_button.setAttribute("f-interface", "menutoggler");

                //Write variable in nodeList:

                this.nodeList.bars_button = bars_button;

                // Append created DOM obj.:

                menu_right.appendChild(bars_button);
        
        //Write variable in nodeList:

        this.nodeList.menu_right = menu_right;

        // Append created DOM obj.:

        this.nodeList.container.appendChild(menu_right);

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
            console.log(this.nodeList);
            var bars_button = this.nodeList.bars_button;

            var bars_button_icon = bars_button.children;
                if (bars_button.children.length != 1) return;
                bars_button_icon = bars_button.children[0];

                bars_button_icon.setAttribute("class", "fa fa-bars");
            
        }

        //Marker menu:
        _markerMenu() {
            var bars_button = this.nodeList.bars_button;
            
            var bars_button_icon = bars_button.children;
                if (bars_button.children.length != 1) return;
                bars_button_icon = bars_button.children[0];

                bars_button_icon.setAttribute("class", "fa fa-cube");
        }

}