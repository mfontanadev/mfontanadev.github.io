// Class Hero
function Enemy () 
{ 
	//_rotationSpeed: time in miliseconds to complete a 360 degree rotation. Updated each 30 miliseconds.
	//                incAng = 360 / (_rotationSpeed / C_ENEMY_ROTATION_UPDATE)
	//_findRange	: (meters) distance to start rotation action.
	//_fireRange	: (meters) distance to hit some damage.
	//_fireVelocity : (ms) elapsed time between fires.
	//_shiled 		: (milimeters) protection.
	
	var C_ENEMY_ROTATION_UPDATE = 30;
	
	Enemy.prototype.initWith = function (_id, _type, _x, _y, _rotationSpeed, _findRange, _fireRange, _fireVelocity, _shield )
	{
		this.m_id = _id;
		this.m_class = C_CLASS_ENEMY;
		this.m_type = _type; 

		this.m_x = _x; 
		this.m_y = _y; 

		// 1 = right, 2 = up, 3 = left, 4 = down
		this.m_movDir = 0;
		this.m_rotationDir = 0;

		this.m_rc = new chRect();
		this.m_rcNM = new chRect();
		
		this.m_status = C_STATUS_ALIVE;

		this.m_px = 0;
		this.m_py = 0;
		
		this.m_rotationIncrement = 360 / (_rotationSpeed / C_ENEMY_ROTATION_UPDATE);
		this.m_rotationAngle = 0;
		this.m_rotationTimer = new ChTimer();
		this.m_rotationTimer.initWith(C_ENEMY_ROTATION_UPDATE);

		this.m_cannon = new Cannon();
		this.m_cannon.initWith(-1, C_OBJ_TYPE_CANNON_1, 0,0);
		this.m_cannon.modifyRange(_fireRange);
		this.m_cannon.modifyDiameter(10);

		this.m_findRange = _findRange;
		this.m_fireRange = _fireRange;

		this.m_fireTimer = new ChTimer();
		this.m_fireTimer.initWith(_fireVelocity);

		this.m_shield = new Shield();
		this.m_shield.initWith(-1, C_OBJ_TYPE_SHIELD_TYPE_1 , 0, 0);
		this.m_shield.modifyIndicator(_shield);

		this.m_smoke = new Smoke();
		this.m_smoke.initWith(-2, C_OBJ_TYPE_SMOKE_1, _x, _y);
		
		this.m_linkedTank = null;
	}
	
	// 
	Enemy.prototype.handleInputs = function () 
	{ 
		if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_A) == true)
		{
			this.startRotation(C_DIR_RIGHT);
		}
		
		if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_D) == true)
		{
			this.startRotation(C_DIR_LEFT);
		}

		if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_A) == false && m_keyboardMngr.isKeyDown(C_KEY_CHAR_D) == false)
		{
			//this.stopRotation();
		}
	}  

	// 
	Enemy.prototype.implementGameLogic = function () 
	{ 
		this.updateCoordinates();
			
		if (this.m_status == C_STATUS_ALIVE)
		{
			this.handleInputs();
			this.moveLogic();
			
			this.m_smoke.implementGameLogic();
			
			this.m_fireTimer.implementGameLogic();
			
			if (this.m_fireTimer.endReached() == true)
				this.m_fireTimer.reset();
			
			this.attackLogic();
		}
	}  

	Enemy.prototype.render = function (_canvas, _context)
	{
		if (m_maze.m_lev.mustBeRendered(this.m_x, this.m_y) == false)
		{
			/*
			msglog("level scroll x,y: " + m_maze.m_lev.visibleAreaRect().m_x1);
			msglog("level scroll x,y: " + m_maze.m_lev.visibleAreaRect().m_y1);
			msglog("level scroll x,y: " + m_maze.m_lev.visibleAreaRect().m_x2);
			msglog("level scroll x,y: " + m_maze.m_lev.visibleAreaRect().m_y2);
			msglog("enemy scroll x,y: " + this.m_x.toString() + "," + this.m_y.toString());
			*/
			return;
		}

		// Fire and find range indicator
		if (this.m_status == C_STATUS_ALIVE)
		{
			renderCircleTransparent(_canvas, _context, this.m_px, this.m_py, this.m_findRange, "orange", 0.2);
			renderCircleTransparent(_canvas, _context, this.m_px, this.m_py, this.m_fireRange, "red", 0.2);

			// Enemy sprite
			drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_FACTORY), this.m_px, this.m_py, 0);
			drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENEMY_TANQUETA), this.m_px, this.m_py, this.m_rotationAngle);

			// Enemy energy indicator
			var energyOffsetY = 30;
			var energyIndicatorWidth = 50 / 2;
					
			var currentEnergyWidth = energyIndicatorWidth * 2 * this.getCurrentEnergy() / 100;
			renderLine(_canvas, _context, this.m_px - energyIndicatorWidth, this.m_py - energyOffsetY, this.m_px + energyIndicatorWidth , this.m_py - energyOffsetY, "gray", 1);
			renderLine(_canvas, _context, this.m_px - energyIndicatorWidth, this.m_py - energyOffsetY-1, this.m_px + energyIndicatorWidth , this.m_py - energyOffsetY-1, "gray", 1);
			renderLine(_canvas, _context, this.m_px - energyIndicatorWidth, this.m_py - energyOffsetY, this.m_px - energyIndicatorWidth + currentEnergyWidth, this.m_py - energyOffsetY, "yellow", 1);
			renderLine(_canvas, _context, this.m_px - energyIndicatorWidth, this.m_py - energyOffsetY-1, this.m_px - energyIndicatorWidth + currentEnergyWidth, this.m_py - energyOffsetY-1, "yellow", 1);
			 
			m_fontMngr.drawTextSmall(_canvas, _context, pad(this.getCurrentEnergy(),4),   this.m_px - energyIndicatorWidth, this.m_py - energyOffsetY - 12, rgbToColor(16,16,16));
			m_fontMngr.drawTextSmall(_canvas, _context, "D=" + pad(this.m_cannon.energyUsed(),3),   this.m_px - energyIndicatorWidth, this.m_py - energyOffsetY - 25, rgbToColor(16,16,16));
		
			if (this.m_smoke.m_status == C_STATUS_ALIVE)
				this.m_smoke.render(_canvas, _context);
		}
		else
		{
			// Enemy sprite
			drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENEMY_RECYCLED), this.m_px, this.m_py, 0);
		}
		
		
		
	}

	Enemy.prototype.updateCoordinates = function ()
	{
		this.m_px = C_OFFSET_X_PLAY_AREA + this.m_x - m_maze.m_lev.m_offsetX;
		this.m_py = C_OFFSET_Y_PLAY_AREA - this.m_y - m_maze.m_lev.m_offsetY;
	}
	
	Enemy.prototype.collisionRectangle = function () 
	{
		// -1 because a long story, center is not in de middle because cell size 
		// is no pair. The result rectangle is one pixel greater.
		var midRad = (C_CELL_WIDTH >> 1) - 1;
		
		this.m_rc.m_x1 = this.m_x - midRad;
		this.m_rc.m_y1 = this.m_y - midRad;
		this.m_rc.m_x2 = this.m_x + midRad;
		this.m_rc.m_y2 = this.m_y + midRad;

		return this.m_rc; 
	}

	Enemy.prototype.fLog = function () 
	{ 
		var logText = "Brick: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ", " + 
		"m_direction=" + this.m_direction + ";";
		
		return logText;
	}  
	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Enemy.prototype.moveLogic = function ()
	{ 
		if (this.isRotating() == true)
		{
			this.m_rotationTimer.implementGameLogic();

			if (this.m_rotationTimer.endReached() == true)
			{
				this.m_rotationTimer.reset();
				this.m_rotationTimer.start();
				this.m_rotationAngle += this.m_rotationDir * this.m_rotationIncrement;
				this.m_rotationAngle = chNormalizeAngle(this.m_rotationAngle);
			}
		}
	}

	Enemy.prototype.checkCollition = function()
	{
		var bResult = false;

		// Only move Enemy when it reaches cell target position.
		var idBrick = m_maze.detectCollitionByClass(C_CLASS_ENEMY, this.crashRectangle());

		if (idBrick != -1)
		{
			this.die();
			m_maze.m_arrObj[idBrick].die();
		}

		
		return bResult;
	}

	Enemy.prototype.attackLogic = function()
	{
		if (this.m_linkedTank.mustBeDeleted() == true)
			return;
		
		var tankX = this.m_linkedTank.m_x;
		var tankY = this.m_linkedTank.m_y;

		tmpModulo = modulo(this.m_x, this.m_y, tankX, tankY); 

		if ( tmpModulo < this.m_findRange)
		{
			tmpAngle = 360 -  anguloCuadrante(this.m_x, this.m_y, tankX, tankY);
			tmpDeltaAngle = (tmpAngle - this.m_rotationAngle);

			if (Math.abs(tmpDeltaAngle) < 5)
			{
				if (this.isRotating() == true)
					this.stopRotation();

				if (this.m_fireTimer.isReady() == true && tmpModulo <= this.m_fireRange)
				{
					this.m_fireTimer.start();
					this.fire();
				}
			}
			else
			{
				if (this.isRotating() == false)
				{
					if (tmpAngle >= this.m_rotationAngle)
					{
						a = tmpAngle - this.m_rotationAngle;
						b = 360 - a;

						if (b <= a)
							this.startRotation(C_DIR_RIGHT);
						else
							this.startRotation(C_DIR_LEFT);
					}
					else
					{
						a = this.m_rotationAngle - tmpAngle;
						b = 360 - a;

						if (a <= b)
							this.startRotation(C_DIR_RIGHT);
						else
							this.startRotation(C_DIR_LEFT);
					}
				}
			}
		}
		else	
		{
			this.stopRotation();
		}

	}

	
	Enemy.prototype.mustBeDeleted = function()
	{
		var bResult = (this.m_status == C_STATUS_DIE);
		
		return bResult;
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Enemy.prototype.dissolve = function(_disolvePrower)
	{ 
	}

	Enemy.prototype.isAlive = function()
	{
		var bResult = (this.m_status == C_STATUS_ALIVE);
		
		return bResult;
	}
	
	Enemy.prototype.hitted = function(_disolvePower)
	{ 
		this.m_shield.modifyIndicator((_disolvePower/2)*-1);

		if (this.getCurrentEnergy() <= 0)
		{
			m_sndManager.stop(C_SND_BULLET_IMPACT);
			m_sndManager.play(C_SND_BULLET_IMPACT);
			msglog("destroyed");
			this.destroyed();
			//this.die();
		}
		else
		{
			m_sndManager.stop(C_SND_BULLET_NOT_IMPACT);
			m_sndManager.play(C_SND_BULLET_NOT_IMPACT);
			this.m_smoke.start();
		}

	}

	
	Enemy.prototype.fire = function()
	{
		var pFire = new Fire();
		
		pFire.initWith
		(
			1, 
			this.m_x + cosOf(-C_PLAYER_SPEED, this.m_rotationAngle), 
			this.m_y + sinOf(-C_PLAYER_SPEED, this.m_rotationAngle), 
			cosOf(C_PLAYER_SPEED * 2, this.m_rotationAngle),
			sinOf(C_PLAYER_SPEED * 2, this.m_rotationAngle),
			this.m_class
		);

		pFire.setRange(this.m_cannon.m_currentRange);
		pFire.setRadious(this.m_cannon.m_currentRadious);
		pFire.setEnergy(this.m_cannon.energyUsed());
		
		m_maze.addObj(pFire);

		m_sndManager.stop(C_SND_SHOOT);
		m_sndManager.play(C_SND_SHOOT);
	}
	
	Enemy.prototype.die = function()
	{
		this.m_status = C_STATUS_DIE;
	}

	Enemy.prototype.destroyed = function()
	{
		this.m_status = C_STATUS_DESTROYED;
	}
	
	Enemy.prototype.isRotating = function()
	{
		return (this.m_movDir & 5) > 0;
	}

	Enemy.prototype.startRotation = function(_moveDirection)
	{
		if (this.isRotating() == true)
			return;

		this.m_movDir = _moveDirection;
		this.m_rotationTimer.start();

		if (_moveDirection == C_DIR_RIGHT)
				this.m_rotationDir = -1;

		if (_moveDirection == C_DIR_LEFT)
				this.m_rotationDir = 1;

		if (m_sndManager.isPlaying(C_SND_TANQUETA_EN) == false)
		{
			//m_sndManager.setLoop(C_SND_TANQUETA_EN, true);
			//m_sndManager.play(C_SND_TANQUETA_EN);
		}
	}

	Enemy.prototype.stopRotation = function()
	{ 	
		if (this.isRotating() == false)
			return;

		this.m_movDir = this.m_movDir & (255-5);

		if (m_sndManager.isPlaying(C_SND_TANQUETA_EN) == true)
		{
			//m_sndManager.stop(C_SND_TANQUETA_EN);
		}
		
		this.m_rotationTimer.reset();
		this.m_rotationDir = 0;
	}

	Enemy.prototype.linkTank = function(_tank)
	{ 
		this.m_linkedTank = _tank;
	}

	Enemy.prototype.getCurrentEnergy = function()
	{ 
		if (this.m_shield != null) 
			return this.m_shield.indicatorValue();
		else
			return 0;
	}

}
