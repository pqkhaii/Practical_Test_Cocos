import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    
    @property({type: SpriteFrame})
    private listIcon: SpriteFrame[] = []

    public get ListIcon() : SpriteFrame[] {
        return this.listIcon;
    }
    
}


