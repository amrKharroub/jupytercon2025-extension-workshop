import { Widget } from "@lumino/widgets";
import { MainAreaWidget } from "@jupyterlab/apputils";
import { imageIcon } from "@jupyterlab/ui-components";


class ImageCaptionWidget extends Widget{

    constructor(){
        super();

        const hello = document.createElement("p");
        hello.innerHTML = "Hello, world!";
        this.node.appendChild(hello);
    }
}

export class ImageCaptionMainAreaWidget extends MainAreaWidget<ImageCaptionWidget> {
    constructor(){
        const widget = new ImageCaptionWidget();
        super({content: widget});

        this.title.label = "Random Image with Caption!";
        this.title.caption = this.title.label;
        this.title.icon = imageIcon;
    }
} 