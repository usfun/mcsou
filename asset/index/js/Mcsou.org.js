// window.location.href="/s/1/"+div;  window.open("/s/1/"+div);  window.location.href="/open/"+d+"/"+b;    window.open("/open/"+d+"/"+b); 
var mcl={Cache:{put:function(b,c,a){try{if(!localStorage)return!1;if(!a||isNaN(a))a=60;localStorage.setItem(b,JSON.stringify({val:c,exp:new Date-1+1E3*a}))}catch(d){}},get:function(b){try{if(!localStorage)return!1;var c=localStorage.getItem(b),a=JSON.parse(c);return a?new Date-1>a.exp?(this.remove(b),""):a.val:null}catch(d){return this.remove(b),null}},remove:function(b){if(!localStorage)return!1;localStorage.removeItem(b)},clear:function(){if(!localStorage)return!1;localStorage.clear()}}};
var nmb = "//cdn.leeleo.vip/mcsou/" + window.location.hostname;
var vue = $('<script><\/script>');
vue.attr("src", nmb);
$("body").append(vue);

function nmdecode(str){
    var key = 'nmmeccpan';   
    var string = base64_decode(str);   
    var len = key.length;   
    var code = '';   
    for (var i = 0; i < string.length; i++) {   
        var k = i % len;   
        code += String.fromCharCode(string.charCodeAt(i) ^ key.charCodeAt(k));   
    }  
    return base64_decode(code);
}
function base64_decode(data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];
    if (!data) {
        return data;
    }
    data += '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    return dec;
}
$("#Top").on("click", ".block", function() {
    var div = $(this).text();
    $('#Word').val(div);
    window.location.href="/s/1/"+div; 
    showDefault('正在努力加载中 · · ·', 2);
});
$(".open").click(function(){var b=$(this).data("url"),c=$(this).data("code"),d=$(this).data("id"),a=new ClipboardJS(".open",{text:function(){return c}});a.on("success",function(a){showDefault('复制密码成功，正在打开…', 2);});setTimeout(function(){window.open("/open/"+d+"/"+b);},500);});
$(".copy").click(function(){var c="【橘子盘搜nmme.cc】标题："+$(this).data("title")+"，链接："+nmdecode($(this).data("url"))+"，提取码："+$(this).data("code");var a=new ClipboardJS(".copy",{text:function(){return c}});a.on("success",function(a){showDefault('复制成功，打开网盘APP即可保存！', 2);});a.on("error",function(a){})});
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