/**
 * Created by wangjiewen on 14-11-2.
 */

var BgStarLayer = cc.Layer.extend({

    conHeight: 0,


    ctor : function () {
        this._super();
        this.init();
    },

    init : function() {
        var self = this;
        self._super();
        self.conHeight = cc.director.getWinSize();

        var bgArr = [
            resource.bg_star_1,
            resource.bg_star_2,
            resource.bg_star_3,
            resource.bg_star_4,
            resource.bg_star_5
        ];

        var len = bgArr.length;
        var conHeight = 0;
        for(var i = 0; i < len; i++){
            var bg = new cc.Sprite(bgArr[i]);
            bg.setAnchorPoint(0, 0);
            bg.setPosition(0, conHeight);
            self.addChild(bg, -1);
            conHeight += bg.getContentSize().height;
        }
        self.scheduleUpdate();
    },

    update: function(){
        //console.log('update')
        var pos = this.getPosition();
        pos.y += -3;

        var size = this.getContentSize();
        this.setPosition(pos);
    }
});
