	// Class Score
function Score () 
{ 
	Score.prototype.initWith = function ()
	{
		this.m_lastHero1Energy = 0;
		this.m_lastHero1MaxEnergy = 0;
		this.m_lastHero1FaceSprite = -1;
		this.m_lastHero1XFace = 0;
		this.m_lastHero1YFace = 0;
		this.m_lastHero1Name = "GUY";

		this.m_lastHero2Energy = 0;
		this.m_lastHero2MaxEnergy = 0;
		this.m_lastHero2FaceSprite = -1;
		this.m_lastHero2XFace = 0;
		this.m_lastHero2YFace = 0;
		this.m_lastHero2Name = "CODY";

		this.m_lastEnemy1Energy = 0;
		this.m_lastEnemy1MaxEnergy = 0;
		this.m_lastEnemy1FaceSprite = -1;
		this.m_lastEnemy1XFace = 0;
		this.m_lastEnemy1YFace = 0;
		this.m_lastEnemy1Name = "NN";
		this.m_lastEnemy1Id = 0;

		this.m_lastEnemy2Energy = 0;
		this.m_lastEnemy2MaxEnergy = 0;
		this.m_lastEnemy2FaceSprite = -1;
		this.m_lastEnemy2XFace = 0;
		this.m_lastEnemy2YFace = 0;
		this.m_lastEnemy2Name = "NN";
		this.m_lastEnemy2Id = 0;
	}
	
	// 
	Score.prototype.implementGameLogic = function () 
	{ 
	}  

	Score.prototype.render = function (_canvas, _context)
	{
		var number = 123;
		
		if (this.m_lastHero1Energy  > 0 && this.m_lastHero1FaceSprite != -1)
		{
			var heroBarSize = this.m_lastHero1MaxEnergy;
			var hero1Px = 4 + 32 + 4;
			var hero1Py = 32 + 4 - 20 + 2;
			var heroEnergyWidth = (this.m_lastHero1Energy * heroBarSize) / 100;
			
			renderRectangle(				_canvas, _context, hero1Px, hero1Py, heroBarSize, 20-2, rgbToColor(128,128,128), 1);
			renderRectangleFillTransparent(	_canvas, _context, hero1Px + 1, hero1Py + 1, heroBarSize - 2, 20-4, rgbToColor(200,30,30), 1);
			
			if (heroEnergyWidth > 0)
			{
				renderRectangleFillTransparent(	_canvas, _context, hero1Px + 1, hero1Py + 1, heroEnergyWidth - 2, 20-4, rgbToColor(30,200,30), 1);
			}
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_lastHero1FaceSprite), this.m_lastHero1XFace, this.m_lastHero1YFace,16,16,  2, 2,  16, 16,  1, 1); 
			m_fontMngr.drawText(_canvas, _context, this.m_lastHero1Name, hero1Px , hero1Py - 16, rgbToColor(0,0,0));
		}

		if (this.m_lastHero2Energy  > 0 && this.m_lastHero2FaceSprite != -1)
		{
			var heroBarSize = this.m_lastHero2MaxEnergy;
			var hero2Px = 4 + 32 + 4 + (_canvas.width / 2);
			var hero2Py = 32 + 4 - 20 + 2;
			var heroEnergyWidth = (this.m_lastHero2Energy * heroBarSize) / 100;
			
			renderRectangle(				_canvas, _context, hero2Px, hero2Py, heroBarSize, 20 - 2, rgbToColor(128,128,128), 1);
			renderRectangleFillTransparent(	_canvas, _context, hero2Px + 1, hero2Py + 1, heroBarSize - 2, 20-4, rgbToColor(200,30,30), 1);
			
			if (heroEnergyWidth > 0)
			{
				renderRectangleFillTransparent(	_canvas, _context, hero2Px + 1, hero2Py + 1, heroEnergyWidth - 2, 20-4, rgbToColor(30,200,30), 1);
			}
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_lastHero2FaceSprite), this.m_lastHero2XFace, this.m_lastHero2YFace,16,16,  2 + (_canvas.width / 4), 2,  16, 16,  1, 1); 
			m_fontMngr.drawText(_canvas, _context, this.m_lastHero2Name, hero2Px,  hero2Py - 16 , rgbToColor(0,0,0));
		}

		if (this.m_lastEnemy1Energy  > 0 && this.m_lastEnemy1FaceSprite != -1)
		{
			var enemyBarSize = this.m_lastEnemy1MaxEnergy;
			var enemy1Px = 4 + 32 + 4;
			var enemy1Py = 32 + 4 + (18 * 2) - 20 +2;
			var enemyEnergy1Width = (this.m_lastEnemy1Energy * enemyBarSize) / 100;
			
			renderRectangle(				_canvas, _context, enemy1Px, enemy1Py, enemyBarSize, 20-2, rgbToColor(128,128,128), 1);
			renderRectangleFillTransparent(	_canvas, _context, enemy1Px + 1, enemy1Py + 1, enemyBarSize - 2, 20-4, rgbToColor(200,30,30), 1);
			if (enemyEnergy1Width > 0)
			{
				renderRectangleFillTransparent(	_canvas, _context, enemy1Px + 1, enemy1Py + 1, enemyEnergy1Width - 2, 20-4, rgbToColor(30,200,30), 1);
			}
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_lastEnemy1FaceSprite), this.m_lastEnemy1XFace, this.m_lastEnemy1YFace,16,16,  2, 2 + 18,  16, 16,  1, 1); 
			m_fontMngr.drawText(_canvas, _context, this.m_lastEnemy1Name, enemy1Px,  enemy1Py - 16, rgbToColor(0,0,0));
		}
		
		if (this.m_lastEnemy2Energy  > 0 && this.m_lastEnemy2FaceSprite != -1)
		{
			var enemyBarSize = this.m_lastEnemy2MaxEnergy;
			var enemy2Px = 4 + 32 + 4 + (_canvas.width / 2);
			var enemy2Py = 32 + 4 + (18 * 2) - 20 + 2;
			var enemyEnergy2Width = (this.m_lastEnemy2Energy * enemyBarSize) / 100;
			
			renderRectangle(				_canvas, _context, enemy2Px, enemy2Py, enemyBarSize, 20-2, rgbToColor(128,128,128), 1);
			renderRectangleFillTransparent(	_canvas, _context, enemy2Px + 1, enemy2Py + 1, enemyBarSize - 2, 20-4, rgbToColor(200,30,30), 1);
			if (enemyEnergy2Width > 0)
			{
				renderRectangleFillTransparent(	_canvas, _context, enemy2Px + 1, enemy2Py + 1, enemyEnergy2Width - 2, 20-4, rgbToColor(30,200,30), 1);
			}
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_lastEnemy2FaceSprite), this.m_lastEnemy2XFace, this.m_lastEnemy2YFace,16,16,  2 + (_canvas.width / 4), 2 + 18,  16, 16,  1, 1); 
			m_fontMngr.drawText(_canvas, _context, this.m_lastEnemy2Name, enemy2Px, enemy2Py - 16, rgbToColor(0,0,0));
		}

	}

	Score.prototype.setHero1Energy = function (_maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name) 
	{ 
		this.m_lastHero1Energy = _energy;
		if (this.m_lastHero1Energy < 0)
			this.m_lastHero1Energy = 0;
		
		this.m_lastHero1MaxEnergy = _maxEnergy;
		if (this.m_lastHero1MaxEnergy < 0)
			this.m_lastHero1MaxEnergy = 0;

		this.m_lastHero1FaceSprite = _spriteSheet;
		this.m_lastHero1XFace = _xFace;
		this.m_lastHero1YFace = _yFace;
		this.m_lastHero1Name = _name;
	}

	Score.prototype.setHero2Energy = function (_maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name) 
	{ 
		this.m_lastHero2Energy = _energy;
		if (this.m_lastHero2Energy < 0)
			this.m_lastHero2Energy = 0;
		
		this.m_lastHero2MaxEnergy = _maxEnergy;
		if (this.m_lastHero2MaxEnergy < 0)
			this.m_lastHero2MaxEnergy = 0;

		this.m_lastHero2FaceSprite = _spriteSheet;
		this.m_lastHero2XFace = _xFace;
		this.m_lastHero2YFace = _yFace;
		this.m_lastHero2Name = _name;
	}

	Score.prototype.setEnemy1Energy = function (_id, _maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name) 
	{ 
		
		this.m_lastEnemy1Energy = _energy;
		if (this.m_lastEnemy1Energy < 0)
			this.m_lastEnemy1Energy = 0;

		this.m_lastEnemy1MaxEnergy = _maxEnergy;
		if (this.m_lastEnemy1MaxEnergy < 0)
			this.m_lastEnemy1MaxEnergy = 0;
	
		this.m_lastEnemy1FaceSprite = _spriteSheet;
		this.m_lastEnemy1XFace = _xFace;
		this.m_lastEnemy1YFace = _yFace;
		this.m_lastEnemy1Name = _name;
		this.m_lastEnemy1Id = _id;
	
		if (this.m_lastEnemy1Id == this.m_lastEnemy2Id)
			this.m_lastEnemy2FaceSprite = -1;
	}

	Score.prototype.setEnemy2Energy = function (_id, _maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name) 
	{ 
		
		this.m_lastEnemy2Energy = _energy;
		if (this.m_lastEnemy2Energy < 0)
			this.m_lastEnemy2Energy = 0;

		this.m_lastEnemy2MaxEnergy = _maxEnergy;
		if (this.m_lastEnemy2MaxEnergy < 0)
			this.m_lastEnemy2MaxEnergy = 0;
	
		this.m_lastEnemy2FaceSprite = _spriteSheet;
		this.m_lastEnemy2XFace = _xFace;
		this.m_lastEnemy2YFace = _yFace;
		this.m_lastEnemy2Name = _name;
		this.m_lastEnemy2Id = _id;

		if (this.m_lastEnemy2Id == this.m_lastEnemy1Id)
			this.m_lastEnemy1FaceSprite = -1;
	}
	
	Score.prototype.fLog = function () 
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
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
}

