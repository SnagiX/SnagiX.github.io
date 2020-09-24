
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
        // Attributes:
        //
        //  type : bool             1 - zoom in; 0 - zoom out
        //  scale : dict (x, y, z)
        //  max : int               max scale of object(s)
        // 
        // zoom(type = 1, scale = {x: 0.2, y: 0.2, z: 0.2}, max = 1) {
        zoom ({
            type = 1,
            scale = {
                x: 0.2, 
                y: 0.2, 
                z: 0.2
            },
            max = {
                x: 1,
                y: 1,
                z: 1
            }
        }) {

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

            Math.sign(scale.x) == -1 ? scale.x = prepared.x : false;
            Math.sign(scale.y) == -1 ? scale.y = prepared.y : false;
            Math.sign(scale.z) == -1 ? scale.z = prepared.z : false;

            // Check for maximum size of marker:

            max.x <= scale.x ? scale.x = prepared.x : false;
            max.y <= scale.y ? scale.y = prepared.y : false;
            max.z <= scale.z ? scale.z = prepared.z : false;

            this.childNodes[0].setAttribute("scale", scale);
            this._debugShow(`| ZOOM | Done!`);
        }

    // Private functions:

        // Debug show:

        _debugShow(el) {
            if (this.debugState == false) return 0;

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + " @ "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds();

            console.log("| MARKEROBJ ", `${datetime} |`, el);
            return 1;
        }
}