// Class Maze
function Maze () 
{ 
	Maze.prototype.initWith = function ()
	{
		this.m_arrObj = new Array();

		this.C_ROWS = 1;
		this.C_COLS = 1;
		
		this.m_player_x = 0;
		this.m_player_y = 0;
		
		this.m_enemy_x = 0;
		this.m_enemy_y = 0;

		this.m_lev = new Level();
		this.m_running = false;
	
		this.m_index = 0;
		this.m_pollutionPercent = 0;
		
		this.m_indicator1 = new Indicator();
	}
	
	// 
	Maze.prototype.implementGameLogic = function () 
	{ 
		bSomeEnemyAlive = false;
		
		// Remove objects that have deleted conditions.
		for (var i = this.m_arrObj.length - 1; i >= 0; i--) 
		{
			if (this.m_arrObj[i].mustBeDeleted() == true)
			{
				this.deleteObjByIndex(i);
			}
			else
			{
				if ( bSomeEnemyAlive == false &&
					this.m_arrObj[i] != null && 
					this.m_arrObj[i].m_class == C_CLASS_ENEMY &&  
					this.m_arrObj[i].m_type == C_OBJ_TYPE_ENEMY_TANQUETA && 
					this.m_arrObj[i].isAlive())
				{
					bSomeEnemyAlive = true;
				}
			}
		}
				
		this.implementGameLogicByType(C_CLASS_DECORATION);
		this.implementGameLogicByType(C_CLASS_BRICK);
		this.implementGameLogicByType(C_CLASS_PARTICLE);	
		this.implementGameLogicByType(C_CLASS_FIRE);		
		this.implementGameLogicByType(C_CLASS_PLAYER);
		this.implementGameLogicByType(C_CLASS_ENEMY);
		
		if (C_EDITOR_MODE == false)
			this.m_indicator1.implementGameLogic();
			
		// Check end level condition.
		// A.You win when no alive enemies are standing.
		if (bSomeEnemyAlive == false)
		{
			m_keyboardMngr.reset();
			m_viewGameOver.initWith(C_STATE_VIEW_GAMEOVER_WIN);
			m_appState = C_APP_STATE_GAMEOVER;
		}
	}  

	Maze.prototype.implementGameLogicByType = function(_objClass)
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
		//if (C_EDITOR_MODE == false)
		//	this.m_indicator1.render(m_canvasInd1, m_contextInd1);

		this.renderByType(C_CLASS_DECORATION, _canvas, _context);
		this.renderByType(C_CLASS_BRICK, _canvas, _context);
		this.renderByType(C_CLASS_PARTICLE, _canvas, _context);	
		this.renderByType(C_CLASS_ENEMY, _canvas, _context);
		this.renderByType(C_CLASS_PLAYER, _canvas, _context);
		this.renderByType(C_CLASS_FIRE, _canvas, _context);		

		this.renderIndicators( _canvas, _context);	
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

	Maze.prototype.renderIndicators = function (_canvas, _context)
	{
		for (var i = this.m_arrObj.length - 1; i >= 0; i--) 
		{
			if (this.m_arrObj[i].m_class == C_CLASS_PLAYER)
			{
				this.m_arrObj[i].renderIndicators(_canvas, _context);
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
		//if (_rect.m_x1 <  0 || _rect.m_x2 >= m_canvas.width ||
		//	_rect.m_y1 <  0 || _rect.m_y2 >= m_canvas.height)
		//	brickIDBeaten = -2;

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

	Maze.prototype.updatePollutionPercent = function ()
	{ 
		var _pollutionableCells = 0;
		var _deadCells = 0;
		
		var pObj = null;
		for (var i = 0; i < this.m_arrObj.length; i++) 
		{
			pObj = this.m_arrObj[i];
						
			if (pObj.m_class == C_CLASS_BRICK)
			{
				_pollutionableCells++;
				if (pObj.getPollutionLevel() == 0)
					_deadCells++;
			}
		}
		
		this.m_pollutionPercent = (_deadCells / _pollutionableCells) * 100;
		
		return this.m_pollutionPercent;
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Maze.prototype.getPollutionPercent = function ()
	{
		return Math.round(this.m_pollutionPercent);
	}

	Maze.prototype.loadLevel = function (_levelIndex)
	{ 
		this.m_lev = this.getLevel(_levelIndex);

		if (this.m_lev != null)
		{
			this.C_ROWS = this.m_lev.m_rows;
			this.C_COLS = this.m_lev.m_cols;
			
			// Create cell objects.
			chClearArray(this.m_arrObj);

			// Add player
			var index = 0;
			this.m_index++;
			pPlayer = new Hero();
			pPlayer.initWith(this.m_index, 0, 0, 0);
			this.m_arrObj.push(pPlayer);

			// Make land
			for (var y = -5; y < 5; y++)
			{
				for (var x = -5; x < 5; x++)
				{
					if (y % 2 == 0)
					{
					this.m_index++;
					var pObj = new Decoration();
					pObj.initWith(this.m_index, C_OBJ_TYPE_GREEN, x*C_CELL_WIDTH*5, y*C_CELL_HEIGHT*5);
					this.m_arrObj.push(pObj);	
					}
					else
					{
					
					this.m_index++;
					var pObj = new Decoration();
					pObj.initWith(this.m_index, C_OBJ_GREEN_FAR, x*C_CELL_WIDTH*5, y*C_CELL_HEIGHT*5);
					this.m_arrObj.push(pObj);
					}
				}
			}

			// Level 1 definition
			if (_levelIndex == C_EDITOR_LEVEL_1_KEY)
			{
				/*
				for (var enemies = 0; enemies < 20; enemies++)
				{
					this.m_index++;
					pEnemy = new Enemy();
					ro = (chRandom(10) * 50)+200;
					tita = (chRandom(360) * 30);

					px = cosOf(ro, tita);
					py = sinOf(ro, tita);

					//px = 100;
					//py = -100;

					pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, px, py, chRandom(360));
					this.m_arrObj.push(pEnemy);
					pEnemy.linkTank(pPlayer);
				}*/

				/*
				for (var enemies = 0; enemies <= 6; enemies++)
				{
					this.m_index++;
					pEnemy = new Enemy();
					ro = 300;
					tita = enemies * 30;

					px = cosOf(ro, tita);
					py = sinOf(ro, tita);

					//px = 100;
					//py = -100;

					pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, px, py, chRandom(360));
					this.m_arrObj.push(pEnemy);
					pEnemy.linkTank(pPlayer);
				}
				*/
				

				this.m_index++;
				pEnemy = new Enemy();
				pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, cosOf(300, 0), sinOf(0, 0), 5400, 200, 100, 1000, 20);
				this.m_arrObj.push(pEnemy);
				pEnemy.linkTank(pPlayer);

				this.m_index++;
				pEnemy = new Enemy();
				pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, cosOf(300, 45), sinOf(300, 45), 5400*2, 200, 100, 1000, 20);
				this.m_arrObj.push(pEnemy);
				pEnemy.linkTank(pPlayer);

				this.m_index++;
				pEnemy = new Enemy();
				pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, cosOf(500, 90), sinOf(500, 90), 5400*4, 300, 200, 1000, 120);
				this.m_arrObj.push(pEnemy);
				pEnemy.linkTank(pPlayer);
				
				this.m_index++;
				pEnemy = new Enemy();
				pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, cosOf(300, 0+180), sinOf(0, 0+180), 5400, 200, 100, 1000, 20);
				this.m_arrObj.push(pEnemy);
				pEnemy.linkTank(pPlayer);

				this.m_index++;
				pEnemy = new Enemy();
				pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, cosOf(300, 180 - 45), sinOf(300, 180 - 45), 5400*2, 200, 100, 1000, 20);
				this.m_arrObj.push(pEnemy);
				pEnemy.linkTank(pPlayer);
				
/*
				this.m_index++;
				pEnemy = new Enemy();
				pEnemy.initWith(this.m_index, C_OBJ_TYPE_ENEMY_TANQUETA, cosOf(200, -30), sinOf(200, -30));
				this.m_arrObj.push(pEnemy);
				pEnemy.linkTank(pPlayer);	*/
			}
		}
		else
		{
			msglog('ERROR, maze.loadLevel: nivel' + _levelIndex.toString() + ' no cargado');
		}
	}

	Maze.prototype.addObjectToMap = function(_x, _y, _ci)
	{
		var classID = 0;
		var objID = 0;
		var pBrick = null;
		var pPlayer = null;
		var pSmogcar = null;
		
		var token = '00';
		var tk = '' + _ci;
		
		//if (tk.length == -1)
		if (tk.length >= 2)
		{
			token = tk.substring(0,2);
		
			classID = Math.floor(token / 10);
			objID = token - (Math.floor(token / 10) * 10);
			
			if (classID == C_CLASS_DECORATION)
			{
				var pObj = new Decoration();
				pObj.initWith(this.m_index, objID, _x, _y);
				this.m_arrObj.push(pObj);
				this.m_index++;
			}
			else if (classID == C_CLASS_BRICK)
			{
				pBrick = new Brick();
				pBrick.initWith(this.m_index, objID, _x, _y);
				this.m_arrObj.push(pBrick);
				this.m_index++;
			}
			/*
			else if (classID == C_CLASS_PLAYER)
			{
				pPlayer = new Hero();
				pPlayer.initWith(this.m_index, 0, 
				_x * C_CELL_WIDTH + (C_CELL_WIDTH / 2), 
				_y * C_CELL_HEIGHT + (C_CELL_HEIGHT / 2));
				this.m_arrObj.push(pPlayer);
				this.m_index++;
			}
			else if (classID == C_CLASS_ENEMY)
			{
				pPlayer = new Enemy();
				pPlayer.initWith(this.m_index, 0, 
				_x * C_CELL_WIDTH + (C_CELL_WIDTH / 2), 
				_y * C_CELL_HEIGHT + (C_CELL_HEIGHT / 2));
				this.m_arrObj.push(pPlayer);
				this.m_index++;
			}*/
			
			// Recursive call to consume all original token.
			// i.e.: "4030" must add "40" and "30" two objects in the same cell.
			this.addObjectToMap(_x, _y, tk.substring(2, tk.length));
		}
	}
	
	Maze.prototype.addObj = function (_obj)
	{
		this.m_arrObj.push(_obj);
	}

	Maze.prototype.deleteObjByIndex = function (_index)
	{
		var toDelete = this.m_arrObj[_index];
		this.m_arrObj.splice(_index,1);
	}

	Maze.prototype.deleteObjAtPosition = function (_x, _y)
	{
		var tmpRect = new chRect();
		tmpRect.m_x1 = _x - 1;
		tmpRect.m_y1 = _y - 1;
		tmpRect.m_x2 = _x + 1;
		tmpRect.m_y2 = _y + 1;
		
		var id = m_maze.detectCollitionByClass(C_CLASS_NONE, tmpRect);
		if (id != -1)
		{
			this.deleteObjByIndex(id);
		}
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

		if (_levelIndex == 'EMPTY')
		{
			level = 'id:1' + '|';
			level+= 'persistenceName:'+ 'stored_level' + '|';
			level+= 'rows:14'+ '|';
			level+= 'cols:15'+ '|';
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
		}
		else if (_levelIndex == C_EDITOR_LEVEL_INTRO_KEY)
		{
			if ( m_storeMngr.getItem(C_EDITOR_LEVEL_INTRO_KEY) != null)
			{
				level = m_storeMngr.getItem(C_EDITOR_LEVEL_INTRO_KEY);
			}
			else
			{
				level = 'id:0|persistenceName:' + C_EDITOR_LEVEL_INTRO_KEY + '|cols:15|rows:14|matrix:30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,65,67,65,67,67,67,61,30,30,30,30,30,30,63,61,30,66,30,66,66,67,64,30,30,30,30,30,30,65,64,30,66,30,63,64,66,30,30,30,30,30,30,30,30,30,30,66,30,30,30,66,30,30,30,30,30,30,6554,67,65,67,67,67,67,67,67,65,65,30,30,30,30,30,63,61,66,66,66,66,66,66,61,30,30,30,30,30,30,65,64,66,30,66,63,64,63,64,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30;';
				//level = 'id:0|persistenceName:' + C_EDITOR_LEVEL_INTRO_KEY + '|cols:15|rows:14|matrix:30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,65,67,65,67,67,67,61,30,30,30,30,30,30,63,61,30,66,30,66,66,67,64,30,30,30,30,30,30,65,64,30,66,30,63,64,66,30,30,30,30,30,30,30,30,30,30,66,30,30,30,66,30,30,30,30,30,30,6554,67,65,67,67,67,67,67,67,65,65,30,30,30,30,30,63,61,66,66,66,66,66,66,61,30,30,30,30,30,30,65,64,66,30,66,63,64,63,64,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,68,68,30,30,30,30,30,30,30,30,68,68,65,6740,30,30,30,30,30,30,30,30,30,30,30,30,30,30,63,65,68,68,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30;';
			}
		}
		else if (_levelIndex == C_EDITOR_LEVEL_HELP_KEY)
		{
			if ( m_storeMngr.getItem(C_EDITOR_LEVEL_HELP_KEY) != null)
			{
				level = m_storeMngr.getItem(C_EDITOR_LEVEL_HELP_KEY);
			}
			else
			{
				level = 'id:0|persistenceName:' + C_EDITOR_LEVEL_HELP_KEY + '|cols:15|rows:14|matrix:30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,65,67,65,67,67,67,61,30,30,30,30,30,30,63,61,30,66,30,66,66,67,64,30,30,30,30,30,30,65,64,30,66,30,63,64,66,30,30,30,30,30,30,30,30,30,30,66,30,30,30,66,30,30,30,30,30,30,6554,67,65,67,67,67,67,67,67,65,65,30,30,30,30,30,63,61,66,66,66,66,66,66,61,30,30,30,30,30,30,65,64,66,30,66,63,64,63,64,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30;';
				//level = 'id:0|persistenceName:' + C_EDITOR_LEVEL_INTRO_KEY + '|cols:15|rows:14|matrix:30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,65,67,65,67,67,67,61,30,30,30,30,30,30,63,61,30,66,30,66,66,67,64,30,30,30,30,30,30,65,64,30,66,30,63,64,66,30,30,30,30,30,30,30,30,30,30,66,30,30,30,66,30,30,30,30,30,30,6554,67,65,67,67,67,67,67,67,65,65,30,30,30,30,30,63,61,66,66,66,66,66,66,61,30,30,30,30,30,30,65,64,66,30,66,63,64,63,64,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,68,68,30,30,30,30,30,30,30,30,68,68,65,6740,30,30,30,30,30,30,30,30,30,30,30,30,30,30,63,65,68,68,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30;';
			}
		}
		else if (_levelIndex == C_EDITOR_LEVEL_1_KEY)
		{
		
			if ( m_storeMngr.getItem(C_EDITOR_LEVEL_1_KEY) != null)
			{
				level = m_storeMngr.getItem(C_EDITOR_LEVEL_1_KEY);
			}
			else
			{
				level = 'id:0|' + 'persistenceName:'+ C_EDITOR_LEVEL_1_KEY + '|' +'cols:15|rows:14|matrix:30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,61,30,62,65,61,30,30,30,30,30,30,30,30,66,30,66,30,66,30,66,30,30,30,30,30,30,30,30,63,65,67,6540,67,65,64,30,30,30,30,30,30,30,30,30,30,66,30,66,30,30,30,30,30,30,30,30,30,30,30,30,66,30,66,30,30,30,30,30,30,30,30,30,30,62,65,67,6554,67,65,61,30,30,30,30,30,30,30,30,66,30,66,30,66,30,66,30,30,30,30,30,30,30,30,63,65,64,30,63,65,64,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30';	
			}

		}
		else if (_levelIndex == C_EDITOR_LEVEL_2_KEY)
		{
			if ( m_storeMngr.getItem(C_EDITOR_LEVEL_2_KEY) != null)
			{
				level = m_storeMngr.getItem(C_EDITOR_LEVEL_2_KEY);
			}
			else
			{
				level = 'id:0|' + 'persistenceName:'+ C_EDITOR_LEVEL_2_KEY + '|' +'cols:15|rows:14|matrix:30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,62,65,61,30,62,65,61,30,30,30,30,30,30,30,30,66,30,66,30,66,30,66,30,30,30,30,30,30,30,30,63,65,67,6540,67,65,64,30,30,30,30,30,30,30,30,30,30,66,30,66,30,30,30,30,30,30,30,30,30,30,30,30,66,30,66,30,30,30,30,30,30,30,30,30,30,62,65,67,6554,67,65,61,30,30,30,30,30,30,30,30,66,30,66,30,66,30,66,30,30,30,30,30,30,30,30,63,65,64,30,63,65,64,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30';	
			}
		}

		if (level.length > 0)
		{
			resultLevel = new Level();
			resultLevel.initWith(level);
		}

		return resultLevel;
	}

	
}

