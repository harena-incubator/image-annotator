class Annotation{
    constructor(){
        console.log("cheguei");
        this.start = this.start.bind(this);
        this._annotate = this._annotate.bind(this);
        this._choosing = this._choosing.bind(this);
        this._save = this._save.bind(this);
        this.clicked = false;
        this.first = 1;
        this.vocabulary = [{
            "name": "Pericardits",
            "url": "https://www.ncbi.nlm.nih.gov/mesh/68010493"
        }, {
               "name" : "Heart failure" ,
                "url": "https://www.ncbi.nlm.nih.gov/mesh/68054144"
            }, {
                "name" : "Arrhythmia",
                "url": "https://www.ncbi.nlm.nih.gov/mesh/68001145"
            }];
        this.AnnotationTemplate = {
            "@context": {
                "@vocab": "http://www.w3.org/ns/anno.jsonld",
                "dc": "http://purl.org/dc/terms/",
                "svg": "",
                "title": "dc:title",
                "subject": "dc:subject"
            },
            "target": "svg",
            "body": []
        }
        this.meshTemplate = { 
            "id": "",
            "subject": {
                "@id": ""
            }
        }
        this.freeTemplate = {
            "id": "",
            "title": {
                "@value": ""
            }
        }
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
                for (let i = 0; i < this.vocabulary.length;i++){
                    option = document.createElement("option");
                    option.text = this.vocabulary[i]["name"];
                    option.value = this.vocabulary[i]["url"].toLowerCase();
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
        //console.log(strSVG)
        let file = new File([strSVG],"svgAnnotation.svg",{type: "text/svg"});
        //let blob = new Blob([strSVG], { type: "text/xml" });
        this.AnnotationTemplate["@context"]["svg"] = file
        let annotArea = this.group.getSelected();
        if (annotArea.length !== 1){
            alert("Please, chose one area or create a group")
            //return;
        } else {
            let chosen = this.select.selectedIndex;
            let options = this.select.options;
            let optionChosen;
            if (chosen !== undefined)
                optionChosen = options[chosen];
            if (optionChosen.value === "vocabulary"){
                let template = this._copy(this.meshTemplate);
                let vocabChosen = this.choice.selectedIndex;
                let vocabOptions = this.choice.options;
                let vocabOpChosen;
                if (vocabChosen !== undefined){
                    vocabOpChosen = vocabOptions[vocabChosen];
                    template["id"] = annotArea[0]["id"];
                    template["subject"]["@id"] = vocabOpChosen.value;
                    this.AnnotationTemplate["body"].push(template);
                }
            } else{
                let template = this._copy(this.freeTemplate);
                let result = this.input.value;
                template["id"] = annotArea[0]["id"];
                template["title"]["@value"] = result;
                this.AnnotationTemplate["body"].push(template);
            }
            let ldString = JSON.stringify(this.AnnotationTemplate,null,2);
            console.log(ldString);
            let finalFile = new File([JSON.stringify(this.AnnotationTemplate)], "annotation.jsonld", { type: "text/jsonld" });
        }
        return;
    }
    _copy(obj){
        let copy = JSON.parse(JSON.stringify(obj));
        return copy
    }
}

(function() {
    Annotation.instance = new Annotation();
})();