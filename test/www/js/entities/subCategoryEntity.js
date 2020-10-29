   
function SubCategoryEntity() 
{
    this.m_Id = "";
    this.m_CategoryId = "";
    this.m_Name = "";
    this.m_ZOrder = "";
}

SubCategoryEntity.prototype.init = function(_Id, _CategoryId, _Name, _ZOrder) 
{
    this.m_Id = _Id;
    this.m_CategoryId = _CategoryId;
    this.m_Name = _Name;
    this.m_ZOrder = _ZOrder;
}

SubCategoryEntity.prototype.setId = function(_id) 
{
    this.m_Id = _Id;
}

SubCategoryEntity.prototype.getId = function() 
{
    return this.m_Id;
}

SubCategoryEntity.prototype.setCategoryId = function(_CategoryId) 
{
    this.m_CategoryId = _CategoryId;
}

SubCategoryEntity.prototype.getCategoryId = function() 
{
    return this.m_CategoryId;
}

SubCategoryEntity.prototype.setName = function(_name) 
{
    this.m_Name = _name;
}

SubCategoryEntity.prototype.getName = function() 
{
    return this.m_Name;
}

SubCategoryEntity.prototype.setZOrder = function(_zOrder) 
{
    this.m_ZOrder = _zOrder;
}

SubCategoryEntity.prototype.getZOrder = function() 
{
    return this.m_ZOrder;
}

SubCategoryEntity.prototype.toString = function()
{
  	return this.m_Name;
}
	
SubCategoryEntity.prototype.log = function() 
{
    return "SubCategoryEntity: "+
    "m_Id=" + this.getId() + ", " + 
    "m_CategoryId=" + this.getCategoryId() + ", " + 
	"m_Name=" + this.getName() + ", "+
	"m_ZOrder=" + this.getZOrder() + "; ";
}

SubCategoryEntity.prototype.compare = function(_arg1) 
{
    if (this.getName() > _arg1.getName())
        return 1;
    else if (this.getName() < _arg1.getName())
        return -1;
    else
        return 0;
}