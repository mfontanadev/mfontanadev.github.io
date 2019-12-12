// Docs
// Load image and show with java script: http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/

// ***************************************
// General helpers
// ***************************************
function msglog(_text)
{
	if (C_DEBUG_MODE == true && C_LOG == true)
	{
		console.log(_text);
		
		//var strTextArea = m_textArea.value;
		if (m_textArea != null && typeof m_textArea != 'undefined')
			m_textArea.value = m_textArea.value + _text  + "\n";

	}
}

function renderCircle(canvas, context, _cenX, _cenY, _radious, _fillColor)
{
	context.beginPath();
	context.lineWidth = 3;
	context.fillStyle = _fillColor;
	context.strokeStyle = _fillColor;
	context.arc(_cenX, _cenY, _radious, 0, 2 * Math.PI, false);
	context.fill();
	context.stroke();
}

function renderCircleTransparent(canvas, context, _cenX, _cenY, _radious, _fillColor, _alpha)
{
	context.save();
	context.beginPath();
	context.lineWidth = 3;
	context.globalAlpha = _alpha;
	context.fillStyle = _fillColor;
	context.strokeStyle = _fillColor;
	context.arc(_cenX, _cenY, _radious, 0, 2 * Math.PI, false);
	context.fill();
	context.stroke();
	context.restore();

}
	
function renderRectangle(canvas, context, _x1, _y1, _w, _h)
{
   context.beginPath();
   context.lineWidth = 1;
   context.fillStyle = 'yellow';
   context.strokeStyle = 'black';
   context.rect(_x1, _y1, _w, _h);
   context.fill();
   context.stroke();
}

function renderRectangleFilled(canvas, context, _x1, _y1, _w, _h, _color)
{
   context.beginPath();
   context.lineWidth = 1;
   context.fillStyle = _color;
   //context.strokeStyle = 'black';
   context.rect(_x1, _y1, _w, _h);
   context.fill();
   //context.stroke();
}

function renderRectangle(canvas, context, _x1, _y1, _w, _h, _borderColor)
{
   context.beginPath();
   context.lineWidth = 1;
   context.strokeStyle = _borderColor;
   context.rect(_x1, _y1, _w, _h);
   //context.fillStyle = 'yellow';
   //context.fill();
   context.stroke();
}

function renderCollitionRectangle(canvas, context, _rect, _borderColor)
{
   context.beginPath();
   context.lineWidth = 1;
   context.strokeStyle = _borderColor;
   context.rect(_rect.m_x1, _rect.m_y1, _rect.m_x2 - _rect.m_x1, _rect.m_y2 - _rect.m_y1);
   //context.fillStyle = 'yellow';
   //context.fill();
   context.stroke();
}

function renderRectangleFillTransparent(canvas, context, _x1, _y1, _w, _h, _fillColor, _alpha)
{
	context.save();
	context.beginPath();
	context.globalAlpha = _alpha;
	context.lineWidth = 1;
	context.fillStyle = _fillColor;
	context.rect(_x1, _y1, _w, _h);
	context.fill();
	context.restore();
}

function renderLine(canvas, context, _x1, _y1, _x2, _y2, _fillColor, _alpha)
{
	context.save();
	context.beginPath();
	context.strokeStyle = _fillColor;
	context.lineWidth = 1;
	context.globalAlpha = _alpha;

    context.moveTo(_x1,_y1);
    context.lineTo(_x2,_y2);
	context.stroke();
	context.restore();

}
	

function writeMessage(_context, message, _debug_mode) 
{
	if (_debug_mode == true)
	{
		_context.font = '9pt Calibri';
		_context.fillStyle = 'silver';
		_context.fillText(message, 10, 25);
	}
}

function rgbToColor(_r, _g, _b) 
{
	var red = _r.toString(16);
	var green = _g.toString(16);
	var blue = _b.toString(16)
	
	if (_r < 16) red = "0" + red;
	if (_g < 16) green = "0" + green;
	if (_b < 16) blue = "0" + blue;
	
	var result = '#' + red + green + blue;
	return result;
};

function rgbaToColor(_r, _g, _b, _a) 
{
	 _r = _r % 256;
	 _g = _g % 256;
	 _b = _b % 256;
	var result = 'rgba(' + _r.toString() + "," + _g.toString() + "," + _b.toString() + "," + _a.toString()+");";
	return result;
};

function graToRad(grados)
{
	return grados * Math.PI / 180;
}

function radToGra(radians)
{
	return 180 * radians / Math.PI;
}

function sinOf(_ro, _tita) 
{
	return Math.sin(graToRad(_ro % 360) ) * (_tita);
}

function cosOf(_ro, _tita) 
{
	return Math.cos(graToRad(_ro % 360) ) * (_tita);
}

function chClearArray(_array)
{
	if (_array != null && _array.length > 0)
	{
		_array.splice(0, _array.length);	
	}
}

function drawImageTransparent_ori(_canvas, _context, _bitmap, _x, _y, _percent) 
{
	_context.save();
	_context.globalAlpha = _percent;
	_context.drawImage(_bitmap, _x, _y);
	_context.restore();
}

// Sobrecarpa para escalado, usado en PoliticFight
function drawImageTransparent(_canvas, _context, _bitmap, _x, _y, _percent) 
{
	var w = _bitmap.width;
	var h = _bitmap.height;
	
	_context.save();
	_context.globalAlpha = _percent;
	_context.drawImage(_bitmap, _x, _y, w, h, _x * 2, _y * 2, w * 2, h * 2);
	_context.restore();
}

// Sobrecarpa para escalado, usado en PoliticFight
function drawImage_offset(_canvas, _context, _bitmap, _x, _y, _offsetX, _offsetY) 
{
	var w = _bitmap.width;
	var h = _bitmap.height;

	_context.drawImage(_bitmap, _x + _offsetX, _y + _offsetY, w-_offsetX, h-_offsetY, _x * 2, _y * 2, w * 2, h * 2);
}

// Sobrecarpa para escalado, usado en PoliticFight
function drawImage_wh(_canvas, _context, _bitmap, _x, _y) 
{
	var w = _bitmap.width;
	var h = _bitmap.height;
	
	_context.drawImage(_bitmap,0, 0, w, h, _x * 2, _y * 2, w * 2, h * 2);
}

// Sobrecarpa para escalado, usado en PoliticFight
function clipImageTransparent(_canvas, _context, _bitmap, _sx, _sy, _sw, _sh, _x, _y, _w, _h, _percent, _flip) 
{
	_context.save();
	_context.globalAlpha = _percent;

	if (_flip < 0)
	{
		_context.scale(-1, 1);
		_context.drawImage(_bitmap, _sx, _sy, _sw, _sh, -_x * 2 , _y * 2, _w * 2, _h * 2);
	
		if (C_DEBUG_SHOW_LINES == true)
		{
			renderRectangle(_canvas, _context, -_x * 2 , _y * 2, _w * 2, _h * 2, 'red');
		}
	}
	else
	{
		_context.drawImage(_bitmap, _sx, _sy, _sw, _sh, _x * 2 , _y * 2, _w * 2, _h * 2);

		if (C_DEBUG_SHOW_LINES == true)
		{
			renderRectangle(_canvas, _context, _x * 2 , _y * 2, _w * 2, _h * 2, 'red');
		}
	}


	_context.restore();
}

	
function clipImageTransparent_ori(_canvas, _context, _bitmap, _sx, _sy, _sw, _sh, _x, _y, _w, _h, _percent) 
{
	_context.save();
	_context.globalAlpha = _percent;
	_context.drawImage(_bitmap, _sx, _sy, _sw, _sh, _x, _y, _w, _h);
	_context.restore();
}

function drawImageRotation(_canvas, _context, _bitmap, _x, _y, _rotationAngle) 
{
	_context.save();

	var w = _bitmap.width / 2;
	var h = _bitmap.height / 2;

	// translate context to center of canvas.	
    _context.translate( _x, _y);

    // rotate 45 degrees clockwise.
    _context.rotate(graToRad(_rotationAngle));

	// translate back context to center of canvas.
    _context.translate(	-_x, -_y);
	
	// Make pivot as center of image.
	_context.drawImage(_bitmap, _x - w, _y - h);

	_context.restore();
}

function drawImageRotationTransparent(_canvas, _context, _bitmap, _x, _y, _rotationAngle, _percent) 
{
	_context.save();

	_context.globalAlpha = _percent;

	var w = _bitmap.width / 2;
	var h = _bitmap.height / 2;

	// translate context to center of canvas.	
    _context.translate( _x, _y);

    // rotate 45 degrees clockwise.
    _context.rotate(graToRad(_rotationAngle));

	// translate back context to center of canvas.
    _context.translate(	-_x, -_y);
	
	// Make pivot as center of image.
	_context.drawImage(_bitmap, _x - w, _y - h);

	_context.restore();
}

function collisionPointRect(_x, _y, _r)
{
	var bResult = false;

	if (_x > _r.m_x1 && _x < _r.m_x2 && 
		_y > _r.m_y1 && _y < _r.m_y2)
	{						
		bResult = true;
	}
	
	return bResult;
}

// Valid angles are beetwen 0 and 360
function chNormalizeAngle(_angle)
{
	var result = _angle % 360;
				
	if (result < 0 )
		result = 360 + result; // If result is < 0, 360 + (-result) = 360 - result
	//else if (result > 360 )
	//	result = result - 360;
		
	return result;
}

//http://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other

function collisionRectRect(_ax1, _ay1, _ax2, _ay2, _bx1, _by1, _bx2, _by2)
{
	var t = 0;
	// En caso que vengan invertidos los vertices, hacer que siempre
	// la esquina superior izquierda sea el comienzo del rectangulo.
	if (_ax1 > _ax2) {t = _ax1; _ax1 = _ax2; _ax2 = t;}
	if (_ay1 > _ay2) {t = _ay1; _ay1 = _ay2; _ay2 = t;}
	if (_bx1 > _bx2) {t = _bx1; _bx1 = _bx2; _bx2 = t;}
	if (_by1 > _by2) {t = _by1; _by1 = _by2; _by2 = t;}
	
	var r1w = Math.abs(_ax2 - _ax1);
	var r2w = Math.abs(_bx2 - _bx1);
	var r1h = Math.abs(_ay2 - _ay1);
	var r2h = Math.abs(_by2 - _by1);
	
	var xmin = _ax1;
	var xmax = _bx2;
	var ymin = _ay1;
	var ymax = _by2;

	if (_ax1 >= _bx1) xmin = _bx1;
	if (_ax2 >= _bx2) xmax = _ax2;
	if (_ay1 >= _by1) ymin = _by1;
	if (_ay2 >= _by2) ymax = _ay2;
		
	var dx = Math.abs(xmin - xmax);
    var dy = Math.abs(ymin - ymax);

	// Explicacion para el eje x, el eje y es lo mismo
	// Si la distancia entre los extremos de los rectangulos es menor a la suma de los anchos, entonces se solapan.
	/*
	logmsg.log('r1 (' + _ax1 + ',' + _ay1 + ')-(' + _ax2 + ',' + _ay2 + ')' + 'xmin=' + xmin + ', xmax=' + xmax);
	logmsg.log('r1 ancho=' + r1w + ',' + r1h + '  dx=' + dx);

	logmsg.log('r2 (' + _bx1 + ',' + _by1 + ')-(' + _bx2 + ',' + _by2 + ')' + 'ymin=' + ymin + ', ymax=' + ymax);
	logmsg.log('r2 ancho=' + r2w + ',' + r2h + '  dy=' + dy);
	
	logmsg.log('(dx <= r1w + r2w && dy <= r1h + r2h)');
	logmsg.log('' + dx + ' <= ' + (r1w + r2w ) + ' && ' + dy +' <= ' + (r1h + r2h));
	*/
	/*
	renderRectangle(m_canvas, m_context, _ax1, _ay1, r1w, r1h, rgbaToColor(255, 0, 0, 1));
	renderRectangle(m_canvas, m_context, _bx1, _by1, r2w, r2h, rgbaToColor(0, 0, 255, 1));
	*/
    return (dx <= (r1w + r2w) && dy <= (r1h + r2h));
}
	
function anguloInterVectorial(_ax1, _ay1, _ax2, _ay2,   _bx1, _by1, _bx2, _by2)
{
	var resultado = -1 ;  // significa CERCANO A CERO.
	var modulov1 = 0; 
	var modulov2 = 0;
	var prodmodulo = 0;
	var prodescalar = 0;

	modulov1 = modulo(_ax1, _ay1, _ax2, _ay2);
	modulov2 = modulo(_bx1, _by1, _bx2, _by2);
	prodmodulo = modulov1 * modulov2;
	prodescalar = prodEsc(_ax2, _ay2,  _bx2, _by2);

	if (prodmodulo >0.000000001)			// seguir calculando.
	{
		resultado = prodescalar / prodmodulo;

		if (resultado < 0)					// angulo obtuso, calcular suplementario.
		{
			resultado*=-1;					// positivizarlo.
			resultado = 180 - radToGra(Math.acos(resultado));
		}
		else
		{
			resultado = radToGra(Math.acos(resultado));
		}

		// rectificar por octantes.
		//if (_by2 <0) 
		//	resultado = 360-resultado;
	}
	return resultado;
}

function anguloInterVectorial2(_ax1, _ay1, _ax2, _ay2,   _bx1, _by1, _bx2, _by2)
{
	var angleA = anguloCuadrante(_ax1, _ay1, _ax2, _ay2);
	var angleB = anguloCuadrante(_bx1, _by1, _bx2, _by2);

	/*
	msglog('angleA=' + angleA);
	msglog('   angleB=' + angleB);
	msglog('   angleB-A=' + chNormalizeAngle(360 - (angleB - angleA)));
	*/
		
	return chNormalizeAngle(360 - (angleB - angleA));
}

// Angulo que forma el vector respecto del eje seteado, suponiendo que el origen
// del vecto es el origen del sistema cartesiano.

function anguloCuadrante(_ax1, _ay1, _ax2, _ay2)
{
	var x = 0;
	var y = 0;
	var t = 0;
	var res = 0;
	
	var dx = _ax2 - _ax1;  
	var dy = _ay2 - _ay1;
		
	// f = atan2(y/x)
	// 
	//                1,5/90°
	//2,35/135°       |        /0,78/45°
	//         \      |      /
	//           \    |    /
	//             \  |  /
	//               \|/         
	//3,14/180°-------*---------- 0/0°
	//               /|\
	//             /  |  \
	//           /    |    \
	//         /      |      \ 
	//-2,35/-135°     |        \-0,78/-45° 
	//               -1,50/-90°   
	
	if (dy != 0 || dx != 0)
	{
		t = Math.atan2(dy,dx);
		res = radToGra(t);

		// Queremos un angulo entre 0° y 359°.
		if (t < 0)
			res = 360 + res;
	}
	
	res = chNormalizeAngle(360 - res);
	return res;
}

//Devuelve el producto escalar de dos funciones
function prodEsc(_ax1, _ay1, _bx1, _by1) 
{
	var resultado =	(_ax1 * _bx1) +	(_ay1 * _by1 );
	return resultado;
}

function modulo(_ax1, _ay1, _ax2, _ay2)
{
	var vmodulo = 0;
	var fdx;
	var fdy;
	
	fdx = Math.abs(_ax2 - _ax1);
	fdy = Math.abs(_ay2 - _ay1);
	
	vmodulo = Math.sqrt((fdx * fdx) + (fdy * fdy));
	
	return(vmodulo);
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


function chMin(_val1, _val2)
{
	if (_val1 < _val2)
		return _val1;
	else
		return _val2;
}

function chMax(_val1, _val2)
{
	if (_val1 > _val2)
		return _val1;
	else
		return _val2;
}

/*
float CVector::Modulo(const CVector &v)
{
	float vmodulo = 0;
	float fdx, fdy, fdz;
	
	fdx = (float)fabs(v.m_pPuntoD->m_fx -v.m_pPuntoO->m_fx);
	fdy = (float)fabs(v.m_pPuntoD->m_fy -v.m_pPuntoO->m_fy);
	fdz = (float)fabs(v.m_pPuntoD->m_fz -v.m_pPuntoO->m_fz);
	
	vmodulo = (float)sqrt((fdx * fdx) + (fdy * fdy) + (fdz * fdz));
	return(vmodulo);
}
*/
// Auxiliar class
// Class Point
function chPoint () 
{ 
	chPoint.prototype.initWith = function (_x, _y, _z, _t)
	{
		this.m_x = _x;
		this.m_y = _y;
		this.m_z = _z;
		this.m_t = _t;
	}
	
	chPoint.prototype.fLog = function () 
	{ 
		var logText = "Point: " +
		"m_x=" + this.m_x + ", " +
		"m_y=" + this.m_y + ", " + 
		"m_z=" + this.m_z + ", " + 
		"m_t=" + this.m_t + "; "; 
		
		return logText;
	}  
}

// Auxiliar class
// Class Rectangle
function chRect () 
{ 
	chRect.prototype.initWith = function (_x1, _y1, _x2, _y2)
	{
		this.m_x1 = _x1;
		this.m_y1 = _y1;
		this.m_x2 = _x2;
		this.m_y2 = _y2;
	}
	
	chRect.prototype.fLog = function () 
	{ 
		var logText = "Point: " +
		"m_x=" + this.m_x + ", " +
		"m_y=" + this.m_y + ", " + 
		"m_z=" + this.m_z + ", " + 
		"m_t=" + this.m_t + "; "; 
		
		return logText;
	}  
	
	chRect.prototype.width = function () 
	{
		return Math.abs(this.m_x1 - this.m_x2);
	}

	chRect.prototype.height = function () 
	{
		return Math.abs(this.m_y1 - this.m_y2);
	}
	
	chRect.prototype.getCenterX = function () 
	{
		var middle = Math.abs(this.m_x2 + this.m_x1) / 2;
		
		if (this.m_x1 <= this.m_x2)
			return this.m_x1 + middle;
		else
			return this.m_x2 + middle;
	}

	chRect.prototype.getCenterY = function () 
	{
		var middle = Math.abs(this.m_y1 + this.m_y1) / 2;
		
		if (this.m_y1 <= this.m_y2)
			return this.m_y1 + middle;
		else
			return this.m_y2 + middle;
	}
}

function chRandom (_max) 
{ 
	return Math.round( (Math.random() * _max), 1);
}

function chRandomWithNeg (_max) 
{ 
	if (chRandom(1) == 1)
		return (Math.round( (Math.random() * _max), 1) * -1);
	else
		return Math.round( (Math.random() * _max), 1);
}

function chRandomNeg () 
{ 
	if (chRandom(1) == 1)
		return 1;
	else
		return -1;
}

function chFormatString(_value, _miChar, _maxLen)
{
	var strValue = _value.toString();
	var strResult = '';
	var strLen = strValue.length;
	
	if (strLen <= _maxLen)
	{
		for (var i = 0; i < _maxLen - strLen ; i++)
		{
			strResult = strResult + _miChar;
		}
		
		strResult = strResult + _value;
	}
	
	return strResult;
}

// Auxiliar class
// Class chKeyXml
function chKeyXmlItem () 
{ 
	chKeyXmlItem.prototype.initWithXml = function (_key, _xml)
	{
		this.m_key = _key;
		this.m_xml = _xml;
	}
	
	chKeyXmlItem.prototype.initWithString = function (_key, _xmlString)
	{
		this.m_key = _key;
			
		if (window.DOMParser)
		{
			parser=new DOMParser();
			this.m_xml = parser.parseFromString(_xmlString,"text/xml");
		}
		else // Internet Explorer
		{
			this.m_xml=new ActiveXObject("Microsoft.XMLDOM");
			this.m_xml.async=false;
			this.m_xml.loadXML(_xmlString);
		}
	}

}


