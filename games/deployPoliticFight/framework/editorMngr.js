// Class EditorMngr
function EditorMngr () 
{ 
	EditorMngr.prototype.initWith = function (_canvas, _maze)
	{
		this.m_arrObj = new Array();
	
		this.m_toolboxCols = 3;
		this.m_toolboxRows = 4;
		
		this.m_selectedResourceId = 0;
		this.m_offsetX = _canvas.width - C_CELL_WIDTH * 3;
		this.m_offsetY = 0;
		
		this.addToolbarItem(2,0,C_IMG_BRICK);
		this.addToolbarItem(1,0,C_IMG_WOOD);
		this.addToolbarItem(0,0,C_IMG_GREEN);
		//this.addToolbarItem(0,1,C_IMG_GENERATOR);
		this.addToolbarItem(0,1,C_IMG_ROAD_II);
		this.addToolbarItem(1,1,C_IMG_ROAD_I);
		this.addToolbarItem(2,1,C_IMG_ROAD_H);
		this.addToolbarItem(0,2,C_IMG_ROAD_III);
		this.addToolbarItem(1,2,C_IMG_ROAD_IIII);
		this.addToolbarItem(2,2,C_IMG_ROAD_V);
		this.addToolbarItem(0,3,C_IMG_ROAD_X);
		this.addToolbarItem(1,3,C_IMG_GREEN_FAR);

		this.addToolbarItem(0,4,C_IMG_HERO);
		this.addToolbarItem(1,4,C_IMG_SMOG_CAR_CW);
		this.addToolbarItem(2,4,C_IMG_SMOG_CAR_UW);

		//this.addToolbarItem(2,4,C_IMG_SMOG_CAR_GREEN);		
		
		this.m_gridColor = rgbToColor(64, 64, 64);
		this.m_maze = _maze;

		this.m_cursorColor = rgbToColor(255, 0, 0);
		this.m_cursorToolboxColor = rgbToColor(250, 250, 0);
		this.m_cx = 0;
		this.m_cy = 0;

		this.m_ctx = 0;		// toolbox position x and y.
		this.m_cty = 0;		
		
		this.updateSelectedCursor();
	}
	
	// 
	EditorMngr.prototype.handleInputs = function () 
	{ 
		if (m_keyboardMngr.isKeyDown(C_KEY_SHIFT) == true)
			this.processToolboxCursor();
		else
			this.processEditorCursor();
	}


	EditorMngr.prototype.processToolboxCursor = function () 
	{
		if (m_keyboardMngr.isKeyDown(C_KEY_RIGHT) == true)
		{
			this.m_ctx = this.m_ctx + 1;
			if (this.m_ctx  > this.m_toolboxCols)
				this.m_ctx = this.m_toolboxCols - 1;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_RIGHT, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_UP) == true)
		{
			this.m_cty = this.m_cty - 1;
			if (this.m_cty  < 0)
				this.m_cty = 0;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_UP, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_LEFT) == true)
		{
			this.m_ctx = this.m_ctx - 1;
			if (this.m_ctx  < 0)
				this.m_ctx = 0;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_LEFT, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_DOWN) == true)
		{
			this.m_cty = this.m_cty + 1;
			if (this.m_cty  > this.m_maze.C_ROWS)
				this.m_cty = this.m_toolboxRows - 1;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_DOWN, 50);
		}
		
		this.updateSelectedCursor();
	}  

	EditorMngr.prototype.processEditorCursor = function () 
	{
		if (m_keyboardMngr.isKeyDown(C_KEY_RIGHT) == true)
		{
			this.m_cx = this.m_cx + 1;
			if (this.m_cx  >= this.m_maze.C_COLS)
				this.m_cx = this.m_maze.C_COLS - 1;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_RIGHT, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_UP) == true)
		{
			this.m_cy = this.m_cy - 1;
			if (this.m_cy  < 0)
				this.m_cy = 0;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_UP, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_LEFT) == true)
		{
			this.m_cx = this.m_cx - 1;
			if (this.m_cx  < 0)
				this.m_cx = 0;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_LEFT, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_DOWN) == true)
		{
			this.m_cy = this.m_cy + 1;
			if (this.m_cy  >= this.m_maze.C_ROWS)
				this.m_cy = this.m_maze.C_ROWS - 1;

			m_keyboardMngr.disableKeyDownAWhile(C_KEY_DOWN, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_SPACE) == true)
		{
			m_maze.addObjectToMap(this.m_cx, this.m_cy,  this.getClassID(this.m_selectedResourceId));
			m_keyboardMngr.disableKeyDownAWhile(C_KEY_SPACE, 50);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_RETURN) == true)
		{
			this.saveEdition();
			m_keyboardMngr.disableKeyDownAWhile(C_KEY_RETURN, 500);
		}
		else if (m_keyboardMngr.isKeyDown(C_KEY_DELETE) == true)
		{
			this.deleteObjectAtCursorPosition();
			m_keyboardMngr.disableKeyDownAWhile(C_KEY_DELETE, 50);
		}


	}  

	// 
	EditorMngr.prototype.implementGameLogic = function () 
	{ 
		this.handleInputs();
	}  

	EditorMngr.prototype.render = function (_canvas, _context)
	{
		// Render toolbox
		var r;
		for (var i = 0; i < this.m_arrObj.length; i++)
		{
			r = this.m_arrObj[i];
			renderRectangleFillTransparent(_canvas, _context, r.m_x - 1, r.m_y - 1, C_CELL_WIDTH + 2,  C_CELL_HEIGHT + 2, this.m_gridColor, 1);
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(r.m_z), r.m_x, r.m_y, 1);
		}

		// Toolbox cursor
		var px = this.m_offsetX + this.m_ctx * (C_CELL_WIDTH + 1);
		var py = this.m_offsetY + this.m_cty * (C_CELL_HEIGHT + 1);
		renderRectangle(_canvas, _context, px, py, C_CELL_WIDTH + 1,  C_CELL_HEIGHT + 1, this.m_cursorToolboxColor, 1);
		
		// Render grid
		for (var y = 0; y < this.m_maze.C_ROWS; y++)
		{
			for (var x = 0; x < this.m_maze.C_COLS; x++)
			{
				renderRectangle(_canvas, _context, x * C_CELL_WIDTH, (1 + y) * C_CELL_HEIGHT, C_CELL_WIDTH , C_CELL_HEIGHT , this.m_gridColor);
			}
		}

		// Render cursor
		renderRectangle(_canvas, _context, this.m_cx * C_CELL_WIDTH, (1 + this.m_cy) * C_CELL_HEIGHT, C_CELL_WIDTH , C_CELL_HEIGHT , this.m_cursorColor);
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_selectedResourceId), this.m_cx * C_CELL_WIDTH, (1 + this.m_cy) * C_CELL_HEIGHT, 0.5);
		
	}

	EditorMngr.prototype.collisionRectangle = function () 
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

	EditorMngr.prototype.fLog = function () 
	{ 
		var logText = "Brick: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ", " + 
		"m_direction=" + this.m_direction + ", ";
		"m_persistenceName=" + this.persistenceName+ ";";; 
		return logText;
	}  
	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	EditorMngr.prototype.moveLogic = function ()
	{ 
	}

	// 
	EditorMngr.prototype.addToolbarItem = function (_x, _y, _id) 
	{ 
		var px = this.m_offsetX + _x * (C_CELL_WIDTH + 1);
		var py = this.m_offsetY + _y * (C_CELL_HEIGHT + 1);
		var obj = new chPoint();
		
		obj.initWith(px, py, _id, 0);
		
		this.m_arrObj.push(obj);
	}  

	// 
	EditorMngr.prototype.getClassID = function (_bitmapId) 
	{
		var result = '00';
		
		switch(_bitmapId)
		{
			case C_IMG_GREEN: result = C_CLASS_BRICK * 10 + C_OBJ_TYPE_GREEN; break;
			case C_IMG_WOOD: result = C_CLASS_BRICK * 10 + C_OBJ_TYPE_WOOD; break;
			case C_IMG_BRICK: result = C_CLASS_BRICK * 10 + C_OBJ_TYPE_BRICK; break;
			case C_IMG_ROAD_II: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_II ; break;			
			case C_IMG_ROAD_I: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_I ; break;
			case C_IMG_ROAD_H: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_H; break;
			case C_IMG_ROAD_III: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_III; break;
			case C_IMG_ROAD_IIII: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_IIII; break;
			case C_IMG_ROAD_V: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_V; break;
			case C_IMG_ROAD_X: result = C_CLASS_DECORATION * 10 + C_OBJ_TYPE_X; break;
			case C_IMG_GREEN_FAR: result = C_CLASS_DECORATION * 10 + C_OBJ_GREEN_FAR; break;

			case C_IMG_HERO: result = C_CLASS_PLAYER * 10 + C_OBJ_TYPE_PLAYER; break;
			case C_IMG_SMOG_CAR_CW: result = C_CLASS_SMOGCAR * 10 + C_OBJ_TYPE_SMOGCAR_CW; break;
			case C_IMG_SMOG_CAR_UW: result = C_CLASS_SMOGCAR * 10 + C_OBJ_TYPE_SMOGCAR_ACW; break;
		}

		return result;
	}
	
	EditorMngr.prototype.updateSelectedCursor = function()
	{
		// Match current toolbox cursor positon with toolbox items.
		var r;
		var px = 0;
		var py = 0;

		for (var i = 0; i < this.m_arrObj.length; i++)
		{
			r = this.m_arrObj[i];
			px = this.m_offsetX + this.m_ctx * (C_CELL_WIDTH + 1);
			py = this.m_offsetY + this.m_cty * (C_CELL_HEIGHT + 1);
			
			if (r.m_x == px && r.m_y == py)
			{
				this.m_selectedResourceId = r.m_z;
				break;
			}
		}
	}
		
	EditorMngr.prototype.saveEdition = function()
	{
		var cellSerialized = '';
		var tmpLevel = new Level();
		tmpLevel.m_id = 0;
		tmpLevel.m_cols = m_maze.C_COLS;
		tmpLevel.m_rows = m_maze.C_ROWS; 
		tmpLevel.m_persistenceName = m_maze.m_lev.m_persistenceName; 
		
		for (var y = 0; y < tmpLevel.m_rows ; y++)
		{
			for (var x = 0; x < tmpLevel.m_cols; x++)
			{
				cellSerialized = this.getObjectsInCell(x, y);
				tmpLevel.m_matrix.push(cellSerialized);
			}
		}

		m_storeMngr.setValue(tmpLevel.m_persistenceName, tmpLevel.serialize());
		m_storeMngr.showAll();
	}

	// Return a concatenated string of classId from _x, _y maps position objects.
	// If nothing in cell position, return '00'.
	EditorMngr.prototype.getObjectsInCell = function(_x, _y)
	{
		var r;
		var px = 0;
		var py = 0;
		var result = '';
		var editRect = new chRect();
		var mazeRect = new chRect();
		
		px = (_x * (C_CELL_WIDTH + 1)) + (C_CELL_WIDTH >> 1);
		py = (_y * (C_CELL_HEIGHT + 1)) + (C_CELL_HEIGHT >> 1);

		editRect.m_x1 = px - 1;
		editRect.m_y1 = py - 1;
		editRect.m_x2 = px + 1;
		editRect.m_y2 = py + 1;
		
		for (var i = 0; i < this.m_maze.m_arrObj.length; i++)
		{
			r = this.m_maze.m_arrObj[i];
			mazeRect = r.collisionRectangle();
			
			if (collisionRectRect(
				editRect.m_x1,editRect.m_y1,editRect.m_x2,editRect.m_y2, 
				mazeRect.m_x1,mazeRect.m_y1,mazeRect.m_x2,mazeRect.m_y2) == true)
			{
				result = result + this.m_maze.serialize(r.m_class, r.m_type);
			}
		}
		
		if (result.length == 0)
			result = '00';

		return result;
	}

	EditorMngr.prototype.deleteObjectAtCursorPosition = function()
	{
		var px = (this.m_cx * (C_CELL_WIDTH + 1)) + (C_CELL_WIDTH >> 1);
		var py = (this.m_cy * (C_CELL_HEIGHT + 1)) + (C_CELL_HEIGHT >> 1);
		
		this.m_maze.deleteObjAtPosition(px, py);
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
}
