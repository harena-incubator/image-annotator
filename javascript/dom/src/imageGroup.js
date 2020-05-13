
class ImageGroup{
    constructor(group){
        this._createImage = this._createImage.bind(this);
        this._groupate = this._groupate.bind(this);
        if(group !== undefined){
            this.group = group;
            this.secondary = true;
        } else{
            this.group = [];
            this.secondary = false;
            Movel.area = document.createElementNS(SVG, "svg");
            MessageBus.ext.subscribe("control/create",this._createImage);
            MessageBus.ext.subscribe("control/group",this._groupate);
            Movel.area.setAttribute("id", "area");
            Movel.area.setAttribute("width", "100%");
            Movel.area.setAttribute("height", "100%");
            let div = document.querySelector(".main");
            div.appendChild(Movel.area);
            console.log(this.group);
            console.log("aaaa\n");
        }
        this.selected = false;
    }
    _createImage() {
        let select = document.querySelector("#choice");
        let chosen = select.selectedIndex;
        //console.log(select.selectedIndex);
        let options = select.options;
        let optionChosen;
        if(chosen !== undefined)
            optionChosen = options[chosen];
        //console.log(optionChosen.getAttribute("value"));
        let square = new Movel(optionChosen.getAttribute("value"));
        this.group.push(square);
        console.log(this.group);
        console.log("batata frita");
    }
    _groupate(){
        let newGroup = [];
        let newGroupOb;
        for (let i = 0; i < this.group.length;){
            if (((this.group)[i]).selected){
               let removed = this.group.splice(i,1);
               newGroup.push(removed);
               i--;
            }
            i++;
        }
        newGroupOb = new ImageGroup(newGroup);
        console.log(newGroupOb);
        this.group.push(newGroupOb);
        console.log(this.group);
    }
}