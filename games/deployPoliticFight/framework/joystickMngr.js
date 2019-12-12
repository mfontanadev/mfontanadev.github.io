// Class KeyboazrdMngr:
//    Se encarga de mostrar en pantalla botones para jugar en ambientes sin teclado.

var C_BUTTON_RIGHT = 1;
var C_BUTTON_UP = 2;
var C_BUTTON_LEFT = 4;
var C_BUTTON_DOWN = 8;

var C_BUTTON_A = 16;	// Jump
var C_BUTTON_B = 32;	// Protect
var C_BUTTON_C = 64;	// Punch

var C_BUTTON_SHOW = -1;	// Punch

var C_BUTTON_SIZE = 20;

function JoystickMngr()
{

	JoystickMngr.prototype.initWith = function ()
	{

		
		//C_DEBUG_SHOW_JOYSTICK = !C_DEBUG_SHOW_JOYSTICK;
		this.m_showJoystickButtonHitted = 0;
		this.m_pressedButton = 0;
		this.m_buttons = [];
		var button = null;
					
		var horizon = (m_canvas.height / 2);
		var newSize = C_BUTTON_SIZE * 2;
		
		button = new chButton(); 
		button.initWith(newSize * 3,horizon, C_BUTTON_RIGHT, 	C_BUTTON_SIZE, rgbaToColor(128,128,128, .5), C_BUTTON_RIGHT_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(newSize * 2,horizon - newSize, C_BUTTON_UP, 		C_BUTTON_SIZE, rgbaToColor(128,128,128, .5), C_BUTTON_UP_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(newSize * 1,horizon , C_BUTTON_LEFT, 		C_BUTTON_SIZE, rgbaToColor(128,128,128, .5), C_BUTTON_LEFT_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(newSize * 2,horizon + newSize, C_BUTTON_DOWN, 		C_BUTTON_SIZE, rgbaToColor(128,128,128, .5), C_BUTTON_DOWN_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(m_canvas.width - newSize * 3, horizon, C_BUTTON_A, 		C_BUTTON_SIZE, rgbaToColor(255,0,0, .5), C_BUTTON_A_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(m_canvas.width - newSize * 2, horizon, C_BUTTON_B, 		C_BUTTON_SIZE, rgbaToColor(0,255,0, .5), C_BUTTON_B_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(m_canvas.width - newSize * 1, horizon, C_BUTTON_C, 		C_BUTTON_SIZE, rgbaToColor(0,0,255, .5), C_BUTTON_C_KEY);
		this.m_buttons.push(button);

		button = new chButton(); 
		button.initWith(m_canvas.width / 2, m_canvas.height / 2, C_BUTTON_SHOW, C_BUTTON_SIZE*5, rgbaToColor(0,0,255, .5), 0);
		this.m_buttons.push(button);
	}

	
	JoystickMngr.prototype.implementGameLogic = function (_keyboardMngr)
	{
		this.m_pressedButton = 0;
		for (var i = 0; i < this.m_buttons.length - 1; i++) 
		{
			if (m_mouseClick == true)
			{
				if (this.m_buttons[i].collision(m_mousePosX, m_mousePosY, m_scaleX, m_scaleY))
				{
					this.m_pressedButton = this.m_pressedButton | this.m_buttons[i].m_type;
					_keyboardMngr.keyDown(this.m_buttons[i].m_keyScanCode);	
					this.m_buttons[i].m_pressed = true;
				}
			}
			else
			{
				if (this.m_buttons[i].m_pressed == true)
				{
					this.m_buttons[i].m_pressed = false;
					_keyboardMngr.keyUp(this.m_buttons[i].m_keyScanCode);	
				}
			}
		}

		// If we hit three times the show button then change status.
		if (m_mouseClick == true)
		{
			if (this.m_buttons[this.m_buttons.length-1].collision(m_mousePosX, m_mousePosY, m_scaleX, m_scaleY))
			{
				this.m_pressedButton = this.m_pressedButton | this.m_buttons[i].m_type;
				this.m_buttons[i].m_pressed = true;
			}
		}
		else
		{
			if (this.m_buttons[i].m_pressed == true)
			{
				this.m_buttons[i].m_pressed = false;
				this.m_showJoystickButtonHitted++;
				if (this.m_showJoystickButtonHitted == 3)
				{
					this.m_showJoystickButtonHitted = 0;
					C_DEBUG_SHOW_JOYSTICK = !C_DEBUG_SHOW_JOYSTICK;
				}
			}
		}
	}

	JoystickMngr.prototype.isPressed = function (_buttonId)
	{
		return (this.m_pressedButton & _buttonId);
	}
	
	JoystickMngr.prototype.render = function (_canvas, _context)
	{
		// The -1 value avoid render show button.
		for (var i = 0; i < this.m_buttons.length - 1; i++) 
		{
			renderCircle(_canvas, _context, 
						 this.m_buttons[i].m_x,  this.m_buttons[i].m_y, 
						 this.m_buttons[i].m_size, this.m_buttons[i].m_color);
		}
	}

	JoystickMngr.prototype.fLog = function () 
	{ 
		var logText = "chKeyboard: " + "; "; 
		
		return logText;
	}  

	JoystickMngr.prototype.buttonDown = function (_scanCode) 
	{ 
	}  

	JoystickMngr.prototype.buttonUp = function (_scanCode) 
	{ 
	}  
	
	JoystickMngr.prototype.disableButtonDownAWhile = function (_scanCode, _waitMilis) 
	{ 
	}  

	JoystickMngr.prototype.reset = function () 
	{ 
	}  

}

function chButton() 
{ 
	chButton.prototype.initWith = function (_x, _y, _type, _size, _color, _scanCode)
	{
		this.m_x = _x ;
		this.m_y = _y ;
		this.m_type = _type;
		this.m_size = _size;
		this.m_color = _color;
		this.m_keyScanCode = _scanCode;
		this.m_pressed = false;
	}

	chButton.prototype.collision = function (_x, _y, _scX, _scY)
	{
		
		var dx = ((this.m_x * _scX) - _x);
		var dy = ((this.m_y * _scY) - _y);
		var d = Math.sqrt(dx * dx + dy * dy);
	
		if (d <= this.m_size)
			return true;
		else
			return false;
	}

}