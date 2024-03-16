import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemSpin')
export class ItemSpin extends Component {
    private type: number = 0;

    public createItem(spriteFrame: SpriteFrame, positionY: number, type: number): void {
        this.type = type;

        this.node.addComponent(Sprite);
        this.node.getComponent(Sprite).spriteFrame = spriteFrame;
        this.node.getComponent(UITransform).width = 150;
        this.node.getComponent(UITransform).height = 150;
        
        this.node.setPosition(0, positionY, 0);
    }

    public getType(): number {
        return this.type;
    }
}