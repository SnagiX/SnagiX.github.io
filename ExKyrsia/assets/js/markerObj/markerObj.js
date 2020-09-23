
class MarkerObj {

    // CONSTRUCTOR //

    constructor(marker, debug = false) {

        // Marker:
        this.marker = marker;
        // Debug state:
        this.debugState = debug;

        this._debugShow("| INFO | New marker");
        this._debugShow(marker);

        // Node childs container:

        this.childNodes = {};

        // And put a-entities into this container:
        
        this.childNodes = marker.getElementsByTagName("a-entity");

        // Show childNodes of marker:

        this._debugShow("| INFO | ChildNodes:");
        this._debugShow(this.childNodes);
        
    }

    // Changing object's properties:

        // Zoom:
        // 
        // Flags:
        //
        //  type : bool      1 - zoom in; 0 - zoom out
        //  scale : dict (x, y, z)
        zoom(type = 1, scale = {x: 0.4, y: 0.4, z: 0.4}) {

            // Debug:
            this._debugShow(`| ZOOM | trigger was activated (${this.marker.title})`);
            
            // Zoom type:
            
            let mtype = "IN";

            // type toggler:
            if (type == 0) {
                mtype = "OUT";
                scale.x *= -1;
                scale.y *= -1;
                scale.z *= -1;
            }

            this._debugShow(`| ZOOM | method: ${mtype}`);

            let prepared = this.childNodes[0].getAttribute("scale");
            scale.x += prepared.x;
            scale.y += prepared.y;
            scale.z += prepared.z;

            this.childNodes[0].setAttribute("scale", scale);
            this._debugShow(`| ZOOM | Done!`);
        }

    // Private functions:

        // Debug show:

        _debugShow(el) {
            if (this.debugState == false) return 0;
            console.log(el);
            return 1;
        }
}