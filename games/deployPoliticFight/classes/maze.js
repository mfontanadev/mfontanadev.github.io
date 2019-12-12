// Class Maze
function Maze () 
{ 
	Maze.prototype.initWith = function ()
	{
		this.m_arrObj = new Array();

		this.m_player_x = 0;
		this.m_player_y = 0;
		
		this.m_enemy_x = 0;
		this.m_enemy_y = 0;

		this.m_lev = new Level();
		this.m_running = false;
	
		this.m_index = 0;
		
		this.m_enemyLevel = 1;

		this.m_player1Present = false;
		this.m_player2Present = false;
		this.m_enemiesAlive = 0;
	}
	
	// 
	Maze.prototype.implementGameLogic = function () 
	{ 
		this.m_lev.m_scrolling = false;

		// Remove objects that have deleted conditions.
		for (var i = this.m_arrObj.length - 1; i >= 0; i--) 
		{
			if (this.m_arrObj[i].mustBeDeleted() == true)
			{
				msglog("borrando"  + this.m_arrObj[i])

				if (this.m_arrObj[i].m_type == C_OBJ_TYPE_PLAYER_GUY)
					this.m_player1Present = false;
				
				if (this.m_arrObj[i].m_type == C_OBJ_TYPE_PLAYER_CODY)
					this.m_player2Present = false;
				
				this.deleteObjByIndex(i);
			}
		}
		
		this.implementGameLogicByClass(C_CLASS_DECORATION);
		this.implementGameLogicByClass(C_CLASS_PLAYER);
		this.implementGameLogicByClass(C_CLASS_ENEMY);		
		this.implementGameLogicByClass(C_CLASS_POTION);

		this.m_enemiesAlive = this.countIndexFromObject(C_CLASS_ENEMY, C_OBJ_TYPE_NONE, false);

		this.m_lev.implementGameLogic();
		if (this.m_lev.m_remainingEnemies > 0)
		{
			this.addEnemy(-1);
		}
		else
		{
			if (this.m_lev.bossMustBeAdded() == true )
				this.addEnemy(this.m_lev.bossId());
			else
			{
				if (this.m_lev.isLevelComplete() == true)
					m_appState = C_APP_STATE_INTRO;
			}
		}
		/*
		var enemiesCount = m_maze.countIndexFromObject(C_CLASS_ENEMY, C_OBJ_TYPE_NONE, false);
		if (enemiesCount <= this.m_lev.m_maxEnemies)
			this.addEnemy(enemiesCount);
		*/
	}  

	Maze.prototype.implementGameLogicByClass = function(_objClass)
	{
		// Implement all objects game logic.
		for (var i = this.m_arrObj.length - 1; i >= 0; i--) 
		{
			if (this.m_arrObj[i].m_class == _objClass)
			{
				this.m_arrObj[i].implementGameLogic();
			}
		}
	}
	
	Maze.prototype.render = function (_canvas, _context)
	{
		this.renderByType(C_CLASS_DECORATION, _canvas, _context);
		this.renderByType(C_CLASS_POTION, _canvas, _context);
		this.renderPlayersZOrder(_canvas, _context);
		
		if (this.m_lev.m_goIndicatorCounter > 0)
		{
			m_resourceMngr.drawResource(_canvas, _context, C_RESOURCE_ID_GO_INDICATOR, 1);
		}
	}

	Maze.prototype.renderPlayersZOrder = function (_canvas, _context)
	{
		var minY = -1;
		var minIndex = -1;
		
		this.m_arrObj.sort(function(a,b){return a.m_y-b.m_y});

		for (var i = 0; i <= this.m_arrObj.length - 1; i++) 
		{
			if (this.m_arrObj[i].m_class != C_CLASS_DECORATION 
				&& this.m_arrObj[i].m_class != C_CLASS_POTION)
			{
				this.m_arrObj[i].render(_canvas, _context);
			}
		}
	}

	Maze.prototype.renderByType = function (_objClass, _canvas, _context)
	{
		for (var i = this.m_arrObj.length - 1; i >= 0; i--) 
		{
			if (this.m_arrObj[i].m_class == _objClass)
			{
				this.m_arrObj[i].render(_canvas, _context);
			}
		}
	}

	Maze.prototype.detectCollitionByClass = function (_classType, _rect)
	{
		return this.detectCollition_basefunc(_classType, C_OBJ_TYPE_NONE, false, _rect);
	}

	Maze.prototype.detectCollitionByClassType = function (_classType, _objType, _rect)
	{
		return this.detectCollition_basefunc(_classType, _objType, false, _rect);
	}

	Maze.prototype.detectCollitionByClassInvType = function (_classType, _objType, _rect)
	{
		return this.detectCollition_basefunc(_classType, _objType, true, _rect);
	}
	
	Maze.prototype.detectCollition_basefunc = function (_classType, _objType, _inverseType, _rect)
	{
		var brickIDBeaten = -1;
		
		// Validate not allow movements outside canvas area.
		if (_rect.m_x1 <  0 || _rect.m_x2 >= m_canvas.width ||
			_rect.m_y1 <  0 || _rect.m_y2 >= m_canvas.height)
			brickIDBeaten = -2;

		if (brickIDBeaten != -2)
		{
			var pObj = null;
			var pRect = null;
			for (var i = 0; i < this.m_arrObj.length; i++) 
			{
				pObj = this.m_arrObj[i];
							
				if ((_classType == C_CLASS_NONE && _objType == C_OBJ_TYPE_NONE) ||
					(pObj.m_class == _classType && _objType == C_OBJ_TYPE_NONE) || 
					(pObj.m_class == _classType && pObj.m_type == _objType && _inverseType == false) ||
					(pObj.m_class == _classType && pObj.m_type != _objType && _inverseType == true))
				{
					pRect = pObj.collisionRectangle();
				
					if (collisionRectRect(
							_rect.m_x1,_rect.m_y1,_rect.m_x2,_rect.m_y2, 
							pRect.m_x1,pRect.m_y1,pRect.m_x2,pRect.m_y2) == true)
					{
						brickIDBeaten = i;
					
						break;
					}

				}
			}
		}
		
		return brickIDBeaten;
	}

	Maze.prototype.findIndexFromObject = function (_classType, _objType, _inverseType)
	{
		var brickIDBeaten = -1;
		
		var pObj = null;
		for (var i = 0; i < this.m_arrObj.length; i++) 
		{
			pObj = this.m_arrObj[i];
						
			if ((_classType == C_CLASS_NONE && _objType == C_OBJ_TYPE_NONE) ||
				(pObj.m_class == _classType && _objType == C_OBJ_TYPE_NONE) || 
				(pObj.m_class == _classType && pObj.m_type == _objType && _inverseType == false) ||
				(pObj.m_class == _classType && pObj.m_type != _objType && _inverseType == true))
			{
				brickIDBeaten = i;
				break;
			}
		}
		
		return brickIDBeaten;
	}

	Maze.prototype.countIndexFromObject = function (_classType, _objType, _inverseType)
	{
		var resultValue = 0;
		
		var pObj = null;
		for (var i = 0; i < this.m_arrObj.length; i++) 
		{
			pObj = this.m_arrObj[i];
						
			if ((_classType == C_CLASS_NONE && _objType == C_OBJ_TYPE_NONE) ||
				(pObj.m_class == _classType && _objType == C_OBJ_TYPE_NONE) || 
				(pObj.m_class == _classType && pObj.m_type == _objType && _inverseType == false) ||
				(pObj.m_class == _classType && pObj.m_type != _objType && _inverseType == true))
			{
				resultValue++;
			}
		}
		
		return resultValue;
	}
	
	Maze.prototype.fLog = function () 
	{ 
		var logText = "Brick: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ";"; 

		return logText;
	}  
	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Maze.prototype.stop = function ()
	{ 
		this.m_running = false;
	}

	Maze.prototype.start = function ()
	{ 
		this.m_running = true;
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Maze.prototype.loadLevel = function (_levelIndex)
	{ 
		this.m_lev = this.getLevel(_levelIndex);

		if (this.m_lev != null)
		{
			msglog('loadLevel');
			
			// Create cell objects.
			chClearArray(this.m_arrObj);
			
			// Cargar fondo.
			msglog('Cargar fondo.');

			var pObj = new Decoration();
			pObj.initWith(this.m_index, C_OBJ_LEVEL_BACKGROUND, this.m_lev.m_spriteSheet, 0, 0);
			this.m_arrObj.push(pObj);
			this.m_index++;
		
			msglog('addPlayerOne');
			this.addPlayerOne(false);

			// Add level potions
			msglog('Add level potions');
			for (var i = 0; i <  this.m_lev.m_arrPotions.length; i++) 
			{
				this.m_lev.m_arrPotions[i].m_id = this.m_index;
				this.m_arrObj.push(this.m_lev.m_arrPotions[i]);
				this.m_index++;
			}

			/*
			var pEnemy = new Enemy();
			pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_RYDEN , 0, 0, 1);
			this.m_arrObj.push(pEnemy);
			this.m_index++;
			
			var pEnemy = new Enemy();
			pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_GUY , 200, 0, 1);
			this.m_arrObj.push(pEnemy);
			this.m_index++;*/
		}
		else
		{
			msglog('ERROR, maze.loadLevel: nivel' + _levelIndex.toString() + ' no cargado');
		}
	}

	
	Maze.prototype.addPlayerOne = function(_validateIfNotExists)
	{
		if ( _validateIfNotExists == false || 
			 this.findIndexFromObject(C_CLASS_PLAYER, C_OBJ_TYPE_PLAYER_GUY, false) < 0)
		{
			msglog('addPlayerOne var pPlayer = new Hero();');
			var pPlayer = new Hero();
			pPlayer.initWith(this.m_index, C_OBJ_TYPE_PLAYER_GUY, 0, 0);
			this.m_arrObj.push(pPlayer);
			this.m_index++;
			
			this.m_player1Present = true;
		}
	}

	Maze.prototype.addPlayerTwo = function(_validateIfNotExists)
	{
		if ( _validateIfNotExists == false || 
			 this.findIndexFromObject(C_CLASS_PLAYER, C_OBJ_TYPE_PLAYER_CODY, false) < 0)
		{
			var pPlayer = new Hero();
			pPlayer.initWith(this.m_index, C_OBJ_TYPE_PLAYER_CODY, 0, 0);
			this.m_arrObj.push(pPlayer);
			this.m_index++;

			this.m_player2Present = true;
		}
	}

	Maze.prototype.addEnemy = function(_enemyIndex)
	{
		// Avoid add enemies
		//return;
		var addEnemy = false;
		
		//if (_maxEnemies == 0 || (_maxEnemies > 0 && _maxEnemies < this.m_lev.m_maxEnemies && chRandom(5000) < 10))
		if (chRandom(500) < 10)
			addEnemy = true;

		if (addEnemy == true)
		{
			var side = 1;
			/*
			if (chRandom(100) > 50)
				side = m_canvas.width / 1.5
			else
				side = (m_canvas.width / 2) * -1;	//Aparecer del lado izquierdo -ancho/2 pixeles.
*/
			if (this.m_lev.m_offsetX != 0)
				side = (m_canvas.width / 1.5);
			else
				side = ((m_canvas.width / 6) * -1);
			
			var pEnemy = new Enemy();
			
			if (_enemyIndex == -1)
				_enemyIndex = C_OBJ_TYPE_ENEMY_GUY + chRandom(0);
				
			pEnemy.initWith(this.m_index, _enemyIndex, side, 120, this.m_enemyLevel);
			this.m_arrObj.push(pEnemy);
			this.m_index++;
			this.m_enemyLevel++;
	
			if (this.m_enemyLevel > 8)
				this.m_enemyLevel = 8;
			
			this.m_lev.enemyAdded();
		}
	}
	
	Maze.prototype.addObj = function (_obj)
	{
		this.m_arrObj.push(_obj);
	}

	Maze.prototype.deleteObjByIndex = function (_index)
	{
		this.m_arrObj.splice(_index,1);
	}

	Maze.prototype.serialize = function (_classId, _objType)
	{
		var id = _classId * 10 + _objType;
		return id.toString();
	}
	
	Maze.prototype.getLevel = function (_levelIndex)
	{
		var level = '';
		var resultLevel = null;
		var levelIndex = -1;
		
		if (_levelIndex == 'EMPTY')
		{
			level = 'id:1' + '|';
			level+= 'persistenceName:'+ 'stored_level' + '|';
			level+= 'rows:14'+ '|';
			level+= 'cols:15'+ '|';
			level+= 'background: '+ C_IMG_LEVEL_1_BACKGROUND+ '|';
			level+= 'matrix:';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00';
			levelIndex = 0;
		}

		if (levelIndex != -1)
		{
			resultLevel = new Level();
			resultLevel.initWith_index(levelIndex);
			
			msglog('Level:' + resultLevel.serialize());
		}

		return resultLevel;
	}

	
}

