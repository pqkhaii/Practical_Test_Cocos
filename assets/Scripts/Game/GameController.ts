import { _decorator, Color, Component, EventKeyboard, Input, input, instantiate, KeyCode, Node, Prefab, randomRangeInt, Sprite, tween, UITransform, v2, v3, Vec3 } from 'cc';
import { Constants } from './Constants';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
import { ItemSpin } from './ItemSpin';
import { ItemBorder } from './ItemBorder';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({type: GameView})
    private gameView: GameView = null;

    @property({type: GameModel})
    private gameModel: GameModel = null;

    @property({type: Prefab})
    private itemPrefab: Prefab = null;

    @property({type: Node})
    private nodePool: Node = null;
    
    private itemBorderPool: Node[] = []
    
    @property({type: Node})
    private nodeListIconSpin: Node = null

    private itemSpinPool: Node[] = []

    private isSpin: boolean = false; 
    private isCheck: boolean = false;
    private type = 0;
    private speed: number = 0.1;

    private nodeResult: Node = null;

    private countSpace: number = 0;

    public scheduleCallBack: any;

    protected start(): void {
        this.createIteamBorder();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        
        this.createItemSpinPool();
    }

    protected update(dt: number): void {
        this.spinItems(dt);
    }

    private spinItems(dt: number): void {
        if(this.isSpin === true){
            for(let i = 0; i < this.itemSpinPool.length; i++){
                const icon = this.itemSpinPool[i];
                var posX = icon.position.x;
                var posY = icon.position.y;

                posY -= 5000 * dt;

                if(posY <= -740){
                    posY = 1040;
                }

                //result
                if(this.isCheck === true && icon === this.nodeResult){
                    this.isSpin = false;

                    this.itemSpinPool.sort((a, b) => a.position.y - b.position.y);
                    this.itemSpinPool.map((item, index) => {
                        tween(item).to(0.3, { 
                            position: new Vec3(0, item.position.y - this.nodeResult.position.y) 
                        })
                        .start()
                    });
                }
                else{
                    icon.setPosition(posX, posY, 0.0);
                }
            }
        }
    }

    protected createItemSpinPool(): void {
        let array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.shuffleArray(array);
        for (let i = 0; i < 9; i++) {
            const child = new Node();
            child.parent = this.nodeListIconSpin;
            this.itemSpinPool.push(child);
            let itemSpin = child.addComponent(ItemSpin);
            itemSpin.createItem(this.gameView.ListIcon[array[i]], -590 + i * 200, array[i])
        }
    }

    private shuffleArray(array: number[]){
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    private createIteamBorder(): void {
        let startX = -250;
        let startY = 480;
        let iconCount = 0;

        for(let i = 0; i < 18; i++){
            const icon = instantiate(this.itemPrefab);
            this.itemBorderPool.push(icon);
            icon.parent = this.nodePool;

            let spriteFrameIndex = iconCount % this.gameView.ListIcon.length;
            let spriteFrame = this.gameView.ListIcon[spriteFrameIndex];

            let itemBorder = icon.addComponent(ItemBorder);
            itemBorder.createItem(spriteFrame, i)

            if(i <= 3){
                icon.setPosition(startX + i * 170, startY);
            } 
            else if(i > 3 && i <= 9){
                let offsetY = 160 * (i - 3);
                icon.setPosition(this.itemBorderPool[3].position.x, this.itemBorderPool[3].position.y - offsetY);
            } 
            else if(i > 9 && i <= 12){
                let offsetX = 170 * (i - 9);
                icon.setPosition(this.itemBorderPool[9].position.x - offsetX, this.itemBorderPool[9].position.y);
            } 
            else{
                let offsetY = 160 * (i - 12);
                icon.setPosition(this.itemBorderPool[12].position.x, this.itemBorderPool[12].position.y + offsetY);
            }

            iconCount++;
        }
    }

    public startAnimIconsBorder(type: number): void {
        this.itemBorderPool[this.type].getComponent(Sprite).color = Color.WHITE;
        this.scheduleCallBack = () => {
            this.type++;
            this.itemBorderPool[this.type - 1].getComponent(Sprite).color = Color.GRAY;

            if(this.type === 18){
                this.type = 0;
            }

            this.itemBorderPool[this.type].getComponent(Sprite).color = Color.WHITE;

            if (this.isCheck === true && this.type === type) {
                this.unschedule(this.scheduleCallBack);
            }
        };

        this.schedule(this.scheduleCallBack, this.speed);
    }

    public startSpin(type: number): void {
        this.nodeResult = this.itemSpinPool.find((item) => item.getComponent(ItemSpin).getType() === type);

        //check result
        console.log(this.nodeResult.getComponent(Sprite).spriteFrame.name);
    }

    protected onKeyDown (event: EventKeyboard): void {
        switch(event.keyCode) {
            case KeyCode.SPACE:
                if(this.countSpace === 0){
                    const result = randomRangeInt(0, 9);
                    this.startAnimIconsBorder(result);
                    this.startSpin(result);

                    this.isCheck = false;
                    this.isSpin = true;
                    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                    
                    this.scheduleOnce(() => {
                        this.countSpace = 1;
                        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                    }, 1)
                }
                else{
                    this.isCheck = true;
                    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                    this.scheduleOnce(() => {
                        this.countSpace = 0;
                        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                    }, 1)
                }
                break;
        }
    }
}