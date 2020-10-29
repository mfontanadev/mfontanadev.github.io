function UserEntity() 
{
    this.m_id = "";
    this.m_username = "";
    this.m_password = "";
    this.m_recoverQuestion = "";
    this.m_recoverAnswer = "";
}

UserEntity.prototype.init = function(_id, _userName, _password, _recoverQuestion, _recoverAnswer) 
{
    this.setId(_id);
    this.setUsername(_userName);
    this.setPassword(_password);
    this.setRecoveryQuestion(_recoverQuestion);
    this.setRecoveryAnswer(_recoverAnswer);
}

UserEntity.prototype.setId = function(_id) 
{
    this.m_id = _id;
}

UserEntity.prototype.getId = function() 
{
    return this.m_id;
}

UserEntity.prototype.setUsername = function(_userName) 
{
    this.m_username = _userName;
}

UserEntity.prototype.getUsername = function() 
{
    return this.m_username;
}

UserEntity.prototype.setPassword = function(_password) 
{
    this.m_password = _password;
}

UserEntity.prototype.getPassword = function() 
{
    return this.m_password;
}

UserEntity.prototype.setRecoveryQuestion = function(_recoverQuestion) 
{
    this.m_recoverQuestion = _recoverQuestion;
}

UserEntity.prototype.getRecoveryQuestion = function() 
{
    return this.m_recoverQuestion;
}

UserEntity.prototype.setRecoveryAnswer = function(_recoverAnswer) 
{
    this.m_recoverAnswer = _recoverAnswer;
}

UserEntity.prototype.getRecoveryAnswer = function() 
{
    return this.m_recoverAnswer;
}

UserEntity.prototype.toString = function()
{
  	return m_id + " " + this.m_username;
}

UserEntity.prototype.log = function() 
{
    return "UserEntity: "+
	"m_id=" + this.getId() + ", " + 
	"m_username=" + this.getUsername() + "; " +
	"m_password=" + this.getPassword() + "; " +
	"m_recoveryQuestoin=" + this.getRecoveryQuestion() + "; " +
	"m_recoveryAnswer=" + this.getRecoveryAnswer() + "; ";
}

UserEntity.prototype.compare = function(_arg1) 
{
	return this.getId().compare(_arg1.getId());
}

UserEntity.prototype.getRecord = function() 
{
    var record = new Array();

    record.push(this.getId());
    record.push(this.getUsername());
    record.push(this.getPassword());
    record.push(this.getRecoveryQuestion());
    record.push(this.getRecoveryAnswer());

    return record;
}