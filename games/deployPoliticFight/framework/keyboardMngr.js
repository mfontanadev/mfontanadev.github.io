// Constants for jeyboard
var C_DIR_RIGHT = 1;
var C_DIR_UP = 2;
var C_DIR_LEFT = 4;
var C_DIR_DOWN = 8;

var C_KEY_RIGHT = 39;
var C_KEY_UP = 38;
var C_KEY_LEFT = 37;
var C_KEY_DOWN = 40;
var C_KEY_RETURN = 13;
var C_KEY_SPACE = 32;
var C_KEY_SHIFT = 16;
var C_KEY_DELETE = 46;

var C_KEY_CHAR_A = 65;
var C_KEY_CHAR_S = 83;
var C_KEY_CHAR_D = 68;
var C_KEY_CHAR_W = 87;

var C_KEY_CHAR_F = 70;
var C_KEY_CHAR_G = 71;
var C_KEY_CHAR_H = 72;

var C_KEY_CHAR_J = 74;
var C_KEY_CHAR_K = 75;
var C_KEY_CHAR_L = 76;

var C_KEY_CHAR_C = 67;

var C_KEY_F1 = 112;
var C_KEY_F2 = 113;
var C_KEY_F3 = 114;
var C_KEY_F4 = 115;
var C_KEY_F5 = 116;
var C_KEY_F6 = 117;
var C_KEY_F7 = 118;
var C_KEY_F8 = 119;
var C_KEY_F9 = 120;
var C_KEY_F10 = 121;
var C_KEY_F11 = 122;
var C_KEY_F12 = 123;

var C_KEY_NUMBER_0 = 48;
var C_KEY_NUMBER_1 = 49;
var C_KEY_NUMBER_2 = 50;
var C_KEY_NUMBER_3 = 51;
var C_KEY_NUMBER_4 = 52;
var C_KEY_NUMBER_5 = 53;
var C_KEY_NUMBER_6 = 54;
var C_KEY_NUMBER_7 = 55;
var C_KEY_NUMBER_8 = 56;
var C_KEY_NUMBER_9 = 57;

// Class KeyboazrdMngr:
//    Se encarga de setear la matriz de teclas pulsadas.
function KeyboardMngr()
{
	KeyboardMngr.prototype.initWith = function ()
	{
		this.m_arrKeys = [];
		this.m_arrWait = [];
		
		this.reset();
	}

	KeyboardMngr.prototype.implementGameLogic = function ()
	{
		for (var i = 0; i < 256; i++) 
		{
			if (this.m_arrWait[i] > 0)
			{
				this.m_arrWait[i] = this.m_arrWait[i] - 1;
			
				if (this.m_arrWait[i] <= 0)
				{
					this.m_arrWait[i] = 0;
					this.m_arrKeys[i] = 0;
				}
			}
		}
	}
	
	KeyboardMngr.prototype.fLog = function () 
	{ 
		var logText = "chKeyboard: " + "; "; 
		
		return logText;
	}  

	KeyboardMngr.prototype.keyDown = function (_scanCode) 
	{ 
		//console.log(_scanCode);
		if (this.m_arrKeys[_scanCode] != -1 && this.m_arrKeys[_scanCode] != -2)
			this.m_arrKeys[_scanCode] = 1;
		
		this.processDebugOptions(_scanCode);
	}  
	
	KeyboardMngr.prototype.processDebugOptions = function (_scanCode) 
	{
		if (_scanCode == C_KEY_F9)
			C_DEBUG_SHOW_LINES = !C_DEBUG_SHOW_LINES;
		if (_scanCode == C_KEY_F10)
			C_DEBUG_SHOW_JOYSTICK = !C_DEBUG_SHOW_JOYSTICK;
	}
	
	KeyboardMngr.prototype.keyUp = function (_scanCode) 
	{ 
		if (this.m_arrKeys[_scanCode] != -1)
			this.m_arrKeys[_scanCode] = 0;
	}  
	
	KeyboardMngr.prototype.isKeyDown = function (_scanCode) 
	{ 
		return this.m_arrKeys[_scanCode] == 1;
	}  

	KeyboardMngr.prototype.disableKeyDownAWhile = function (_scanCode, _waitMilis) 
	{ 
		this.m_arrKeys[_scanCode] = -1;
		if (_waitMilis <= C_FPS_RENDER)
			this.m_arrWait[_scanCode] = 1;
		else
			this.m_arrWait[_scanCode] = Math.round(_waitMilis / C_FPS_RENDER, 0);
	}  

	KeyboardMngr.prototype.disableUntilKeyUp = function (_scanCode) 
	{ 
		this.m_arrKeys[_scanCode] = -2;
	}  

	KeyboardMngr.prototype.reset = function () 
	{ 
		for (var i = 0; i < 256; i++) 
		{
			this.m_arrKeys[i] = 0;
			this.m_arrWait[i] = 0;
		}
	}  

	KeyboardMngr.prototype.showKeyboardMatrix = function (_canvas, _context) 
	{
		// Render KEYBOARD
		var particle = null;
		for (var i = 0; i < 256; i++) 
		{
			if (this.isKeyDown(i))
			{
				renderCircle(_canvas, _context, i * 5, 10, 3, rgbaToColor(0, 0, 0, 0.5));
				//logmsg.log('keydownkey=' + i);
				//console.log('keydownkey=' + i);
			}
		}
	}

}