import { _decorator, Color, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemBorder')
export class ItemBorder extends Component {
    private type: number = 0;

    public createItem(spriteFrame: SpriteFrame, type: number): void {
        this.type = type;

        this.node.getComponent(Sprite).spriteFrame = spriteFrame;
        this.node.getComponent(Sprite).color = Color.GRAY;
    
    }

    public getType(): number {
        return this.type;
    }
}


