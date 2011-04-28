myApp = function(params) {
    Ori.App.call(this);
    this.init(params);
};

myApp.prototype = new Ori.App;
myApp.prototype.constructor = myApp;

myApp.prototype.init = function(params) {
        this.domRoot = params.domRoot;

        this.canvas = new Ori.Canvas({});
        this.canvas.setSize(window.innerWidth, window.innerHeight);
        Ori.input.trackMouseOn(this.canvas.domElement);

        if (this.canvas.type) {
            this.domRoot.innerHTML = "";
            this.domRoot.append(this.canvas.domElement);
        }

        Ori.input.register(Ori.KEY.A, "LEFT");
        Ori.input.register(Ori.KEY.D, "RIGHT");
        Ori.input.register(Ori.KEY.S, "DOWN");
        Ori.input.register(Ori.KEY.W, "UP");

        // TODO : shorten
        this.camera = new THREE.Camera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.init({ eye : { x: 0.0, y: 0.0, z: -17 } });


//        Ori.audio.data.play();

        this.components = [];
        scene = new THREE.Scene();
        scene.enabled = true;
        scene.addObject( new Planet({scale: 0.4}) );
        this.components.push( scene );

    };


myApp.prototype.update = function() {

        if (Ori.input.isDown("LEFT")) this.camera.translateNew(0.6, 0, 0);
        if (Ori.input.isDown("RIGHT")) this.camera.translateNew(-0.6, 0, 0);
        if (Ori.input.isDown("DOWN")) this.camera.translateNew(0, 0, -0.6);
        if (Ori.input.isDown("UP")) this.camera.translateNew(0, 0, 0.6);

        if (Ori.input.mouse.wheel) this.camera.translateNew(0.0, 0.0, Ori.input.mouse.z);
        if (Ori.input.mouse.b1) {
            x = Ori.input.mouse.x;
            y = Ori.input.mouse.y;
            pitch = (y - Ori.input.drag.y) * 0.005;

            yaw = (x - Ori.input.drag.x) * -0.005;
            if (model.currentPos == "Earth") {
                this.camera.rotateY(yaw);
            } else {
                this.camera.rotateUp(yaw);
            }

            this.camera.rotateRight(pitch);

            Ori.input.drag.x = x;
            Ori.input.drag.y = y;
        }

    };


myApp.prototype.draw = function() {
        this.canvas.clear();
        for (i in this.components) {
            component = this.components[i];
            if (component.enabled) { console.log(component); this.canvas.render(component, this.camera); }
        }
    };

myApp.prototype.resize = function() {
        width = window.innerWidth;
        height = window.innerHeight;
        this.camera.setAspect(width / height);
        this.canvas.setSize(width, height);
    };



    app = new myApp({domRoot: $("#mainBox")});
    window.onresize = function(e) { app.resize(e) };
    app.run();

