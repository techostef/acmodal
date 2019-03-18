!(function( $ ){

    "use strict";
    
    var ACModel = function ( element, options ) {
        this.options = $.extend({}, $.fn.acmodel.defaults, options);
        if(typeof(this.options.updateUrl)=="string"){
            
        }
        this.template = this.options.template || this.template
        this.$source = $(element);
        this.data = [] ;
        this.url = this.options.url;
        this.resultJson = [];
        this.resultSearch = "";
        this.outerTemplate = "";
        this.modal = "";
        this.containerForm = "";
        this.formAutoCompleteModal = "";
        this.formList = "";
        this.footer = "<div class='container-fluid'></div>";
        this.footer = $(this.footer);
        this.footerRow = "<div class='row'></div>";
        this.footerRow = $(this.footerRow);
        this.pagination = "";
        this.paginationContainer = "";
        this.search = "<input class='form-control' id='searchAutoCompleteModal' placeholder='Search'/>";
        this.search = $(this.search);
        this.submitContainer = "<div class='pull-left pagination'><ul class='pagination'></ul></div>";
        this.submitContainer = $(this.submitContainer);
        this.submit = "<button class='btn btn-primary'>Submit</button>";
        this.submit = $(this.submit);
        this.cancel = "<button class='btn btn-danger' style='margin-left:20px;'>Cancel</button>";
        this.cancel = $(this.cancel);
        this.ke = 0;
        this.ke_max = 0;
        this.change = this.options.change?this.options.change:false;
        this.trigger();
        
    };
    ACModel.prototype = {

        constructor: ACModel
        , setup:function (){
            var style = "position: fixed;"+
                "width: 100%;"+
                "height: 100vh;"+
                "top: 0;"+
                "left: 0;"+
                "background: #000000ba;"+
                "z-index: 999999999;";
            this.outerTemplate = "<div id='templateAutoComplate' style='"+style+"'></div>";
            style = 
                "border: 1px solid black;"+
                "border-radius: 15px;"+
                "background:white;"+
                "width: 90%;"+
                "padding: 10px;"+
                "max-height: 690px;"+
                "margin: 50px auto";
            this.containerForm = "<div style='"+style+"'></div>";
            style = "width: 100%;";
           
            this.formAutoCompleteModal = "<div class='form-group'><label>Search</label></div>";
            this.formList = "<div></div>";
            this.pagination = '<div class="pull-right pagination"></div>';
            this.pagination = $(this.pagination);
            this.paginationContainer = '<ul class="pagination"></ul>';
            this.paginationContainer = $(this.paginationContainer);
        }
        , getUrl:function(){
            return this.url;
        }
        , setUrl:function(url){
            this.url = url;
        }
        , submitAct: function(){
            var th = this;
            var val = false;
            var text = "";
            this.submit.click(function(){
                $("input[name='checkboxautocomplate']").each(function(item,i){
                    if($(this).prop("checked")){
                        val = $(this).val();
                        text = $(this).attr("data-text");
                        return false; 
                    }
                })
                
                if(val==false){
                    alert("Tolong Pilih.");
                    return false;
                }else{
                    if(th.$source.prop("tagName")=="SELECT"){
                        th.$source.html("");
                        th.$source.append("<option value='"+val+"'>"+text+"</option>");
                        th.modal.remove();
                    }else if(th.$source.prop("tagName")=="INPUT"){
                        th.$source.val(val);
                        th.modal.remove();
                    }
                    if(typeof(th.change)=='function'){
                        th.change();
                    }
                }
            })
        },
        change:function(data){
            data();
        }
        , cancelAct: function(){
            var th = this;
            this.cancel.click(function(){
                th.modal.remove();
            })
        }
        , labelClick: function(id){
            var string = 'var select = $("#'+id+'");'+
            'if(select.prop("checked")){'+
                'select.prop("checked",false);'+
            '}else{'+
                'select.prop("checked",true);'+
            '}';
            return string;
        }
        , paginationlist: function(num){
            var row = "";
            var i;
            for(i=1;i<=num;i++){
                if(i==1) { 
                    row += '<li class="ACModelPagination page-first" data-ke="1"><a href="#"><<</a></li>';
                    // row += '<li class="ACModelPagination page-pre" data-ke="prev"><a href="#"><</a></li>';
                }
                row += '<li class="ACModelPagination page-number" data-ke="'+i+'"><a href="#">'+i+'</a></li>';
                if(i==num) { 
                    // row += '<li class="ACModelPagination page-next" data-ke="next"><a href="#">></a></li>';
                    row += '<li class="ACModelPagination page-last" data-ke="last"><a href="#">>></a></li>';
                }
            }
            return row;
        }
        , searching : function(){
            var th = this;
            var val = "";
            this.search.keyup(function(){
                val = $(this).val().toLowerCase();
                th.resultSearch = th.resultJson.filter(function(item){
                    return item.b.toLowerCase().indexOf(val)>=0||item.c.toLowerCase().indexOf(val)>=0;
                })
                th.formList.html("");
                th.formList.html(th.dataKe(1));
                var paginationNum = 0;
                var row = th.resultSearch.length;
                paginationNum = parseInt(row/10);
                paginationNum = row%10>=1?paginationNum+1:paginationNum;
                th.ke_max = paginationNum;
                th.paginationContainer.html("");
                th.paginationContainer.html(th.paginationlist(paginationNum));
            })
        }
        , generatelist: function(row){
            var id;
            var th=this;
            var max;
            var temp = "",item;
            max = row + 10;
            for(row;row<max;row++){
                item = this.resultSearch[row];
                if(!item)break;
                id = row+""+Math.floor(Math.random() * 100);
                var checked = item.a==this.$source.val()?"checked":"";
                var input = "<input type='radio' id='"+id+"' data-text='"+item.b+" - "+item.c+"' name='checkboxautocomplate' value='"+item.a+"' "+checked+">";
                var label = "<label onclick='"+th.labelClick(id)+"'>"+item.b+" - "+item.c+"</label>";
                temp += "<li class='list-group-item' data-target='"+item.a+"'>"+input+""+label+"</li>";
            }
            return temp;
        }
        , dataKe: function(ke){
            this.ke = ke;
            var row;
            var temp = '';
            if((/^\d+$/.test(ke))){
                row = (ke-1)*10;
                temp += this.generatelist(row);
            }else{
                if(ke=="first"){
                    row=1;
                    temp += this.generatelist(row);
                }else if(ke=="last"){
                    row=(this.ke_max-1)*10;
                    temp += this.generatelist(row);
                }
            }
            return temp;
        }
        , paginationAct: function(){
            var th = this;
            $("body").on("click",".ACModelPagination",function(){
                th.formList.html("");
                th.formList.html(th.dataKe($(this).attr("data-ke")));
            })
        }
        , getdataajax: function(){
            var th = this;
            $.ajax({
                url:this.url,
                success:function(data){
                    data = JSON.parse(data);
                    var temp = "";
                    var row = 0;
                    th.resultJson = [];
                    data.forEach(function(item,i){
                        row ++;
                        th.resultJson.push(item);
                    })
                    if(th.resultJson.length>0){
                        th.ke = 1;
                        var paginationNum = 0;
                        th.resultSearch = th.resultJson;
                        temp = th.generatelist(0);
                        if(row>10){
                            paginationNum = parseInt(row/10);
                            paginationNum = row%10>=1?paginationNum+1:paginationNum;
                            th.ke_max = paginationNum;
                        }
                        th.formList.append(temp);
                        th.footerRow.append(th.pagination);
                        th.pagination.append(th.paginationContainer);
                        th.paginationContainer.append(th.paginationlist(paginationNum));
                        // row+=2;
                        // th.containerForm.css({height:(row*44)+"px"});
                    }
                }
            });
        }
        , trigger: function () {
            var th = this;
            this.$source.click(function(){
                th.setup();
                th.paginationAct();
                th.searching();
                th.submitAct();
                th.cancelAct();
                
                // modal
                
                th.modal = $(th.outerTemplate);
                
                th.containerForm = $(th.containerForm);
                th.modal.append(th.containerForm);
                
                th.formAutoCompleteModal = $(th.formAutoCompleteModal);
                th.formList = $(th.formList);
                th.containerForm.append(th.formAutoCompleteModal);
                th.formAutoCompleteModal.append(th.search);
                th.formAutoCompleteModal.append(th.formList);
                th.formAutoCompleteModal.append(th.footer);
                th.footer.append(th.footerRow);
                th.footerRow.append(th.submitContainer);
                th.submitContainer.append(th.submit);
                th.submitContainer.append(th.cancel);
                th.search.val("");
               
                th.getdataajax();
                $("body").append(th.modal); 
                th.modal.click(function(e){
                    if(e.target.id=="templateAutoComplate"){
                        th.modal.remove();
                        th.formAutoCompleteModal.remove();
                    }
                })
                $("#searchAutoCompleteModal").focus();
            })
        }
        
    };

    $.fn.acmodel = function ( option ) {
        if(option=='return'){
            return this.data('acmodel');
        }else{
            return this.each(function () {
                var $this = $(this)
                    , data = $this.data('acmodel')
                    , options = typeof option == 'object' && option;
                if(!data) {$this.data('acmodel', (data = new ACModel(this, options)));}
                if (typeof option == 'string') {data[option]();}
            });
        }
        
    };
    $.fn.acmodel.defaults = {
        bsVersion: '3'
        , menu: '<ul class="typeahead typeahead-long dropdown-menu"></ul>'
        , item: '<li><a href="#"></a></li>'
    };

    $.fn.acmodel.Constructor = ACModel;

})( window.jQuery );