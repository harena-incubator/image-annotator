
class ImageGroup{
    constructor(group,g){
        this._createImage = this._createImage.bind(this);
        this._groupate = this._groupate.bind(this);
        this.getFig = this.getFig.bind(this);
        this._move = this._move.bind(this);
        this._showFather = this._showFather.bind(this);
        this.select = this.select.bind(this);
        this.selecting = this.selecting.bind(this);
        if(group !== undefined){
            this.group = group;
            this.secondary = true;
            this.fig = g;
            this.father = null;
            Movel.area.appendChild(this.fig);
            this.selected = true;
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
            this.groupated = true;
            this.father = null;
            this.selected = false;
        }
        
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
        let g = document.createElementNS(SVG,"g");
        g.setAttribute("class","group");
        for (let i = 0; i < this.group.length;){
            if (((this.group)[i]).selected){
               let removed = this.group.splice(i,1);
               removed[0].groupated = true;
               //console.log(removed[0]);
               g.appendChild(removed[0].getFig());
               newGroup.push(removed[0]);
               i--;
            }
            i++;
        }
        Movel.area.appendChild(g);
        newGroupOb = new ImageGroup(newGroup,g);
        this._showFather(newGroupOb);
        console.log(newGroupOb);
        this.group.push(newGroupOb);
        console.log(this.group);
    }
    _move(x,y){
        if(this.father !== null){
            this.father._move(x,y);
        } else{
            console.log(this);
            console.log("feijão");
            this.fig.setAttribute("transform","translate(" + (x) + "," + (y) + ")");
        }
    }
    getFig(){
        return this.fig;
    }
    _showFather(group){
        for(let i = 0; i < group.group.length; i++){
            (group.group[i]).father = group;
        }
    }
    select(){
        if(this.father !== null){
            this.father.select();
            this.selected = !(this.selected);
        }else{
            this.selected = !(this.selected);
            for(let i = 0; i < this.group.length;i++){
                (this.group[i]).selecting();
            }
        }
    }
    selecting(){
        for(let i = 0; i < this.group.length;i++){
            (this.group[i]).selecting();
        }
    }
}