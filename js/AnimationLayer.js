/**
 * Created by wangjiewen on 14-11-2.
 */

var AnimationLayer = cc.Layer.extend({

    winSize: null,

    //当前老鼠的list
    planetList : [],

    rocket: null,

    ctor : function () {
        this._super();
        this.init();
    },

    init : function () {
        var self = this;
        this._super();

        self.winSize = cc.director.getWinSize();
        var centerPos = cc.p(self.winSize.width/2, self.winSize.height/2);

        //底色背景
        var earth = new cc.Sprite(resource.earth);
        earth.setAnchorPoint(0.5, 0);
        earth.setPosition(self.winSize.width/2, -20);
        earth.setScale(1.0);
        this.addChild(earth, 1);

        var work1 = new cc.Sprite(resource.work_1);
        work1.setAnchorPoint(0, 0);
        work1.setPosition(0, 500);
        work1.setScale(0.5);
        this.addChild(work1);

        var work2 = new cc.Sprite(resource.work_2);
        work2.setAnchorPoint(0, 0);
        work2.setPosition(500, 1000);
        work2.setScale(0.5);
        this.addChild(work2);

        var work3 = new cc.Sprite(resource.work_3);
        work3.setAnchorPoint(0, 0);
        work3.setPosition(500, 1500);
        work3.setScale(0.5);
        this.addChild(work3);

        var work4 = new cc.Sprite(resource.work_4);
        work4.setAnchorPoint(0, 0);
        work4.setPosition(500, 1000);
        work4.setScale(0.5);
        this.addChild(work4);

        var work5 = new cc.Sprite(resource.work_5);
        work5.setAnchorPoint(0, 0);
        work5.setPosition(500, 1000);
        work5.setScale(0.5);
        this.addChild(work5);

        var work6 = new cc.Sprite(resource.work_6);
        work6.setAnchorPoint(0, 0);
        work6.setPosition(500, 1000);
        work6.setScale(0.5);
        this.addChild(work6);

        var work7 = new cc.Sprite(resource.work_7);
        work7.setAnchorPoint(0, 0);
        work7.setPosition(500, 1000);
        work7.setScale(0.5);
        this.addChild(work7);

        var work8 = new cc.Sprite(resource.work_8);
        work8.setAnchorPoint(0, 0);
        work8.setPosition(500, 1000);
        work8.setScale(0.5);
        this.addChild(work8);


		this.rocket = new cc.Sprite(resource.rocket_1);
		this.rocket.setAnchorPoint(0.5, 0.5);
		this.rocket.setPosition(self.winSize.width/2, this.rocket.getContentSize().height);
		this.addChild(this.rocket, 2);


        this.scheduleUpdate();

        //var moveLeft = cc.MoveBy.create(3, cc.p(-500, 0));
        var moveLeft = cc.MoveTo.create(3, work1.getPosition());
        var easeMoveLeft = cc.EaseInOut.create(moveLeft, 1);
        //向上移动的回调
        var moveLeftCallback = cc.CallFunc.create(function () {
            self.rocket.runAction(cc.Sequence.create(easeMoveLeft.reverse(), moveRightCallback) );
        }, this);
        var moveRightCallback = cc.CallFunc.create(function () {
            self.rocket.runAction(cc.Sequence.create(easeMoveLeft, moveLeftCallback ));
        }, this);
        self.rocket.runAction(cc.Sequence.create(moveLeft, moveLeftCallback));

    },

    /**
     * 每帧的更新图 由scheduleUpdate()调用
     * @param dt
     */
    update : function (dt) {
        var pos = this.getPosition();
        pos.y += -1;
        this.rocket.setPositionY(this.rocket.getPositionY() + 1);
        this.setPosition(pos);
    },

    /**
     * 控制地鼠的弹出
     */
    tryPopMouse : function () {
        var self = this;
        var len = self.mouseList.length;

        setInterval(function () {
            var index = parseInt(Math.random()*10000) % len;
            var mouse = self.mouseList[index];
            if(mouse.getNumberOfRunningActions() == 0){
                self.popMouse(mouse);
            }
        }, 1000)
    },

    /**
     * 弹出一个地鼠
     * @param {cc.Sprite} mouse
     */
    popMouse : function (mouse) {
        var self = this;
        var moveUp = cc.MoveBy.create(1, cc.p(0, mouse.getContentSize().height - 60));
        var easeMoveUp = cc.EaseInOut.create(moveUp, 3);
        var easeMoveDown = easeMoveUp.reverse();
        var laugh = self.createAnimation('mole_laugh', [1,2,3]);

        //向上移动的回调
        var moveUpCallback = cc.CallFunc.create(function () {
            mouse.setTag(1); //刚刚冒出来的时候可以敲地鼠
        }, this);

        var laughCallback = cc.callFunc(function () {
            mouse.setTag(0); //笑完了之后开始下落了不能敲
        }, this);

        mouse.runAction(cc.Sequence.create(easeMoveUp, moveUpCallback, laugh, laughCallback, easeMoveDown));
    },

    /**
     *
     * @param {String} prefixName 前缀
     * @param {int[]} frameNum
     */
    createAnimation : function (prefixName, frameArr) {
        var animation = cc.Animation.create();
        for(var i = 0; i < frameArr.length; i++){
            var img = prefixName + frameArr[i];
            animation.addSpriteFrameWithFile(resource[img]);
        }
        animation.setDelayPerUnit(2.8/14);
        animation.setRestoreOriginalFrame(true);

        return cc.Animate.create(animation);
    },


    /**
     * 3.1版本之后需要在PlayScene调用，因为它已经集成在EventManager中
     * @param {Object} touch
     * @param {Object} event
     * @returns {boolean}
     */
    onTouchBegan : function(touch, event) {
        var self = this;
        var localPos = this.convertTouchToNodeSpace(touch);
        for(var i=0; i<self.mouseList.length; i++){
            var mouse = self.mouseList[i];
            if(mouse.getTag() == 0){
                continue;
            }
            var rect = mouse.getBoundingBox();
            var isHit = cc.rectContainsPoint(rect, localPos);
            if(isHit){
                mouse.setTag(0);
                mouse.stopAllActions();
                var hitAnimation = self.createAnimation('mole_thump',[1,2,3,4]);
                var moveDown = cc.MoveBy.create(1, cc.p(0, -mouse.getContentSize().height + 60));
                var easeMoveDown = cc.EaseInOut.create(moveDown, 1.0);
                mouse.runAction(cc.Sequence.create(hitAnimation, easeMoveDown, null));
            }

        }
        return true;
    },

    onTouchMoved : function(touch, event) {
        var pos = touch.getLocation();
        debugger;
    },

    onTouchEnded : function(touch, event) {
       debugger;
    }


});
