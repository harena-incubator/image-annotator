class Annotation{
    constructor(){
        console.log("cheguei");
        this.start = this.start.bind(this);
        this._annotate = this._annotate.bind(this);
        this._choosing = this._choosing.bind(this);
        this.clicked = false;
        this.first = 1;
    }
    start(){
        console.log("cheguei");
        MessageBus.ext.subscribe("control/annotate",this._annotate);
        this.menu = document.querySelector(".vertical-menu");
        this.select = document.querySelector("#typeChoice");
        this.select.addEventListener("change",this._choosing);
        this.button = document.querySelector("#save");
        this.menu.removeChild(this.button);
        this.formDiv = document.createElement("div");
        this.formDiv.setAttribute("id","formDiv");
        this.input = document.createElement("input");
        this.input.setAttribute("type","text");
        this.formDiv.appendChild(this.input);
        this.menu.appendChild(this.formDiv);
        this.choiceDiv = document.createElement("div");
        this.choice = document.createElement("select");
        this.choiceDiv.appendChild(this.choice);
        this.menu.appendChild(this.button);
    }
    _annotate(){
        if (!this.clicked){
            this.menu.style.visibility = "visible";
            this.clicked = true;
        }else{
            this.menu.style.visibility = "hidden";
            this.clicked = false;
        }
    }
    _choosing(){
        this.menu.removeChild(this.button);
        let chosen = this.select.selectedIndex;
        let options = this.select.options;
        let optionChosen;
        if(chosen !== undefined)
            optionChosen = options[chosen];
        console.log(optionChosen);
        if(optionChosen.value === "vocabulary"){
            this.menu.removeChild(this.formDiv);
            if(this.first){
                let option;
                for (let i = 0; i < Annotation.vocabulary.length;i++){
                    option = document.createElement("option");
                    option.text = Annotation.vocabulary[i];
                    option.value = Annotation.vocabulary[i].toLowerCase;
                    this.choice.add(option);
                }
                this.first = 0;
            }
            this.menu.appendChild(this.choiceDiv);
        }else{
            this.menu.removeChild(this.choiceDiv);
            this.menu.appendChild(this.formDiv);
        }
        this.menu.appendChild(this.button);
    }
}

(function() {
    Annotation.instance = new Annotation();
    Annotation.vocabulary = ["Pericardits", "Infarct","Arrhythmia"];
})();