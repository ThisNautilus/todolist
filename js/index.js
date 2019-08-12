var things = document.getElementById('things');
var ol = document.getElementsByTagName('ol')[0];

render();

things.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        // 先读取本地存储的数据
        var local = getData();
        // 更新本地数据 
        local.push({ title: this.value, done: false });
        saveData(local);
        // 渲染本地数据
        render();
    }
})

// 读取本地存储的数据
function getData() {
    var data = localStorage.getItem('thingsArr');
    if (data !== null) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
// 保存数据至本地
function saveData(data) {
    data = JSON.stringify(data);
    return localStorage.setItem('thingsArr', data);
}
// 渲染数据
function render() {
    // 读取数据
    var data = getData();
    // var doneThings = '';
    // console.log(data);
    data.forEach(element => {
        // console.log(element);
        var doneThings = `<li><input type="checkbox">
        <p>` + element.title + `</p><i class="iconfont icon-shanchu"></i>
    </li>`;
        prepend(ol, doneThings);
    });
    // 计划更换为jQuery实现
}