import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constants')
export class Constants extends Component {
    public static readonly listBorder = [
                                        [1, 1, 1, 1],
                                        [1, 0, 0, 1],
                                        [1, 0, 0, 1],
                                        [1, 0, 0, 1],
                                        [1, 0, 0, 1],
                                        [1, 0, 0, 1],
                                        [1, 1, 1, 1]]
                                        
}