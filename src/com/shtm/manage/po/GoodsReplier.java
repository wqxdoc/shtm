package com.shtm.manage.po;

import java.util.List;

import com.shtm.po.Goods;

/**
 * Title:GoodsReplier
 * <p>
 * Description:goods信息返回者;
 * <p>
 * 
 * @author Kor_Zhang
 * @date 2017年9月23日 下午2:22:36
 * @version 1.0
 */
public class GoodsReplier<T> extends Goods {
	// 操作结果
	private Integer result;

	// 返回信息
	private String msg;

	public Integer getResult() {
		return result;
	}

	public void setResult(Integer result) {
		this.result = result;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	// 返回数据
	private List<T> rows;

	// 记录总数
	private Integer total;

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}
	
	
	/**
	 * 数据库查询的字段
	 */
	//保存数据库查出的用户名
	private String buyerName;
	//保存数据库查出的用户名
	private String ownerName;
	//保存数据库查出地址:省-市-县
	private String regionDetail;
	//保存数据库查出的商品類型:類型1-类型2
	private String clazzsDetail;
	
	public String getClazzsDetail() {
		return clazzsDetail;
	}

	public void setClazzsDetail(String clazzsDetail) {
		this.clazzsDetail = clazzsDetail;
	}

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getRegionDetail() {
		return regionDetail;
	}

	public void setRegionDetail(String regionDetail) {
		this.regionDetail = regionDetail;
	}
	
	//數據庫查詢出來的主圖
	private String mainImg;

	public String getMainImg() {
		return mainImg;
	}

	public void setMainImg(String mainImg) {
		this.mainImg = mainImg;
	}
	
}
