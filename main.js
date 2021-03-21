window.onload =function(){
    //获取内容区里面得#main和#go，以及获取计数区。
    var main = document.getElementById('main');
    var go = document.getElementById('go');
    var count = document.getElementById('count');
    //设置四种颜色
    cols = ['#1AAB8A', '#f1e71f', '#958fea', '#a2b6ef'];
    //动态创建div
    function CDiv(classname) {
        //创建div节点，为一行，一行里面有4块
        var Div = document.createElement('div')
        //生成随机数，Math.floor()是四舍五入的作用，产生的数永远不会大于4，产生的随机数表示那个有颜色的那一个
        index = Math.floor(Math.random() * 4)
        //设置class
        Div.className = classname

        //在一行里面动态添加四个div，一行里面的四块
        for (var i = 0; i < 4; i++) {
            var iDiv = document.createElement('div')
            Div.appendChild(iDiv)
        }

        //判断#main里面是否有元素
        if (main.children.length == 0) {
            main.appendChild(Div);//一开始没有元素就直接添加
        } else {
            //如果有元素，则在该元素之前插入
            main.insertBefore(Div, main.children[0]);
        }
        //随机的设置四个div块的背景颜色
        Div.children[index].style.backgroundColor = cols[index];//数组里面随机取出一种颜色
        Div.children[index].className = "i";//4个元素之中被抽取的那个赋值一个类
    }

    /*
    实现游戏区域移动的功能效果
     */
    function move(obj) {
        //默认速度与计分
        var speed = 5, num = 0;
        //定义一个定时器
        obj.timer = setInterval(function () {
            //速度
            var step = parseInt(getComputedStyle(obj, null)['top']) + speed;
            //getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值,获取top属性值，再加上当前速度，得出下一个位置的地址
            obj.style.top = step + 'px'//设置更新后的位置值
            if (parseInt(getComputedStyle(obj, null)['top']) >= 0) {
                CDiv('row');//新增一行，一行的height为150px
                obj.style.top = -150 + 'px';//提升到原有位置
            }
            if (obj.children.length == 6) {
                for (var i = 0; i < 4; i++) {
                    //是否最后一行有那个有颜色元素没有被点击
                    if (obj.children[obj.children.length - 1].children[i].className == 'i') {
                        //游戏结束
                        obj.style.top = '-150px';
                        count.innerHTML = '游戏结束,最高得分: ' + num;
                        //关闭定时器
                        clearInterval(obj.timer);
                        //显示开始游戏
                        go.children[0].innerHTML = '游戏结束';
                        go.style.display = "block";
                    }
                }
                obj.removeChild(obj.children[obj.children.length - 1]);//删除一行
            }
            //点击与计分
            obj.onmousedown = function (event) {
                //点击的不是白盒子
                // 兼容IE
                event = event || window.event;
                if ((event.target ? event.target : event.srcElement).className == 'i') {
                    //点击后的盒子颜色
                    (event.target ? event.target : event.srcElement).style.backgroundColor = "#bbb";
                    //清除盒子标记，移除类名i
                    (event.target ? event.target : event.srcElement).className = '';
                    //计分
                    num++;
                    //显示得分
                    count.innerHTML = '当前得分: ' + num;
                }
                else {
                    //游戏结束
                    obj.style.top = 0;
                    count.innerHTML = '游戏结束,最高得分: ' + num;
                    //关闭定时器
                    clearInterval(obj.timer);
                    //显示开始游戏
                    go.children[0].innerHTML = '游戏结束';
                    go.style.display = "block";
                }
                //盒子加速，每十分就加一点速度
                if (num % 10 == 0) {
                    speed++;
                }
            }
            //松开触发停止
            obj.onmouseup = function (event) {
            }
        }, 20)
    }

    //点击开始的时候
    go.children[0].onclick = function(){
        if (main.children.length) {
            //暴力清除main里面所有盒子
            main.innerHTML = '';
        }
        //清空计分
        count.innerHTML = '游戏开始';
        //隐藏开始盒子
        this.parentNode.style.display = "none";
        move(main);
    }
}