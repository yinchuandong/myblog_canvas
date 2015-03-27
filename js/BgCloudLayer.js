/**
 * Created by wangjiewen on 14-11-2.
 */

var BgCloudLayer = cc.Layer.extend({

    winSize: null,


    ctor : function () {
        this._super();
        this.init();
    },

    init : function() {
        var self = this;
        self._super();
        self.winSize = cc.director.getWinSize();

        var bgArr = [
            resource.bg_cloud_1,
            resource.bg_cloud_2,
            resource.bg_cloud_3,
            resource.bg_cloud_4,
            resource.bg_cloud_5
        ];

        var len = bgArr.length;
		var conHeight = 0;
		for(var i = 0; i < len; i++){
			var bg = new cc.Sprite(bgArr[i]);
			bg.setAnchorPoint(0, 0);
			bg.setPosition(0, conHeight);
			self.addChild(bg, -2);
			conHeight += bg.getContentSize().height;
		}
        self.scheduleUpdate();
		//this.unscheduleUpdate();
    },

    update: function(){
		//console.log('update')
		var pos = this.getPosition();
		pos.y += -5;

		var size = this.getContentSize();
		this.setPosition(pos);
    }
});
