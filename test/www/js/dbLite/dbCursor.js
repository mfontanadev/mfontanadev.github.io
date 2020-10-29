function DBCursor() 
{
    this.m_rows = new Array();
}

DBCursor.prototype.insertRow = function(_row)
{
    this.m_rows.push(_row);
}

DBCursor.prototype.rows = function()
{
    return this.m_rows;
}

DBCursor.prototype.setRows = function(_rows)
{
    this.m_rows = _rows;
}

DBCursor.prototype.next = function()
{
}

DBCursor.prototype.previous = function()
{
}

DBCursor.prototype.getString = function(_rowIndex, _fieldIndex)
{
    var result = "";
    
    if (_rowIndex < this.m_rows.length && this.m_rows.length > 0 &&
        _fieldIndex < this.m_rows[0].length)
    {
        result = this.m_rows[_rowIndex][_fieldIndex];
    }
    
    return result;
}


DBCursor.prototype.getRecord = function(_rowIndex)
{
    var result = null;
    
    if (_rowIndex < this.m_rows.lenght && this.m_rows.lenght > 0)
    {
        result = m_rows[_rowIndex];
    }
    
    return result;
}

