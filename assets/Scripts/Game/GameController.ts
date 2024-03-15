import { _decorator, Component, EventKeyboard, Input, input, instantiate, KeyCode, Node, Prefab, Sprite } from 'cc';
import { Constants } from './Constants';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({type: GameView})
    private gameView: GameView = null;

    @property({type: GameModel})
    private gameModel: GameModel = null;

    @property({type: Prefab})
    private iconPrefab: Prefab = null;

    @property({type: Node})
    private listSpin: Node[] = []

    @property({type: Node})
    private nodeListIconSpin: Node = null

    @property({type: Node})
    private nodePool: Node = null;

    private iconPool: Node[] = []

    private isSpin: boolean = false;

    protected start(): void {
        this.createIconsBorder();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    protected update(dt: number): void {
        // this.spinIcon(dt);
    }

    

    private createIconsBorder(): void {
        let startX = -250;
        let startY = 480;
        let iconCount = 0;

        for(let i = 0; i < 18; i++){
            const icon = instantiate(this.iconPrefab);
            this.iconPool.push(icon);
            icon.parent = this.nodePool;

            let spriteFrameIndex = iconCount % this.gameView.ListIcon.length;
            let spriteFrame = this.gameView.ListIcon[spriteFrameIndex];

            let sprite = icon.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = spriteFrame;
            }

            if (i <= 3) {
                icon.setPosition(startX + i * 170, startY);
            } 
            else if (i > 3 && i <= 9) {
                let offsetY = 160 * (i - 3);
                icon.setPosition(this.iconPool[3].position.x, this.iconPool[3].position.y - offsetY);
            } 
            else if (i > 9 && i <= 12) {
                let offsetX = 170 * (i - 9);
                icon.setPosition(this.iconPool[9].position.x - offsetX, this.iconPool[9].position.y);
            } 
            else {
                let offsetY = 160 * (i - 12);
                icon.setPosition(this.iconPool[12].position.x, this.iconPool[12].position.y + offsetY);
            }

            iconCount++;
        }
    }

    protected onKeyDown (event: EventKeyboard): void {
        switch(event.keyCode) {
            case KeyCode.SPACE:
                console.log('Press a key');
                break;
        }
    }
}