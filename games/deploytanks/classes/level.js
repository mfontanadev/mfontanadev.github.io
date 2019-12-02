// Class Level
function Level () 
{ 
	this.m_id = 0;
	this.m_cols = 0;
	this.m_rows = 0; 
	this.m_matrix = new Array();
	this.m_persistenceName = '';

	this.m_offsetX = 0;
	this.m_offsetY = 0;
	this.m_rc = new chRect();
			
	Level.prototype.initWith = function (_fromString)
	{
		this.deserialize(_fromString);
	}
	
	// 
	Level.prototype.serialize = function () 
	{ 
		return 	'id:' + this.m_id.toString() + '|' +
				'persistenceName:' + this.m_persistenceName+ '|' +
				'cols:' + this.m_cols.toString() + '|' +
				'rows:' + this.m_rows.toString() + '|' +
				'matrix:' + this.m_matrix.toString() + ';';
	}  

	Level.prototype.deserialize = function (_data) 
	{ 
		var tokens = _data.split('|');
		var token = null;
		var tokenPrefix = '';
		var tokenPosfix = '';
		
		for (i = 0; i < tokens.length; i++)
		{
			token = tokens[i].split(':');
			
			// Example: if tokens[0] = 'customer name:android', tokenPrefix = 'customer name', tokenPosfix = 'android'
			tokenPrefix = token[0];
			tokenPosfix = token[1];
			
			// Send data to each class member.
			if (tokenPrefix == 'id')
			{
				this.m_id = parseInt(tokenPosfix);
			}
			else if (tokenPrefix == 'cols')
			{
				this.m_cols =  parseInt(tokenPosfix);
			}
			else if (tokenPrefix == 'rows')
			{
				this.m_rows =  parseInt(tokenPosfix);
			}
			else if (tokenPrefix == 'matrix')
			{
				chClearArray(this.m_matrix);
				
				var splitted = tokenPosfix.split(',');
				for (i2 = 0; i2 < splitted.length; i2++)
				{
					this.m_matrix.push(parseInt(splitted[i2]));
					//this.m_matrix.push(splitted[i2]);
				}
			}
			else if (tokenPrefix == 'persistenceName')
			{
				this.m_persistenceName =  tokenPosfix;
			}

		}
	}  
	
	Level.prototype.scroll = function (_dx, _dy) 
	{ 
		this.m_offsetX += _dx;
		this.m_offsetY -= _dy;
		//msglog("level scroll x,y: " + this.m_offsetX.toString() + "," + this.m_offsetY.toString());

		/*
		for (var i = m_maze.m_arrObj.length - 1; i >= 0; i--) 
		{
			if (m_maze.m_arrObj[i].m_class == C_CLASS_ENEMY ||
				m_maze.m_arrObj[i].m_class == C_CLASS_PLAYER ||
				m_maze.m_arrObj[i].m_class == C_CLASS_DECORATION)
			{
				m_maze.m_arrObj[i].m_x -= _dx;
				m_maze.m_arrObj[i].m_y -= _dy;
				
			}
		}*/

	}
	
	Level.prototype.visibleAreaRect = function () 
	{
		this.m_rc.m_x1 = (this.m_offsetX) - (m_camw + 100);
		this.m_rc.m_y1 = (-this.m_offsetY) - (m_camh + 100);
		this.m_rc.m_x2 = (this.m_offsetX) + (m_camw + 100);
		this.m_rc.m_y2 = (-this.m_offsetY) + (m_camh + 100);
	
		return this.m_rc; 
	}

	Level.prototype.mustBeRendered = function (_absX, _absY) 
	{
		//if (C_RENDER_COLLISION_RECT == true)
		//	renderCollitionRectangle(m_canvas, m_context, this.visibleAreaRect(), "yellow");
		return collisionPointRect(_absX, _absY, this.visibleAreaRect());
	}
}
