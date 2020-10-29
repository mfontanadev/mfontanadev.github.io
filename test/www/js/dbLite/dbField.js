function DBField() 
{
    this.m_name = "";
    this.m_type = "";
    this.m_size = 0;
    this.m_primaryKey = false;
}

DBField.prototype.DBField_withNameType = function(_fieldName, _fieldType, _fieldSize, _primaryKey) 
{
	this.m_name = _fieldName;
    this.m_type = _fieldType;
	this.m_size = _fieldSize;
	this.m_primaryKey = _primaryKey;
}
	
DBField.prototype.getName = function()
{
    return this.m_name;
}

DBField.prototype.getType = function()
{
    return this.m_type;
}

DBField.prototype.getSize = function()
{
    return this.m_size;
}

DBField.prototype.isPrimaryKey = function()
{
    return this.m_primaryKey;
}

DBField.prototype.log = function()
{
    var logText = "";
    
    logText = "dbField: " + "m_name=" + this.getName() + ", ";
    logText += "m_type=" + this.getType() + ", ";
    logText += "m_size=" + this.getSize().toString() + ", ";
    logText += "m_primaryKey=" + this.isPrimaryKey().toString() + ";\r\n";

    return logText;
}
