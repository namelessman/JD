// 地址选择
// 现存问题：多次选择地址后，将有多个高亮
function addSelect(){
	var add=document.getElementById('add');
	var addList=document.getElementById("addList");
	var addSelector=document.getElementById("addSelect");
    var selected=document.getElementsByClassName("selected")[0];

	addList.style.display="none";

	addSelector.onmouseover=function(){
		addList.style.display="block";
		// 选中变色
		for(var i=0;i<addList.childNodes.length;i++){
			if(addList.childNodes[i].nodeType==1){
				addList.childNodes[i].onclick=function(){
					add.innerHTML=this.innerHTML;	
					//使用add.innerHTML=addList.childNodes[i].nodeValue;不行，因为element.value=null;
					// this.style.backgroundColor="#C81623";
					// this.style.color="#fff";
                    for(j=0;j<addList.childNodes.length;j++){
                        if(addList.childNodes[j].className=="selected"){
                            addList.childNodes[j].className="";
                        }
                    }
                    this.className="selected";

				}

			}
		}
	}

	addSelector.onmouseout=function(){
		addList.style.display="none";
	}
}

// 左侧导航栏效果
function nav(){
	var nav=document.getElementById("navLeft");
	var subMenu=document.getElementsByClassName("subMenu");

	subMenu[0].style.display="none";

	for(var i=0;i<nav.childNodes.length;i++){
		if(nav.childNodes[i].nodeType==1){
			nav.childNodes[i].onmouseover=function(){
				subMenu[0].style.display="block";
			}
			nav.childNodes[i].onmouseout=function(){
				subMenu[0].style.display="none";
			}
		}
	}
}

// 轮播
function turn (){
    var container=document.getElementById('container');
    var list=document.getElementById("list");
    var buttons=document.getElementById("buttons").getElementsByTagName('span');
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    var index=1;
    var animated=false;
    var timer;
    var piece=document.getElementById('list').getElementsByTagName("img").length-2;//要显示的张数，除去首尾两张辅助页
    var pix=730;//图片的像素

    /*底部button显示*/
    function showButton(){
        
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=="on"){
                buttons[i].className="";
                break;
            }
        }
        if(index==piece+1){
            index=1;
        }
        if(index==0){
            index=piece;
        }
        buttons[index-1].className="on";    
            
        
    }

    /*切换*/
    function animate(offset){
        var newLeft=parseInt(list.style.left)+offset;
        var time=300;//位移时间
        var interval=10;//位移间隔
        var speed=offset/(time/interval);

        function go(){
            animated=true;
            if ((speed<0&&parseInt(list.style.left)>newLeft)||(speed>0&&parseInt(list.style.left)<newLeft)) {
                list.style.left=parseInt(list.style.left)+speed+"px";
                setTimeout(go,interval);
            }
            else{
                animated=false;
                list.style.left=newLeft + "px";

                if(newLeft>-pix){
                    list.style.left=-pix*piece+"px";
                }
                if(newLeft<-pix*piece){
                    list.style.left=-pix+"px";
                }
            }
        }

        if(!animated)
            {
                go();
            }

    }

    /*前后按钮*/
    next.onclick=function(){
        if(!animated){
            index+=1;
            showButton();
            animate(-pix);
        }
        
    } 
    prev.onclick=function(){
        if (!animated) {
            index-=1;
            showButton();
            animate(pix);
        }
        
    } 

    // 底部按钮
    for(var i=0;i<buttons.length;i++){
            buttons[i].onclick=function(){
                if (animated) {
                    return;
                }
            if(this.className=="on"){
                return;
            }
            var myIndex=parseInt(this.getAttribute("index"));
            var offset=-pix*(myIndex-index);
            index=myIndex;
            showButton();
            animate(offset);

        }
    }

    /*自动播放与停止*/
    function play(){
        var changeInterval=3000;
        timer=setInterval(function(){
            next.onclick();
        },changeInterval)
    }
    function stop(){
        clearInterval(timer);
    }
    play();
    container.onmouseover=stop;
    container.onmouseout=play;

}
window.onload=function(){
	addSelect();
	// nav();
	turn();
}
