   
function CategoryEntity() 
{
    this.m_Id = "";
    this.m_Name = "";
    this.m_ZOrder = "";
}

CategoryEntity.prototype.init = function(_Id, _Name, _ZOrder) 
{
    this.m_Id = _Id;
    this.m_Name = _Name;
    this.m_ZOrder = _ZOrder;
}

CategoryEntity.prototype.setId = function(_id) 
{
    this.m_Id = _Id;
}

CategoryEntity.prototype.getId = function() 
{
    return this.m_Id;
}

CategoryEntity.prototype.setName = function(_name) 
{
    this.m_Name = _name;
}

CategoryEntity.prototype.getName = function() 
{
    return this.m_Name;
}

CategoryEntity.prototype.setZOrder = function(_zOrder) 
{
    this.m_ZOrder = _zOrder;
}

CategoryEntity.prototype.getZOrder = function() 
{
    return this.m_ZOrder;
}

CategoryEntity.prototype.toString = function()
{
  	return this.m_Name;
}
	
CategoryEntity.prototype.log = function() 
{
    return "CategoryEntity: "+
	"m_Id=" + this.getId() + ", " + 
	"m_Name=" + this.getName() + ", "+
	"m_ZOrder=" + this.getZOrder() + "; ";
}

CategoryEntity.prototype.compare = function(_arg1) 
{
    if (this.getName() > _arg1.getName())
        return 1;
    else if (this.getName() < _arg1.getName())
        return -1;
    else
        return 0;
}
