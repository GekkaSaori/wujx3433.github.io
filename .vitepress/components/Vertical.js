while (document.readyState === 'loading' || document.readyState !== 'interactive') {
    // 等待文档加载完成
}
var divList = ['p', 'h1', 'h2', 'h3', 'h4', 'h5']
var replaceList = ['“', '『 ', '”', '』', '‘ ', '「', '’', '」'];
for(var i = 0; i < divList.length; ++i) {
    var selectedDiv = document.querySelector('.vertical-layout-container').querySelectorAll(divList[i]);
    for(var j = 0; j < selectedDiv.length; ++j) {
        var str = selectedDiv[j].innerHTML;
        for(var k = 0; k < replaceList.length; k += 2) {
            str = str.replaceAll(replaceList[k], replaceList[k + 1]);
        }
        selectedDiv[j].innerHTML = str;
    }
}