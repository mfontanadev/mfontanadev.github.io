// Class FontMngr:


function FontMngr () 
{ 
	var C_FONT_SIZE_WIDTH = 16;
	var C_FONT_SIZE_HEIGHT = 16;
	
	FontMngr.prototype.initWith = function ()
	{
		this.m_fontDef = '.,;:[]=-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ* ?';
		
		/*this.font
		(
			['.',',',';',':','[',']','=','-','0','1','2','3','4','5','6','7','8','9',
			 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
			 'S','T','U','V','W','X','Y','Z','*',' ','?']
		);*/
		// EXAMPLE
		//m_fontMngr.drawText(_canvas, _context, 'HOLA MUNDO QUE TAL SCORE=' + chFormatString(number, '0', 5), 0, 0, rgbToColor(0,0,0));

		
	}

	FontMngr.prototype.drawText = function(_canvas, _context, _text, _x, _y,  _textColor)
	{
		this.drawTextBase(_canvas, _context, _text, _x, _y,  _textColor, false)
	}
	
	
	FontMngr.prototype.drawTextSmall = function(_canvas, _context, _text, _x, _y,  _textColor)
	{
		this.drawTextBase(_canvas, _context, _text, _x, _y,  _textColor, true)
	}
	
	FontMngr.prototype.drawTextBase = function(_canvas, _context, _text, _x, _y,  _textColor, _smallSize)
	{
		//return;
		var imgOffset = -1;
		var charIndex = '';
		var sizeFactor = 0;
		var tmpBitmapID = C_IMG_FONT;
		
		if (_smallSize == true)
		{
			sizeFactor = 1;
			tmpBitmapID = C_IMG_FONT_SMALL;
		}
		
		var tmpFontSizeW = C_FONT_SIZE_WIDTH >> sizeFactor;
		var tmpFontSizeH = C_FONT_SIZE_HEIGHT >> sizeFactor;
		
		
		for (var i = 0; i < _text.length; i++)
		{
			imgOffset = this.m_fontDef.indexOf(_text.charAt(i));
			if (imgOffset != -1)
			{
				this.drawCharWithColor(
				_canvas, 
				_context, 
				m_resourceMngr.getImage(tmpBitmapID), 
				1 + (tmpFontSizeW * imgOffset),
				1,
				tmpFontSizeW,
				tmpFontSizeH,
				_x + (i * tmpFontSizeW),
				_y,
				tmpFontSizeW,
				tmpFontSizeH,
				1,
				 _textColor);
			}
		}
	}

	
	FontMngr.prototype.drawCharWithColor = function(_canvas, _context, _bitmap, _sx, _sy, _sw, _sh, _x, _y, _w, _h, _percent,  _textColor) 
	{
		
		_context.save();

		renderRectangleFillTransparent(_canvas, _context, _x, _y, _w, _h, _textColor, _percent);
		//_context.globalAlpha = _percent;
		//_context.drawImage(_bitmap, _sx, _sy, _sw, _sh, _x, _y, _w, _h);
		_context.drawImage(_bitmap, _sx, _sy, _sw-1, _sh-1, _x, _y, _w-1, _h-1);
		_context.restore();
		
	}

}

