class Annotation{
    constructor(){
        console.log("cheguei");
        this.start = this.start.bind(this);
        this._annotate = this._annotate.bind(this);
        this.clicked = false;
    }
    start(){
        console.log("cheguei");
        MessageBus.ext.subscribe("control/annotate",this._annotate);
        this.menu = document.querySelector(".vertical-menu");
    }
    _annotate(){
        console.log(this.menu);
        if (!this.clicked){
            this.menu.style.visibility = "visible";
            this.clicked = true;
        }else{
            this.menu.style.visibility = "hidden";
            this.clicked = false;
        }
    }
}

(function() {
    Annotation.instance = new Annotation();
})();