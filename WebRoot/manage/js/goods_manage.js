




/**
 * 变量申明
 */
var goods_datagrid;
var goodsSearchForm;
//商品属性表格
//var editGoodPG;
//商品信息编辑弹窗
var editGoodDialog;
//编辑表单
var editGoodForm;
//新增商品表单
var insertGoodForm;
//新增商品的弹窗
var insertGoodDialog;
//保存当前编辑的商品的信息
var currtEditDatagridRow;
//地址
var province;
var city;
var county;
var region;

var goodsStatus;
//儲存clazz多選框的td
var clazzsTd;
var buyerIdSearch;
var sellerIdSearch;
//主圖尺寸
var mainImgSize = 200;

var goods_imgs_dialog;
var goods_imgs_datagrid;

var goods_upload_imgs_dialog;
var goods_upload_imgs_form;
$(function(){
	
	initGoodsManageVar();
	
	loadGoodsManageUI();
	
});
/**
 * 初始化变量
 */
function initGoodsManageVar(){
	goods_datagrid = $("#goods_datagrid");
	goodsSearchForm = $("#goodsSearchForm");
	editGoodPG = $("#editGoodPG");
	editGoodDialog = $("#editGoodDialog");
	editGoodForm = $("#editGoodForm");

	insertGoodDialog = $("#insertGoodDialog");
	insertGoodForm = $("#insertGoodForm");
	
	
	province = $("#province");
	city = $("#city");
	county = $("#county");
	
	region = $("#region");
	
	goodsStatus = editGoodForm.find("#status");
	
	clazzsTd = $("#clazzsTd");
	
	buyerIdSearch = goodsSearchForm.find("#buyer");
	sellerIdSearch = goodsSearchForm.find("#owner");
	
	goods_imgs_datagrid = $("#goods_imgs_datagrid");
	goods_imgs_dialog = $("#goods_imgs_dialog");
	
	goods_upload_imgs_dialog = $("#goods_upload_imgs_dialog");
	
	goods_upload_imgs_form = $("#goods_upload_imgs_form");
}
/**
 * 加载界面
 */
function loadGoodsManageUI(){
	
	
	
	
	
	
	
	//新增good信息窗口
	insertGoodDialog.dialog({   
	    title:"新增商品",
		resizable : true,
		modal : true,
		closed : true,
		borer:false
	});
	//修改good信息窗口
	editGoodDialog.dialog({   
	    title:"属性编辑",
		resizable : true,
		modal : true,
		closed : true,
		borer:false
	});
	
	

	//判斷加载參數
	if(users_to_goods_tab_context.contain('buyer')){
		buyerIdSearch.textbox("setValue",users_to_goods_tab_context.removeAttr("buyer"));
//		users_to_goods_tab_context.clear();
		
	}
	if(users_to_goods_tab_context.contain('owner')){
		sellerIdSearch.textbox("setValue",users_to_goods_tab_context.removeAttr("owner"));
//		users_to_goods_tab_context.clear();
	}
	
//	c(users_to_goods_tab_context.getContent());
	
	//加载goods的datagrid
	goods_datagrid.datagrid({    
	    url:manageForwardUrl+"/goods/selectGoodsDatagrid.action",
	    toolbar:"#goods_dg_tb",
	    queryParams:users_to_goods_tab_context.getContent(),
	    pagination:true,
	    striped:true,
	    fitColumns:true,
	    fit: true,
	    pageList: [5 , 10, 20, 30, 40, 50],
	    singleSelect:true,
		checkOnSelect:true,
		selectOncheck:true,
	    sortName : 'createtime',
	    sortOrder : 'desc', //降序
		hideColumn:[[
			{
				field:'id',
				title:'id'/*,
				width:270,
				sortable : true*/
			},
			{
				field:'buyer',
				title:'购买者id'
			},
			{
				field:'owner',
				title:'发布者id'
			},
			{
    			field:'ownerName',
    			title:'发布者',
    		},    
	        {
    			field:'buyerName',
    			title:'购买者',
    		}, 
		             ]],
		frozenColumns:[[
			
		                
		                ]],
		columns:[[ 
		    {
				field:'mainImg',
				title:'主圖',
				sortable : true,
				formatter: function(value,row,index){
						if(isEmpty(value)){
							value = "";
						}
						var goodsid = row.id;
						var goodstitle = row.title;
						var img = "<img style='width:80px;' src ='"+manageForwardUrl+"/goods/getGoodsImg.action?imgName="+value+"&size="+mainImgSize+"&t="+new Date().getTime()+"'/><div style='text-align:center;'><a style='color:red;' href=javascript:checkGoodsImgs('"+goodsid+"','"+goodstitle+"');>查看更多</a></div>";
						return img;
				}
			},
			{
				field:'status',
				title:'状态',
				sortable : true,
				formatter: function(value,row,index){
					
					return statusCode2String(value);
				}
			},
			{
				field:'title',
				title:'名称',
				sortable : true
			},
			{
				field:'description',
				title:'描述',
				sortable : true
			},
			{
	        	field:'custom_checkSeller',
	        	title:'发布者',
	    		sortable : true,
				formatter: function(value,row,index){
					var sellerId = row.owner;
					var sellerName = row.ownerName;
					var a = "<a style='color:red;' href=javascript:checkSeller(\'"+sellerId+"\',\'"+sellerName+"\');>"+sellerName+"</a>"
					return a;
				}
	        	
	        }, 
	        {
	        	field:'custom_checkbuyer',
	        	title:'购买者',
	    		sortable : true,
				formatter: function(value,row,index){
					var buyerId = row.buyer;
					if(isEmpty(buyerId)){
						return "无";
					}
					var buyerName = row.buyerName;
					var a = "<a style='color:red;' href=javascript:checkBuyer(\'"+buyerId+"\',\'"+buyerName+"\');>"+buyerName+"</a>"
					return a;
				}
	        	
	        }, 
    		{
    			field:'sprice',
    			title:'原价',
	    		sortable : true
    		},
    		{
    			field:'price',
    			title:'转让价格',
	    		sortable : true
    		},
    		{
    			field:'condition',
    			title:'新旧度',
	    		sortable : true
    		},
    		{
    			field:'regionDetail',
    			title:'地区',
	    		sortable : true
    		}, 
    		{
    			field:'clazzsDetail',
    			title:'類型',
	    		sortable : true
    		}, 
	        {
    			field:'createtime',
    			title:'创建时间',
	    		sortable : true,
	    		formatter: function(value,row,index){
	    			if(!isEmpty(value)){
	    				return new Date(value).format("yyyy-MM-dd HH:mm:ss")
	    			}
	    			return value;
	    		}
    		},    
	           
	        {
    			field:'browsenumber',
    			title:'浏览次数',
	    		sortable : true
    		},    
	        {
    			field:'lastupdatetime',
    			title:'最后一次被用户更新时间',
    			formatter: function(value,row,index){
	    			if(!isEmpty(value)){
	    				return new Date(value).format("yyyy-MM-dd HH:mm:ss")
	    			}
	    			return value;
	    		},
	    		sortable : true
    		},    
	        {
    			field:'buytime',
    			title:'被购买时间',
	    		sortable : true
    		},    
	        {
    			field:'finishtime',
    			title:'交易正常完成时间',
	    		sortable : true
    		}
			    
	    ]]    
	});  


}





/**
 * 编辑goods,弹出编辑框
 */
function editGood(){
	//获取datagrid当前选择行
	var row = goods_datagrid.datagrid('getSelected');
	if(isEmpty(row)){
		showMsg("请先选择行");
		return ;
	}
	
	
	//保存当前操作的商品的行
	currtEditDatagridRow = row;
	

	/**
	 * 清空旧的文本记录
	 */
	editGoodForm.clearEasyuiForm();
	
	
	
	
	/**
	 * 打开信息编辑
	 */
	editGoodDialog.dialog('open');
	
	/**
	 * 修改格式
	 */
	//格式化日期
	row.createtime = timeFormatter.formatTime(row.createtime);
	row.lastupdatetime = timeFormatter.formatTime(row.lastupdatetime);
	row.buytime = timeFormatter.formatTime(row.buytime);
	row.finishtime = timeFormatter.formatTime(row.finishtime);
	
	//获取省-市-县
	var regions = row.regionDetail.split("-");
	row.province = regions[0];
	row.city = regions[1];
	row.county = regions[2];
	
	/**
	 * 转化状态
	 */
	var statusCode = row.status;
	var statusStr = statusCode2String(statusCode);
	row.status = statusStr;
	/**
	 * 注入对象的name与form的id对应的表单对象
	 */
	editGoodForm.writeEasyuiForm(row);
	
	/**
	 * 设置状态选择框
	 */
	buildStatusCombobox({"text":statusStr,"value":statusCode});

	
	
	/**
	 * 设置地区选择框
	 */
	/*data: [{
		label: 'java',
		value: 'Java'
	},{
		label: 'perl',
		value: 'Perl'
	},{
		label: 'ruby',
		value: 'Ruby'
	}]*/
	

	var pid = "1";
	var url = manageForwardUrl+'/region/selectRegionByPid.action';

	//設置province
	/**
	 * 加载省
	 */
	ajax.sendSync(url+"?pid="+pid, function(data){
		
		province.combobox({ 
			valueField: 'value',
			textField: 'text',
		    onSelect:function(r){
		    	//onSelect
		    	/**
		    	 * 当省变化时,加载市
		    	 */
		    	var pid = r.value;
				ajax.sendSync(url+"?pid="+pid, function(data){
					city.combobox({ 
						valueField: 'value',
						textField: 'text',
					    onSelect:function(r){
					    	//onSelect
					    	/**
					    	 * 当市变化时,加载县
					    	 */
							var pid = r.value;
							ajax.sendSync(url+"?pid="+pid, function(data){
								county.combobox({ 
									valueField: 'value',
									textField: 'text',
								    onSelect:function(r){
								    	region.val(r.value);
								    }
								});	
								
								
								loadComboboxData(county,data);
								
								var countyId = findValueByText(county,row.county);
								
								county.combobox('select', countyId);  
							});
					    }
					});
					
					
					loadComboboxData(city,data);
					
					var cityId = findValueByText(city,row.city);
					
					city.combobox('select', cityId);  
				});
		    }
		});
		
		loadComboboxData(province,data);
		
		var provinceId = findValueByText(province,row.province);

		//select
		province.combobox("setValue",provinceId);

		
	});
	
	/**
	 * 加載類型信息
	 */
	url0 = manageForwardUrl+"/clazzs/selectClazzs.action";
	ajax.sendSync(url0, function(data){
		//清除缓存
		clazzsTd.html("");
		var rows = data.rows;
		for ( var i in rows) {
			var r = rows[i];
			var input = "<label><input type='checkbox' name='clazzs' value='"+r.id+"'/>"+r.text+"</label>";
			clazzsTd.append(input);
		}
		;
	});
	/**
	 * 选中checkbox
	 */

	var clazzs = undefined;
	if(!isEmpty(row.clazzsDetail)){
		clazzs = row.clazzsDetail.split('-');
	}
	clazzsTd.find('label').each(function (index, dom) {
		//写入代码
		var label = $(dom);
		var text = $(dom).text();
		if(contain(clazzs, text)){
			label.find('input').attr("checked",'checked');
		}
	});
	
}



/**
 * 构建状态选择下拉框
 * @param combo
 * @param itemObj
 */
function buildStatusCombobox(newItemObj){
	
	/*<option value="-6">待审核状态</option>  
    <option value="0">审核通过</option>*/
	var data = [{"text":"待审核","value":"-6"},
	            {"text":"审核通过","value":"0"}]; 

	/*goodsStatus.combobox("loadData", []);*/
	var append = true;
	for (var i = 0; i < data.length; i++) {
		var d = data[i];
		if(d.text == newItemObj.text){
			append = false;
			break;
		}
		
	}
	if(append){
		data.push(newItemObj);
	}
	goodsStatus.combobox({ 
		valueField: 'value',
		textField: 'text',
		data:data
	});
	/*
	goodsStatus.combobox("loadData", data);*/
	goodsStatus.combobox("select",newItemObj.value);
	
}
/**
 * 轉化,加載combobox數據
 */
function loadComboboxData(combox,data,onSelect){
	var regions = data.childs;
	var data = [];
	for ( var i in regions) {
		var region = regions[i];
		data.push({"text":region.name,"value":region.id});
	}
	combox.combobox("loadData", data);
}
/**
 * 比較text獲取value
 * @param combobox
 * @param text
 * @returns
 */
function findValueByText(combo,text){
	var data = combo.combobox("getData");
	for ( var i in data) {
		var t = data[i].text;
		var v = data[i].value;
		if(t == text){
			return v;
		}
	}
	return "";
}
/**
 * 提交商品修改后的信息
 */
function submitGoodEdit(){

	//提示信息
	pro.show("正在修改");
	
	
	editGoodForm.form('submit', {    
	    url:manageForwardUrl+"/goods/updateGood.action",    
	    ajax:true,
	    iframe:false,
	    onSubmit: function(){   
	    	if(!editGoodForm.form('validate')){
	    		pro.close();
	    		return false;
	    	}
	    	//关闭信息编辑
	    	editGoodDialog.dialog('close');
	    },    
	    success:function(data){ 
//	    	c(data);
	    	data = JSON.parse(data);
	    	
	    	pro.close();
			//提示信息
			showMsg(data.msg);

			if(data.result == 1){
				//更新成功
				
				//刷新表格
				goods_datagrid.datagrid("reload");
				
			}else{
				//失敗
				//打開信息编辑
				editGoodDialog.dialog('open');
			}
	    } ,
	    onLoadError:function(){
	    	//失敗
			//提示信息
			showMsg(data.msg);
	    	//关闭进度条
	    	pro.close();
			//打開信息编辑
			editGoodDialog.dialog('open');
	    }
	});  

	
	

}
/**
 * 重置用戶信息
 */
function resetGood(){
	
	editGood();
	
	showMsg("重置成功");
}

/**
 * 删除商品
 */
function deleteGood(){
	//确认删除?
	confirm("确认删除 "+currtEditDatagridRow.title+" ?",function(r){
		if(r){
			//进度条
			
			
			var id = currtEditDatagridRow.id;
			ajax.send(manageForwardUrl+"/goods/deleteGood.action?id="+id, 
			function(data){
				//显示信息
				showMsg(data.msg);
				
				//关闭信息编辑
				editGoodDialog.dialog('close');
				
				//刷新表格
				goods_datagrid.datagrid("reload");
				
			}, function(){
				
			});
		}
	});
	
	
	
}

/**
 * 按条件搜索goods
 */
function searchGoods(){
	//form转js对象
	var searchConditions = goodsSearchForm.serializeObject();
	/*//合并参数
	for ( var name in goods_datagrid_queryParams) {
		var value = goods_datagrid_queryParams[name];
		searchConditions[name] = value;
	}*/
	
	goods_datagrid.datagrid('load',searchConditions);
}

function clearGoodSearch(){
	//清空条件
	goodsSearchForm.clearEasyuiForm();
	//重新加载数据
	goods_datagrid.datagrid('load',{});
}


/********************************添加商品****************************/

/**
 * 新增goods,弹出新增框
 */
function insertGood(){

	
	insertGoodDialog.dialog('open');
	
	
}


/**
 * 清空旧的文本记录
 */
function clearInsertGoodForm(){
	//清空旧的文本记录
	insertGoodForm.clearEasyuiForm();
	
}

/**
 * 转化状态码为状态字符
 */
function statusCode2String(statusCode){
	
	/*状态:,
	-6:待审核状态,(不可以被显示,不可以购买)
	0:审核通过,(可以被显示,可以购买)
	1:购买了且待发货,
	2:已发货,
	-1:买家收货后交易正常结束,
	-5:管理员删除本商品*/
	var s = statusCode;
	switch (statusCode) {
		case -6:
			s = "待审核";
			break;
		case 0:
			s = "审核通过";
			break;
		case 1:
			s = "待发货";
			break;
		case 2:
			s = "已发货";
			break;
		case -1:
			s = "交易结束";
			break;
			
		default:
			break;
	}
	
	return s;
}

/**
 * 查詢顯示制定goodsid的圖片列表
 * @param goodsid
 */
var currtShowImgsGoodsId;
function checkGoodsImgs(goodsid,goodstitle){
	
	
	//記錄goodsid
	currtShowImgsGoodsId = goodsid;
	//goods图片列表弹窗
	goods_imgs_dialog.dialog({   
	    title:"商品 "+goodstitle+" 的图片",
		resizable : true,
		modal : true,
		borer:false,
		onDestroy:function(){
			goods_datagrid.datagrid("reload");
		},
		onClose:function(){

			goods_datagrid.datagrid("reload");
			
			
			
		}
	});
	//商品图片列表
	goods_imgs_datagrid.datagrid({    
	    /*toolbar:'#goods_imgs_dg_tb',*/
		url:manageForwardUrl+"/goods/selectGoodsImgsDatagrid.action?id="+goodsid,
		toolbar:[
				{
					text:"添加图片",
					iconCls:'icon-add',
					handler:function(){
						openAddGoodsImgDialog();
					}
				}],
	    pagination:true,
	    striped:true,
	    fitColumns:true,
	    fit: true,
	    pageList: [5 , 10, 20, 30, 40, 50],
	    singleSelect:true,
		checkOnSelect:true,
		selectOncheck:true,
		columns:[[
		          
			{
				field:'path',
				title:'图片',
				sortable : true,
				formatter: function(value,row,index){
						if(isEmpty(value)){
							value = "";
						}
						var goodsid = row.id;
						var img = "<img style='width:80px;' src ='"+manageForwardUrl+"/goods/getGoodsImg.action?imgName="+value+"&size="+mainImgSize+"&t="+new Date().getTime()+"'/>";
						return img;
				}
			}  ,
			{
				field:'main',
				title:'是否为主图',
				sortable : true,
				formatter: function(value,row,index){
						if(isEmpty(value)){
							value = "";
						}
						value = value==0?"非主图":"主图";
						return value;
				}
			},
			{
				field:'id',
				title:'删除图片',
				sortable : true,
				formatter: function(value,row,index){
						var goodsImgsId = row.id;
						var del = "<a href=javascript:deleteGoodsImg('"+goodsImgsId+"');>删除</a>";
						return del;
				}
			},
			{
				field:'custom_updateMainImg',
				title:'设置为主图',
				sortable : true,
				formatter: function(value,row,index){
						var goodsImgsId = row.id;
						var a = "<a href=javascript:updateMainImg('"+currtShowImgsGoodsId+"','"+goodsImgsId+"');>设置为主图</a>";
						return a;
				}
			}
		]]
	});
	
	//加载goods图片列表
	/*goods_imgs_datagrid.datagrid({
		
	});
	*/
	
	
}


/**
 * 删除商品图片
 * @param goodsImgId
 */
function deleteGoodsImg(goodsImgId){
	ajax.send(manageForwardUrl+"/goods/deleteGoodsImg.action?id="+goodsImgId, 
			function(data){
				c(data);
				goods_imgs_datagrid.datagrid("reload");
			}, function(){
				
			});
}
/**
 * 更新商品主图
 * @param goodsId
 * @param goodImgId
 */
function updateMainImg(goodsId,goodImgId){
	ajax.send(manageForwardUrl+"/goods/updateGoodsMainImg.action?owner="+goodsId+"&id="+goodImgId, 
	function(data){
//		c(data);
		goods_imgs_datagrid.datagrid("reload");
	}, function(){
		
	});
}

/**
 * 打开图片上传对话框
 */
function openAddGoodsImgDialog(){
	goods_upload_imgs_dialog.dialog({   
	    title:"新增商品商品图片",
		resizable : true,
		modal : true,
		closed : false,
		borer:false,
		onOpen:function(){
			goods_upload_imgs_form.clearEasyuiForm();
		}
	});
}
/**
 * 提交商品图片
 */
function submitGoodsImgs(){
	pro.show();
	goods_upload_imgs_form.form('submit', {    
	    url:manageForwardUrl+"/goods/uploadGoodsImgs.action?id="+currtShowImgsGoodsId,    
	    ajax:true,
	    iframe:false,
	    onSubmit: function(){   
	    	if(!goods_upload_imgs_form.form('validate')){
	    		pro.close();
	    		return false;
	    	}
	    	//关闭图片上传窗口
	    	goods_upload_imgs_dialog.dialog('close');
	    },    
	    success:function(data){ 
//	    	c(data);
	    	data = JSON.parse(data);
	    	
	    	pro.close();
			//提示信息
			showMsg(data.msg);

			if(data.result == 1){
				//更新成功
				
				//刷新商品图片列表
				goods_imgs_datagrid.datagrid("reload");
				
			}else{
				//失敗
		    	//打开图片上传窗口
//		    	goods_upload_imgs_dialog.dialog('open');
			}
	    } ,
	    onLoadError:function(){
	    	//失敗
			//提示信息
			showMsg(data.msg);
	    	//关闭进度条
	    	pro.close();
			//打開图片上传窗口
//	    	goods_upload_imgs_dialog.dialog('open');
	    }
	});  
}

/**
 * 查看出售者
 * @param sellerId
 * @param sellName
 */
function checkSeller(sellerId,sellName){
	confirm("确认查询 "+sellName+" 的商品出售信息?", function(r){
		if(r){
			if(tabs.tabs('exists',users_manage_tab_title)){
				
				tabs.tabs('select',users_manage_tab_title);
				//清空条件
				usersSearchForm.clearEasyuiForm();
				
				usserIdSearch.textbox("setValue",sellerId);
				
				searchUsers();
				
				return;
			}

			
			goods_to_users_tab_context.clear();
			
			goods_to_users_tab_context.setAttr("id", sellerId);
			
			addTab(users_manage_tab_title,users_manage_tab_url);
			
		}
	});
}

/**
 * 查看购买者
 * @param buyerId
 * @param buyerName
 */
function checkBuyer(buyerId,buyerName){
	confirm("确认查询 "+buyerName+" 的商品出售信息?", function(r){
		if(r){
			if(tabs.tabs('exists',users_manage_tab_title)){
				
				tabs.tabs('select',users_manage_tab_title);
				//清空条件
				usersSearchForm.clearEasyuiForm();
				
				usserIdSearch.textbox("setValue",buyerId);
				
				searchUsers();
				
				return;
			}

			
			goods_to_users_tab_context.clear();
			
			goods_to_users_tab_context.setAttr("id", buyerId);
			
			addTab(users_manage_tab_title,users_manage_tab_url);
			
		}
	});
}
