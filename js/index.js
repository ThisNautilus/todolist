$(function() {
    // 打开页面即开始渲染
    render();

    $('#things').on('keydown', function(e) {
        if (e.keyCode === 13) {
            // 先读取本地存储的数据
            var local = getData();
            // 更新本地数据 
            local.push({ title: this.value, done: false });
            saveData(local);
            // 渲染本地数据
            render();
            // 输入完成后，输入框清空
            $(this).val('');
        }
    })

    // 删除操作（删除的是本地存储，而不是li标签.动态创建的元素不能用click,只能用on绑定事件）
    $('ol,ul').on('click', 'i', function() {
        // alert('del');
        // 获取本地存储
        var data = getData();
        // 修改数据
        var index = $(this).attr('index');
        // alert(index);
        data.splice(index, 1);
        // 保存至本地存储
        saveData(data);
        // 重新渲染页面
        render();
    })

    // 修改选中状态
    $('ol,ul').on('click', 'input', function() {
        // alert('ok');
        var data = getData();
        var index = $(this).siblings('i').attr('index');
        data[index].done = $(this).prop('checked');
        saveData(data);
        render();
    })


    // 一键清空
    $('.footer').on('click', 'a', function() {
        var data = getData();
        data = [];
        saveData(data);
        render();
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
        var todoCount = 0; // 待办事项个数
        var doneCount = 0; // 完成事项个数
        // 遍历之前清空ol里的元素
        $('ol,ul').empty();
        data.forEach((element, index) => {
            // console.log(element);
            if (element.done) {
                var doneThings = `<li><input type="checkbox" checked="checked">
        <p>` + element.title + `</p><i class="iconfont icon-shanchu" index='` + index + `'></i>
    </li>`;
                $('ul').prepend(doneThings);
                doneCount++;
            } else {
                var doneThings = `<li><input type="checkbox">
        <p>` + element.title + `</p><i class="iconfont icon-shanchu" index='` + index + `'></i>
    </li>`;
                $('ol').prepend(doneThings);
                todoCount++;
            }
        });
        $('#doneCount').text(doneCount);
        $('#todoCount').text(todoCount);
    }



})