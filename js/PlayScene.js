/**
 * Created by wangjiewen on 14-11-2.
 */

var PlayScene = cc.Scene.extend({

    onEnter : function() {
        this._super();
        var bgCouldLayer = new BgCloudLayer();
        this.addChild(bgCouldLayer);
        var bgStarLayer = new BgStarLayer();
        this.addChild(bgStarLayer);
        var animationLayer = new AnimationLayer();
        this.addChild(animationLayer);

        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function (touch, event) {
                //animationLayer.onTouchBegan(touch, event);
            },

            onTouchMoved : function (touch, event) {

            },

            onTouchEnded : function (touch, event) {

            }
        },this)
    }
});