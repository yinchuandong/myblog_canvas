/**
 * Created by wangjiewen on 14-11-2.
 */

window.onload = function () {
    runGame();

}

function runGame(){

    cc.game.onStart = function(){

        var g_resources = [];
        for(var key in resource){
            g_resources.push(resource[key]);
        }
		var width = window.innerWidth;
		var height = window.innerHeight;
        cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_WIDTH);
        cc.view.resizeWithBrowserSize(true);
        cc.LoaderScene.preload(g_resources, function () {

            cc.director.runScene(new PlayScene());
        }, this);
    };
    cc.game.run('gameCanvas');
}
