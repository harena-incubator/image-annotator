class Annotation{
    constructor(){
        console.log("cheguei");
        this.start = this.start.bind(this);
        this._annotate = this._annotate.bind(this);
        this._choosing = this._choosing.bind(this);
        this._save = this._save.bind(this);
        this.clicked = false;
        this.first = 1;
    }
    start(group){
        console.log("cheguei");
        MessageBus.ext.subscribe("control/annotate",this._annotate);
        MessageBus.ext.subscribe("control/save",this._save);
        this.group = group;
        this.menu = document.querySelector(".vertical-menu");
        this.select = document.querySelector("#typeChoice");
        this.select.addEventListener("change",this._choosing);
        this.button = document.querySelector("#save");
        this.menu.removeChild(this.button);
        this.formDiv = document.createElement("div");
        this.formDiv.setAttribute("id","formDiv");
        this.input = document.createElement("input");
        this.input.setAttribute("type","text");
        this.input.setAttribute("value","Insira o texto");
        this.input.setAttribute("class","testes");
        // this.input.setAttribute("width", String(this.select.offsetWidth) + "px");
        // console.log(" aaaaaaa "+ this.select.offsetWidth);
        this.input.setAttribute("onclick", "this.focus();this.select()"); //isso aqui faz selecionar todo o "insira o texto" quando o usuário clicar para ele não ter que apagar na mão
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
    _save(){
        let selectedArea = this.group.getSelected();
        let canva = document.querySelector("#canvas");
        let serializer = new XMLSerializer();
        let strSVG = serializer.serializeToString(canva);
        console.log(strSVG)
        let file = new File([strSVG],"svgAnnotation.svg",{type: "text/svg"});
        //let blob = new Blob([strSVG], { type: "text/xml" });

    }
}

(function() {
    Annotation.instance = new Annotation();
    Annotation.vocabulary = ["Pericardits", "Heart attack","Arrhythmia"];
})();