/*if(shape === "circle"){
                this.fig = document.createElementNS(SVG, "ellipse");
                this.fig.setAttribute("id", "circle");
                let color = this._chooseColor();
                this.fig.setAttribute("fill", color);
                this.fig.setAttribute("rx", "50");
                this.fig.setAttribute("ry", "50");
                this.fig.setAttribute("cx", 50);
                this.fig.setAttribute("cy", 50);
                this.aux.appendChild(this.fig);
                this.fig.addEventListener("mousedown", this._down);
                this.fig.addEventListener("mouseup", this._up);
            }else if(shape === "square"){
                this.fig = document.createElementNS(SVG, "rect");
                this.fig.setAttribute("id", "square");
                this.fig.setAttribute("width", 100);
                this.fig.setAttribute("height", 100);
                let color = this._chooseColor();
                this.fig.setAttribute("fill", color);
                this.aux.appendChild(this.fig);
                this.fig.addEventListener("mousedown", this._down);
                this.fig.addEventListener("mouseup", this._up);
            } else if (shape === "image") {
                this.fig = document.createElementNS(SVG, "image");
                this.fig.setAttribute("id", "image");
                this.fig.setAttribute("width", 100);
                this.fig.setAttribute("height", 100);
                this.fig.setAttribute("href","images/procurar.svg");
                this.fig.setAttribute("preserveAspectRatio", "none");
                console.log(this.fig);
                this.aux.appendChild(this.fig);
                this.fig.addEventListener("mousedown", this._down);
                this.fig.addEventListener("mouseup", this._up);
                this.fig.setAttribute("fill","#ffffff");
            }*/