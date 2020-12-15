function SpentEntity() 
{
    this.m_id = "";
    this.m_UserId = "";
    this.m_Player1Spent = "";
    this.m_Player2Spent = "";
    this.m_Date = "";
    this.m_CategoryId = "";
    this.m_SubCategoryId = "";
    this.m_Detail = "";
}

SpentEntity.prototype.init = function(_id, _UserId, _Player1Spent, _Player2Spent, _Date, _CategoryId, _SubCategoryId, _Detail) 
{
    this.setId(_id);
    this.setUserId(_UserId);
    this.setPlayer1Spent(_Player1Spent);
    this.setPlayer2Spent(_Player2Spent);
    this.setDate(_Date);
    this.setCategoryId(_CategoryId);
    this.setSubCategoryId(_SubCategoryId);
    this.setDetail(_Detail);
}

SpentEntity.prototype.setId = function(_id) 
{
    this.m_id = _id;
}

SpentEntity.prototype.getId = function() 
{
    return this.m_id;
}

SpentEntity.prototype.setUserId = function(_UserId) 
{
    this.m_UserId = _UserId;
}

SpentEntity.prototype.getUserId = function() 
{
    return this.m_UserId;
}

SpentEntity.prototype.setPlayer1Spent = function(_Player1Spent) 
{
    this.m_Player1Spent = _Player1Spent;
}

SpentEntity.prototype.getPlayer1Spent = function() 
{
    return this.m_Player1Spent;
}

SpentEntity.prototype.getPlayer1Spent_float = function() 
{
    var val = "0";
    if (this.m_Player1Spent !== "")
        val = this.m_Player1Spent;
        
    return parseFloat(val);
}

SpentEntity.prototype.setPlayer2Spent = function(_Player2Spent) 
{
    this.m_Player2Spent = _Player2Spent;
}

SpentEntity.prototype.getPlayer2Spent = function() 
{
    return this.m_Player2Spent;
}

SpentEntity.prototype.getPlayer2Spent_float = function() 
{
    var val = "0";
    if (this.m_Player1Spent !== "")
        val = this.m_Player2Spent;
        
    return parseFloat(val);
}

SpentEntity.prototype.setDate = function(_Date) 
{
    if (_Date === "")
        this.m_Date = Helper.getCurrentDateWithTime();
    else
        this.m_Date = _Date;
}

SpentEntity.prototype.getDate = function() 
{
    if (this.m_Date === "")
        return Helper.getCurrentDateWithTime();
    else
        return this.m_Date;
}

SpentEntity.prototype.getDate_yyyy = function() 
{
    return Helper.getDate_yyyy(this.getDate());
}

SpentEntity.prototype.getDate_mm = function() 
{
    return Helper.getDate_mm(this.getDate());
}

SpentEntity.prototype.getDate_dd = function() 
{
    return Helper.getDate_dd(this.getDate());
}

SpentEntity.prototype.getDate_KeyForMonthSelector = function()  
{
    var sYear = this.getDate_yyyy().toString();
    var sMonth = this.getDate_mm().toString();
    var sDay = "1";

    return Helper.stringLeftFill(sYear, "0", 4) + "/" + Helper.stringLeftFill(sMonth, "0", 2) + "/" + Helper.stringLeftFill(sDay, "0", 2);  
}

SpentEntity.prototype.getDate_YYYMMDD = function()  
{
    var sYear = this.getDate_yyyy().toString();
    var sMonth = this.getDate_mm().toString();
    var sDay =  this.getDate_dd().toString();

    return Helper.stringLeftFill(sYear, "0", 4) + "/" + Helper.stringLeftFill(sMonth, "0", 2) + "/" + Helper.stringLeftFill(sDay, "0", 2);  
}

SpentEntity.prototype.setDateWithTime = function(_yyyy, _mm, _dd) 
{
    this.setDate(Helper.getDateWithTime(_yyyy, _mm, _dd, this.m_Date.substring(11, 19)));
}

SpentEntity.prototype.setCategoryDefault = function() 
{
    this.setCategoryId("");
}

SpentEntity.prototype.setCategoryId = function(_CategoryId) 
{
    this.m_CategoryId = _CategoryId;
}

SpentEntity.prototype.getCategoryId = function() 
{
    return this.m_CategoryId;
}

SpentEntity.prototype.setSubCategoryDefault = function() 
{
    this.setSubCategoryId("");
}

SpentEntity.prototype.setSubCategoryId = function(_SubCategoryId) 
{
    this.m_SubCategoryId = _SubCategoryId;
}

SpentEntity.prototype.getSubCategoryId = function() 
{
    return this.m_SubCategoryId;
}

SpentEntity.prototype.setDetail = function(_Detail) 
{
    this.m_Detail = _Detail;
}

SpentEntity.prototype.getDetail = function() 
{
    return this.m_Detail;
}

SpentEntity.prototype.toString = function()
{
  	return "(" + this.getId() + ")" + this.getDetail();
}

SpentEntity.prototype.showSpentDetail = function()
{
    return this.m_Player1Spent + " / " + this.m_Player2Spent;
}

SpentEntity.prototype.log = function() 
{
    return "SpentEntity: "+
	"m_id=" + this.getId() + ", " + 
	"m_UserId=" + this.getUserId() + "; " +
	"m_Player1Spent=" + this.getPlayer1Spent() + "; " +
	"m_Player2Spent=" + this.getPlayer2Spent() + "; " +
	"m_Date=" + this.getDate() + "; " +
    "m_CategoryId=" + this.getCategoryId() + "; " +
    "m_SubCategoryId=" + this.getSubCategoryId() + "; " +
	"m_Detail=" + this.getDetail() + "; ";
}

SpentEntity.prototype.compare = function(_spentEntity) 
{
	return this.getDate().localeCompare(_spentEntity.getDate());
}

SpentEntity.prototype.getRecord = function() 
{
    var record = new Array();

    record.push(this.getId());
    record.push(this.getUserId());
    record.push(this.getPlayer1Spent());
    record.push(this.getPlayer2Spent());
    record.push(this.getDate());
    record.push(this.getCategoryId());
    record.push(this.getSubCategoryId());
    record.push(this.getDetail());

    return record;
}
