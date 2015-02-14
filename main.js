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
        cc.view.setDesignResolutionSize(window.outerWidth, window.outerHeight, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);
        cc.LoaderScene.preload(g_resources, function () {

            cc.director.runScene(new PlayScene());
        }, this);
    };
    cc.game.run('gameCanvas');
}