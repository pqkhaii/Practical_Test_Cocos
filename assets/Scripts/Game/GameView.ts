import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    
    @property({type: SpriteFrame})
    private listEnemy: SpriteFrame[] = []
}


