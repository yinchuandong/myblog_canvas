/**
 * Created by wangjiewen on 14-11-2.
 */

var BackgroundLayer = cc.Layer.extend({

    ctor : function () {
        this._super();
        this.init();
    },

    init : function() {
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width/2, winSize.height/2);

        var bg1 = new cc.Sprite(resource.bg_cloud_2);
        bg1.setAnchorPoint(0, 0);
        bg1.setPosition(0, 0);
        this.addChild(bg1, -2);

        var bg2 = new cc.Sprite(resource.bg_cloud_2);
        bg2.setAnchorPoint(0, 0);
        bg2.setPosition(0, bg2.getContentSize().height);

        //
        //var grassLower = new cc.Sprite(resource.grass_lower);
        //grassLower.setAnchorPoint(cc.p(0.5, 1));
        //grassLower.setPosition(winSize.width/2, winSize.height/2);
        //grassLower.setLocalZOrder(1);
        //this.addChild(grassLower, 1)
        //
        //
        //var grassUpper = new cc.Sprite(resource.grass_upper);
        //grassUpper.setAnchorPoint(cc.p(0.5, 0));
        //grassUpper.setPosition(winSize.width/2, winSize.height/2);
        //this.addChild(grassUpper, -1);


        this.scheduleUpdate();
    },

    update: function(){

    }
});
