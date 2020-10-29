ConfigEntity.C_LAST_CHARGE_DATE = "LAST_CHARGE_DATE";
ConfigEntity.C_LAST_LOGIN_DATETIME = "C_LAST_LOGIN_DATETIME";
    
function ConfigEntity() 
{
    this.m_key = "";
    this.m_value = "";
}

ConfigEntity.prototype.init = function(_key, _value) 
{
    this.m_key = _key;
    this.m_value = _value;
}

ConfigEntity.prototype.setKey = function(_key) 
{
    this.m_key = _key;
}

ConfigEntity.prototype.getKey = function() 
{
    return this.m_key;
}

ConfigEntity.prototype.setValue = function( _value) 
{
    this.m_value = _value;
}

ConfigEntity.prototype.getValue = function() 
{
    return this.m_value;
}

ConfigEntity.prototype.toString = function()
{
  	return m_value;
}
	
ConfigEntity.prototype.log = function() 
{
    return "ConfigEntity: "+
	"m_key=" + getKey() + ", " + 
	"m_value=" + getValue() + "; ";
}

ConfigEntity.prototype.compare = function(_arg1) 
{
	return this.getKey().compare(_arg1.getKey());
}
