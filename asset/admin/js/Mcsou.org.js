var Mucho ={
    'Init':function(){
        // 初始化通知工具
        Notiflix.Notify.Init();
        Notiflix.Loading.Init({});
        Notiflix.Confirm.Init({});
        // 初始化复制插件
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', function(e) {
            Notiflix.Notify.Success('复制成功');
        });
        
        clipboard.on('error', function(e) {
            Notiflix.Notify.Failure('复制失败');
        });
        
        // 初始化小插件
        $('[data-toggle="switch"]').wrap('<div class="switch" />').parent().bootstrapSwitch();
        
        // 侧边抽屉功能
        $('.sidebar-menu li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('#sidebar .sub-menu > a').click(function () {
            var last = $('.sub-menu.open', $('#sidebar'));
            last.removeClass('open');
            $('.arrow', last).removeClass('open');
            $('.sub', last).slideUp(200);
            var sub = $(this).next();
            if (sub.is(':visible')) {
                $('.arrow', $(this)).removeClass('open');
                $(this).parent().removeClass('open');
                sub.slideUp(200);
            } else {
                $('.arrow', $(this)).addClass('open');
                $(this).parent().addClass('open');
                sub.slideDown(200);
            }
            var o = ($(this).offset());
            diff = 200 - o.top;
            if(diff>0)
                $('#sidebar').scrollTo('-='+Math.abs(diff), 500);
            else
                $('#sidebar').scrollTo('+='+Math.abs(diff), 500);
        });
            
        // 侧边栏功能
        $('.fa-reorder').click(function () {
            if ($('#sidebar > ul').is(':visible') === true) {
                $('#main-content').css({
                    'margin-left': '0px'
                });
                $('#sidebar').css({
                    'margin-left': '-210px'
                });
                $('#sidebar > ul').hide();
                $('#container').addClass('sidebar-closed');
            } else {
                $('#main-content').css({
                    'margin-left': '210px'
                });
                $('#sidebar > ul').show();
                $('#sidebar').css({
                    'margin-left': '0'
                });
                $('#container').removeClass('sidebar-closed');
            }
        });
    },
    // 插件加载
    'Plug':function(){
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-red',
            radioClass: 'iradio_flat-red'
        });
        $('#allResource').on('ifChanged', function(event){
            var checkVal = $(this).prop('checked');
            if(checkVal){
                $('input').iCheck('check');
            }else{
                $('input').iCheck('uncheck');
            }
        });
        
    },
    // 处理单个
    'Dell':function(obj, id, ac, type){
        Notiflix.Confirm.Show('提示','确定要删除这条数据吗', '确定', '取消', function(){ 
            var data;
            if(type){
                data = {id:id, type:type};
            }else{
                data = {id:id};
            }
            Mucho.Alldb(ac, data, 0);
        }); 
    },
    // 处理多个
    'Dells':function(ac, type){
        var id_array = [];  
        $('input[id="key"]:checked').each(function(){  
            id_array.push($(this).val());
        });  
        var ids = id_array.join(',');
        if(ids === ''){
            Notiflix.Notify.Warning('至少选择一条数据');
        }else{
            Notiflix.Confirm.Show('提示','确定要删除所选数据吗', '确定', '取消', function(){ 
                var data;
                if(type){
                    data = 'id=' + ids + '&type=' + type;
                }else{
                    data = 'id=' + ids;
                }
                Mucho.Alldb(ac, data, 0);
            });
        }
    },
    // 数据操作方法
    'Alldb':function(ac, data, go){
        $.ajax({
            url: 'admin.php?ac=' + ac,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function () {
                Notiflix.Loading.Pulse();
            },
            success: function (r) {
                if(r.code == 1){
                    Notiflix.Notify.Success(r.msg);
                    if(go == '0'){
                        setTimeout(function(){
                            window.location.reload();
                        },1000); 
                        
                    }else if(go == '1'){
                        setTimeout(function(){
                            parent.location.reload();
                        },1000);
                        
                    }else{
                        setTimeout(function(){
                            window.location.href = go;
                        },1000); 
                    }
                }
                else{
                    Notiflix.Notify.Failure(r.msg);
                }
            },
            complete: function () {
                Notiflix.Loading.Remove();
            }
        });
    },
    'Upload':function(ele){
        var file = $(ele)[0].files[0];
        var type = file.name.split('.');
        if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
            Notiflix.Notify.Warning('只能选择excel文件导入!');
            return false;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e.target.result;
            const zzexcel = window.XLS.read(data, {
                type: 'binary'
            });
            const result = [];
            for (let i = 0; i < zzexcel.SheetNames.length; i++) {
                const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
                result.push(...newData);
            }
            // console.log('result', result);
            if (result.length === 0) {
                Notiflix.Notify.Warning('Excel文件数据为空');
                return;
            }
            Mucho.ExcelSave(result);
        };
    },
    'ExcelSave':function(result) {
        var obj = result[0];
        if (!obj.question || !obj.answer) {
            Notiflix.Notify.Failure('格式错误, 第一行必须是 question 和 answer');
            return;
        }
        Mucho.Alldb('excel', {data: JSON.stringify(result),}, 'data_manege.php');
    },
    // 更新时间
    'UpdataTime':{
        'Init':function(){
            var timerID = setInterval(Mucho.UpdataTime.Update, 1000);
            Mucho.UpdataTime.Update();
        },
        'Update':function(){
            var cd = new Date();
            var time= Mucho.UpdataTime.zeroPadding(cd.getHours(), 2) + ':' + Mucho.UpdataTime.zeroPadding(cd.getMinutes(), 2) + ':' + Mucho.UpdataTime.zeroPadding(cd.getSeconds(), 2);
            var data=Mucho.UpdataTime.zeroPadding(cd.getFullYear(), 4) + '-' + Mucho.UpdataTime.zeroPadding(cd.getMonth()+1, 2) + '-' + Mucho.UpdataTime.zeroPadding(cd.getDate(), 2);  
            $('#time').text(data+' '+time);
        },
        'zeroPadding':function(num, digit){
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    'Pop':{
        'Show':function(src, title) {
            if(!title){title = '数据详情';}
            var inntHtml = '';
            inntHtml += '<div id="mask"></div><div id="maskTop"><div id="maskTitle">'+ title + '<div id="popWinClose" class="fa fa-times"></div></div><iframe frameborder="0" scrolling="auto" src="' + src + '"></iframe></div>'
            $("body").append(inntHtml);
            $("#mask,#maskTop").fadeIn();
            Mucho.Pop.Close();
        },
        'Close':function(){
            $("#popWinClose").on('click', function() {
                $("#mask, #maskTop").fadeOut(function() {
                    $(this).remove();
                });
            });
        }
        
    },
    // 登录
    'Login':function(){
        var uname = $('input[name="uname"]').val();
        var upwd = $('input[name="upwd"]').val();
        if(uname == ''){
            Notiflix.Notify.Warning('用户名不能为空');
            $('input[name="uname"]').focus();
            return;
        }
        var data = {uname:uname, upwd:upwd};
        
        Mucho.Alldb('login', data, 'index.php');
    },
};

$(function(){
    //初始化
    Mucho.Init();

});
