// Class ResourceMngr:
//    Se encarga de cargar dinamicamente las imagenes y gestionar su utilizacion 
//    bajo demanda de las clases que necesiten dibujar.

function ResourceMngr () 
{ 
	var m_arrImages = new Array();
	var m_currentIndex = 0;
	var C_IMAGE_FOLDER = 'img\\';
	
	// Consulta de fuentes en:
	// http://www.javascriptkit.com/javatutors/preloadimagesplus.shtml
	ResourceMngr.prototype.initWith = function (_callback)
	{
		this.preloadImages
		(
			gl_images_definition,
			_callback
		);	

	}
	
	ResourceMngr.prototype.preloadImages = function(arr, _callback)
	{
		var loadedimages = 0;
		
		var arr=(typeof arr!="object")? [arr] : arr;
		
		function imageloadpost()
		{
			loadedimages++;

			if (loadedimages == arr.length)
			{
				msglog("All images have loaded (or died trying)!");
				_callback();
			}
		}
		
		var newImage = null;
		for (var i=0; i < arr.length; i++)
		{
			newImage = new Image();
			m_arrImages.push(newImage);
			newImage.src = C_IMAGE_FOLDER +  arr[i];
			
			newImage.onload=function()
			{
				msglog('ResourceMngr recurso cargado:' + this);
				imageloadpost();
			}
			
			newImage.onerror=function()
			{
				msglog('ERROR: ResourceMngr recurso cargado:' + this);
				imageloadpost();
			}
		}
	}
	
	ResourceMngr.prototype.getResourceIdByName = function (_imageName) 
	{
		var result = -1;
		for (var i=0; i < gl_images_definition.length; i++)
		{
			if (gl_images_definition[i] == _imageName)
			{
				result = i;
				break;
			}
		}	
		
		return result;
	}
	
	ResourceMngr.prototype.getImage = function (_index) 
	{
		return m_arrImages[_index];
	}

	//
	// _hFlip: 1 noraml mode, -1 flipped.
	ResourceMngr.prototype.drawResource = function (_canvas, _context, _resourceID, _hFlip) 
	{
		var res = this.getbitmapResourceById(_resourceID);

		if (res != null)
		{
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_STORE),
			res.x1, res.y1,
			res.x2-res.x1, res.y2-res.y1, 
			res.posX, res.posY,
			res.x2-res.x1, res.y2-res.y1, 
			1, _hFlip); 
		}
	}

	ResourceMngr.prototype.getbitmapResourceById = function (_idResource) 
	{
		for (var i=0; i<gl_resources.bitmpas.length; i++)	
		{
			if (gl_resources.bitmpas[i].id == _idResource) 
			{                    
				return gl_resources.bitmpas[i];
			}
			else 
			{
				return false;
			}
		}
		
		return null;
	}
}

