// Class Level

var C_GO_INDICATOR_FRECUENCY_ON = 10;
var C_GO_INDICATOR_FRECUENCY_OFF = -5;

function Level () 
{ 
	
	this.m_class = C_CLASS_LEVEL;
	this.m_type = C_OBJ_TYPE_LEVEL_SINGLE; 
		
	this.m_id = 0;
	this.m_cols = 0;
	this.m_rows = 0; 
	this.m_matrix = new Array();
	this.m_persistenceName = '';
	this.m_spriteSheet = -1; 
	this.m_maxEnemies = 0; 
	this.m_offsetX = 0;
	this.m_scrolling = false;
	this.m_remainingEnemies = 0;
	this.m_currentStageIndex = 0;
	this.m_stages = null;
	
	this.m_goIndicatorCounter = 0;
	this.m_goIndicatorFrecuency = C_GO_INDICATOR_FRECUENCY_ON;
	
	this.m_arrPotions = new Array();
	this.m_allowScroll = false;
	
	Level.prototype.initWith = function (_fromString)
	{
		this.deserialize(_fromString);
	}
	
	Level.prototype.initWith_index = function (_index)
	{
		this.m_id = gl_levels_definition.level_collection[_index].id; 
		this.m_class = gl_levels_definition.level_collection[_index]._class; 
		this.m_type = gl_levels_definition.level_collection[_index]._type; 
		this.m_spriteSheet = gl_levels_definition.level_collection[_index].spriteSheet; 
		this.m_maxEnemies = gl_levels_definition.level_collection[_index].maxEnemies; 	
		this.m_stages = gl_levels_definition.level_collection[_index].level_stages;
		
		this.createPotions(_index);
		//console.log(gl_levels_definition);
	}
	
	Level.prototype.createPotions = function (_index) 
	{
		for (var i = 0; i <  gl_levels_definition.level_collection[_index].potions.length; i++) 
		{
			var pPotion = new Potion();
			pPotion.initWith(0, 
				gl_levels_definition.level_collection[_index].potions[i].type, 
				gl_levels_definition.level_collection[_index].potions[i].x, 
				gl_levels_definition.level_collection[_index].potions[i].y);
			this.m_arrPotions.push(pPotion);
		}
	}
	
	// 
	Level.prototype.scroll = function () 
	{ 
		if (this.m_allowScroll == true)
		{
			this.m_offsetX = this.m_offsetX + 2;
			this.m_scrolling = true;

			if (this.m_offsetX > m_resourceMngr.getImage(this.m_spriteSheet).width - m_canvas.width / 2)
			{
				this.m_offsetX = this.m_offsetX - 2;
				this.m_scrolling = false;
			}
			this.m_allowScroll = !this.m_scrolling;
			return this.m_scrolling;
		}
		else
		{
			return true;
		}
	}
	
	// 
	Level.prototype.serialize = function () 
	{ 
		return 	'id:' + this.m_id.toString() + '|' +
				'persistenceName:' + this.m_persistenceName+ '|' +
				'cols:' + this.m_cols.toString() + '|' +
				'rows:' + this.m_rows.toString() + '|' +
				'spriteSheet:' + this.m_spriteSheet.toString() + '|';
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
			else if (tokenPrefix == 'spriteSheet')
			{
				this.m_spriteSheet =  parseInt(tokenPosfix);
			}
		}
	}  

	Level.prototype.implementGameLogic = function () 
	{
		this.m_allowScroll = true;
		var processStage = false;
		
		if (this.m_currentStageIndex == 0)
		{
			processStage = true;
		}
		else
		{
			// When stage is greater than 0, check scroll ofset with stage limit before add a new set of enemies.
			if (this.m_currentStageIndex < this.m_stages.length)
			{
				if (this.m_offsetX > this.m_stages[this.m_currentStageIndex].enemiesGeneratePosition)
				{
					processStage = true;
				}
			}

		}
			
		if (processStage == true)
		{
			if (this.m_currentStageIndex < this.m_stages.length && this.m_remainingEnemies == 0)
			{
				this.m_remainingEnemies	= this.m_remainingEnemies + this.m_stages[this.m_currentStageIndex].enemiesToGenerate;
				this.m_currentStageIndex = this.m_currentStageIndex + 1;
			}
		}
		
		// GO indicator logic.
		this.goIndicatorLogic();
	}

	Level.prototype.goIndicatorLogic = function () 
	{
		if (m_maze.m_enemiesAlive == 0 && this.m_remainingEnemies == 0)
		{
			if (this.m_goIndicatorFrecuency	> 0)
			{
				this.m_goIndicatorCounter++;

				if (this.m_goIndicatorCounter >= this.m_goIndicatorFrecuency)
				{
					this.m_goIndicatorFrecuency	= C_GO_INDICATOR_FRECUENCY_OFF;
					this.m_goIndicatorCounter = 0;
				}
			}
			else
			{
				this.m_goIndicatorCounter--;

				if (this.m_goIndicatorCounter <= this.m_goIndicatorFrecuency)
				{
					this.m_goIndicatorFrecuency	= C_GO_INDICATOR_FRECUENCY_ON;
					this.m_goIndicatorCounter = 0;
				}
			}
		}
		else
		{
			this.m_goIndicatorCounter = 0;
		}	
	}
	
	Level.prototype.enemyAdded = function () 
	{
		this.m_remainingEnemies = this.m_remainingEnemies -1;
		if (this.m_remainingEnemies < 0)
			this.m_remainingEnemies = -1;
	}
	
	Level.prototype.bossMustBeAdded = function () 
	{
		if ( this.m_currentStageIndex == this.m_stages.length && this.m_remainingEnemies == 0 && m_maze.m_enemiesAlive == 0)
			return true;
		else
			return false;
	}
	
	Level.prototype.bossId = function () 
	{
		return this.m_stages[this.m_currentStageIndex-1	].boss;
	}

	Level.prototype.isLevelComplete = function () 
	{
		if (this.m_currentStageIndex == this.m_stages.length && this.m_remainingEnemies == -1 && m_maze.m_enemiesAlive == 0)
			return true;
		else
			return false;
	}
}
