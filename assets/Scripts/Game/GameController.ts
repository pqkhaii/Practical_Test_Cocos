import { _decorator, Component, instantiate, Node, Prefab, Sprite } from 'cc';
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
    private nodePool: Node = null;

    private iconPool: Node[] = []
    
    protected start(): void {
        this.createIcons();
    }

    protected update(dt: number): void {
        this.spinIcon(dt);
    }

    private spinIcon(dt: number): void {
        for(let i = 0; i < this.listSpin.length; i++){
            const icon = this.listSpin[i]; 
            var posX = icon.position.x;
            var posY = icon.position.y;

            if(posY <= -280){
                posY = 1768;
            }

            posY -= 250 * dt;
            icon.setPosition(posX, posY, 0);
        }
    }

    private createIcons(): void {
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
}