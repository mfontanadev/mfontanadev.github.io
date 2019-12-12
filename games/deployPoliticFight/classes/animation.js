// Class Animation
function Animation () 
{
	Animation.prototype.initWith = function (_id, _type, _resourseId, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_ANIMATION;
		this.m_type = C_OBJ_TYPE_NONE;
		this.m_resourceId = _resourseId;
		
		this.m_x = _x; 
		this.m_y = _y; 

		this.m_pivotX = 0;
		this.m_pivotY = 0;
		
		this.m_frameCounter = 0;

		this.m_currentFrame = 0;
		this.m_arrFrames = new Array();
		this.m_frameInc = 0;
		
		this.m_rc = new chRect();
	}

	Animation.prototype.handleInputs = function () 
	{ 
	}
	
	Animation.prototype.implementGameLogic = function () 
	{
		if (this.m_arrFrames[this.m_currentFrame].m_duration != 0)
		{
			this.m_frameCounter = this.m_frameCounter + this.m_frameInc;

			if (this.m_frameCounter > this.m_arrFrames[this.m_currentFrame].m_duration )
			{
				this.m_frameCounter = 0;
				this.m_currentFrame = this.m_currentFrame + 1;
				
				if (this.m_currentFrame >= this.m_arrFrames.length)
				{
					this.m_currentFrame = 0;
					this.m_frameInc = 0;
				}
			}
		}
		//this.move(m_canvas, m_context);
		//this.dissolve(C_Animation_NATURAL_DISSOLVE);
	}
	
	Animation.prototype.render = function (_canvas, _context)
	{
		clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_resourceId),
			this.m_arrFrames[this.m_currentFrame].m_x1, this.m_arrFrames[this.m_currentFrame].m_y1,
			this.m_arrFrames[this.m_currentFrame].m_w, this.m_arrFrames[this.m_currentFrame].m_h, 
			this.m_x, this.m_y,
			this.m_arrFrames[this.m_currentFrame].m_w, this.m_arrFrames[this.m_currentFrame].m_h,
			1,this.m_flip); 
	}

	Animation.prototype.collisionRectangle = function () 
	{
		var midRad = 0;
		
		this.m_rc.m_x1 = this.m_x * 2;
		this.m_rc.m_y1 = this.m_y * 2;
		if (this.m_flip > 0)
		{
			this.m_rc.m_x2 = this.m_rc.m_x1 + this.m_arrFrames[this.m_currentFrame].m_w * 2;
			this.m_rc.m_y2 = this.m_rc.m_y1 + this.m_arrFrames[this.m_currentFrame].m_h * 2;
		}
		else
		{
			this.m_rc.m_x2 = this.m_rc.m_x1 - this.m_arrFrames[this.m_currentFrame].m_w * 2;
			this.m_rc.m_y2 = this.m_rc.m_y1 + this.m_arrFrames[this.m_currentFrame].m_h * 2;
		}
		return this.m_rc; 
	}

	
	Animation.prototype.fLog = function () 
	{ 
		var logText = "Animation: " +
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + "; ";		
		return logText;
	}  

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Animation.prototype.move = function (_canvas, _context) 
	{ 

	}

	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Animation.prototype.start = function()
	{
		this.m_frameInc = 1;
	}

	Animation.prototype.stop = function()
	{
		this.m_frameInc = 0;
	}

	Animation.prototype.resetFrameCounter = function()
	{
		this.m_frameCounter = 0;
	}

	Animation.prototype.reset = function()
	{
		this.m_frameInc = 0;
		this.m_frameCounter = 0;
		this.m_currentFrame = 0;
	}

	Animation.prototype.isStopped = function()
	{
		return (this.m_frameInc == 0);
	}
	
	Animation.prototype.dissolve = function(_disolvePrower)
	{ 
	}
	
	Animation.prototype.createFrame = function(_x1, _y1, _x2, _y2, _offsetX, _offsetY, _incX, _incY, _duration)
	{
		var pObj = new chAnimationFrame();
		pObj.initWith(_x1, _y1, _x2, _y2, _offsetX, _offsetY, _incX, _incY, _duration);
		this.m_arrFrames.push(pObj);
		this.recalcPivot();
	}
	
	Animation.prototype.recalcPivot = function()
	{
		this.m_pivotX = 0;
		this.m_pivotY = 0;
		var validFramesX = 0;
		var validFramesY = 0;
		
		for (var i = this.m_arrFrames.length - 1; i >= 0; i--) 
		{
			// Evitar que los frames vacios hagan que el pivote se desplace al hacer el promedio.
			if (this.m_arrFrames[i].m_w > 0)
			{
				this.m_pivotX = this.m_pivotX + this.m_arrFrames[i].m_w;
				validFramesX++;
			}
			
			if (this.m_arrFrames[i].m_h > 0)
			{
				this.m_pivotY = this.m_pivotY + this.m_arrFrames[i].m_h;
				validFramesY++;
			}
		}
		
		if (validFramesX > 0)
			this.m_pivotX = Math.round(this.m_pivotX / 2 / validFramesX, 0);
		
		if (validFramesY > 0)
			this.m_pivotY = Math.round(this.m_pivotY / 2 / validFramesY, 0);
	
		console.log(this.m_pivotX + ", " + this.m_pivotY);
	}
	
	Animation.prototype.setPosition = function(_x, _y, _flip)
	{
		this.m_x = _x - (this.m_arrFrames[this.m_currentFrame].m_w / 2) + this.m_arrFrames[this.m_currentFrame].m_offsetX;// - this.m_pivotX;
		this.m_y = _y - (this.m_arrFrames[this.m_currentFrame].m_h / 2) + this.m_arrFrames[this.m_currentFrame].m_offsetY;// - this.m_pivotY;	
		this.m_flip = _flip;
		
		if (_flip == -1)
		{
			this.m_x = _x + (this.m_arrFrames[this.m_currentFrame].m_w / 2) - this.m_arrFrames[this.m_currentFrame].m_offsetX;
		}
	}

	// Load all animations in collection and frames inside them, finally append to target animation collection.
	Animation.prototype.loadAnimationsTo = function(_animationCollection, _targetCollection)
	{
		for (var iAnim = 0; iAnim < _animationCollection.length; iAnim++) 
		{
			tmpAnimation = _animationCollection[iAnim];
			
			pObj = new Animation();
			pObj.initWith(tmpAnimation.id, 0, tmpAnimation.spriteSheet,tmpAnimation.x,tmpAnimation.y);
			pObj.loadAnimationFrames(tmpAnimation.frames);
			
			_targetCollection.push(pObj); 
		}
	}
	
	Animation.prototype.loadAnimationFrames = function(_framesCollection)
	{
		for (var iFrames = 0; iFrames < _framesCollection.length; iFrames++) 
		{
			this.createFrame(
			_framesCollection[iFrames].x1,
			_framesCollection[iFrames].y1,
			_framesCollection[iFrames].x2,
			_framesCollection[iFrames].y2,
			_framesCollection[iFrames].offsetX,
			_framesCollection[iFrames].offsetY,
			_framesCollection[iFrames].incX,
			_framesCollection[iFrames].incY,
			_framesCollection[iFrames].duration);
		}
	}

	// En base a los xml popular la coleccion de animaciones.	
	Animation.prototype.loadAnimationsFromXml = function(_spriteFile, _animationFile, _targetCollection)
	{
		var sprites = m_xmlMngr.getXmlByKey(_spriteFile);
		var animations = m_xmlMngr.getXmlByKey(_animationFile);

		msglog('===_animations');
		//var	_animations=animations.getElementsByName("animations");
		var _animations=animations.getElementsByTagName("animations");

		//msglog(animations);
		
		if (typeof _animations == 'undefined')
		{
			_animations=animations.getElementsByTagName("animations");
		}
		else
		{
			if ( _animations instanceof NodeList) 
			{
				var _animationsTmp=animations.getElementsByTagName("animations");
				_animations = Array.prototype.slice.call(_animationsTmp);
				_animations=_animations[0];
			}
			else
			{
				_animations=animations.children.item(0).children;
			}
		}
		
		msglog('===despues _animations');
		if (_animations != null)
		{
			if ( _animations instanceof HTMLCollection)
			{
				for (var iAnim = 0; iAnim < _animations.length; iAnim++) 
				{
					animationName = _animations[iAnim].attributes["name"].value;
					animationLoops = _animations[iAnim].attributes["loops"].value;
					animationId =  this.parseAnimationId(animationName);
					msglog("name(id=" + animationId + ") =" + animationName + " loops=" + animationLoops);

					pObj = new Animation();
					pObj.initWith(animationId, 0, m_resourceMngr.getResourceIdByName(this.getSpriteSheetName(sprites)),0,0) ;
					pObj.loadAnimationFramesFromXml( _animations[iAnim], sprites);
					_targetCollection.push(pObj); 
				}
			}
			else
			{
				for (var iAnim = 1; iAnim < _animations.childNodes.length; iAnim+=2) 
				{
					animationName = _animations.childNodes[iAnim].attributes["name"].value;
					animationLoops = _animations.childNodes[iAnim].attributes["loops"].value;
					animationId =  this.parseAnimationId(animationName);
					msglog("name(id=" + animationId + ") =" + animationName + " loops=" + animationLoops);

					pObj = new Animation();
					pObj.initWith(animationId, 0, m_resourceMngr.getResourceIdByName(this.getSpriteSheetName(sprites)),0,0) ;
					pObj.loadAnimationFramesFromXml( _animations.childNodes[iAnim], sprites);
					_targetCollection.push(pObj); 
				}
			}
		}
	}
	// Return the Id of animation given animation name as text.
	Animation.prototype.getSpriteSheetName = function(_xmlSprites)
	{
		var _spriteSheet = _xmlSprites.getElementsByTagName("img");
		var spriteSheetName = _spriteSheet[0].attributes["name"].value;
		spriteSheetName = spriteSheetName.replace("..img", "");

		return spriteSheetName;
	}
	
	Animation.prototype.loadAnimationFramesFromXml = function(_animationItem, _sprites)
	{
		//animationName = _animationItem.attributes["name"].value;
		//_animationItem = _animationItem[0].children;
		//Safari version
		if ( _animationItem instanceof Element)
		{
			ele = _animationItem.firstElementChild;
			while (ele != null)
			{
				duration = parseInt(ele.attributes["delay"].value);
				
				if (ele.childElementCount > 0)
				{
					ele2 = ele.firstElementChild;
					animData = ele2.attributes["name"].value
					animData = animData.replace("/", "");
					offsetX = parseInt(ele2.attributes["x"].value);
					offsetY = parseInt(ele2.attributes["y"].value);
					//msglog( "duration : " + duration + ", animData " + animData);
					//msglog( "offset x,y : " + offsetX + ",  " + offsetY);
				
					// Buscar en el archivo de sprites los datos para la animacion
					var spriteData = m_xmlMngr.getElementByName(_sprites, "spr", animData);
					
					if (spriteData != null)
					{
						x1 = parseInt(spriteData.attributes["x"].value);
						y1 = parseInt(spriteData.attributes["y"].value);
						x2 = x1 + parseInt(spriteData.attributes["w"].value);
						y2 = y1 + parseInt(spriteData.attributes["h"].value);
						incX = 1;
						incY = 1;
						
						this.createFrame(x1, y1, x2, y2, offsetX, offsetY, incX, incY, duration);
					}
				}
				else
				{
					this.createFrame(0, 0, 0, 0, 0, 0, 0, 0, 1);
					msglog( "empty");
				}
				
				ele = ele.nextElementSibling;
			}
		}
		else
		{
			for (var i = 0; i < _animationItem.children.length; i++) 
			{
				duration = parseInt(_animationItem.children[i].attributes["delay"].value);
			
				if (_animationItem.children[i].children.length > 0)
				{
					animData = _animationItem.children[i].children[0].attributes["name"].value
					animData = animData.replace("/", "");
					offsetX = parseInt(_animationItem.children[i].children[0].attributes["x"].value);
					offsetY = parseInt(_animationItem.children[i].children[0].attributes["y"].value);
					//msglog( "duration : " + duration + ", animData " + animData);
					//msglog( "offset x,y : " + offsetX + ",  " + offsetY);
				
					// Buscar en el archivo de sprites los datos para la animacion
					var spriteData = m_xmlMngr.getElementByName(_sprites, "spr", animData);
					
					if (spriteData != null)
					{
						x1 = parseInt(spriteData.attributes["x"].value);
						y1 = parseInt(spriteData.attributes["y"].value);
						x2 = x1 + parseInt(spriteData.attributes["w"].value);
						y2 = y1 + parseInt(spriteData.attributes["h"].value);
						incX = 1;
						incY = 1;
						
						this.createFrame(x1, y1, x2, y2, offsetX, offsetY, incX, incY, duration);
					}
				}
				else
				{
					this.createFrame(0, 0, 0, 0, 0, 0, 0, 0, 1);
					msglog( "empty");
				}
			}
		}
	}
	
	// Return the Id of animation given animation name as text.
	Animation.prototype.parseAnimationId = function(_stringAnimationName)
	{
		if (_stringAnimationName == "C_ANIM_STAND") return  C_ANIM_STAND;
		if (_stringAnimationName == "C_ANIM_WALKING") return  C_ANIM_WALKING;
		if (_stringAnimationName == "C_ANIM_HIT") return  C_ANIM_HIT;
		if (_stringAnimationName == "C_ANIM_PAIN") return C_ANIM_PAIN;
		if (_stringAnimationName == "C_ANIM_DYING") return C_ANIM_DYING;
		if (_stringAnimationName == "C_ANIM_PROTECTING") return C_ANIM_PROTECTING;
		if (_stringAnimationName == "C_ANIM_PROTECTING_HITTED") return C_ANIM_PROTECTING_HITTED;
		if (_stringAnimationName == "C_ANIM_TAKE") return C_ANIM_TAKE;
		if (_stringAnimationName == "C_ANIM_RAY_TRAVEL") return C_ANIM_RAY_TRAVEL;
		if (_stringAnimationName == "C_ANIM_RAY_OUT") return C_ANIM_RAY_OUT;
	}

}
	
Animation.stSetAnimation = function(_entity, _animationId, _invalidateInput, _x, _y, _flip)
{
	_entity.m_movCounter = 0;
	
	for (var i = 0; i < _entity.m_arrAnimations.length; i++) 
	{
		if (i == C_ANIM_WALKING)
			_entity.m_arrAnimations[i].reset();
		else
			_entity.m_arrAnimations[i].resetFrameCounter();
	}
	
	_entity.m_arrAnimations[_animationId].start();
	_entity.m_currentAnimationId = _animationId;
	_entity.m_invalidateInput = _invalidateInput;
	_entity.m_arrAnimations[_entity.m_currentAnimationId].setPosition(_x, _y, _flip);
}
	
// Auxiliar class
// Class Rectangle
function chAnimationFrame () 
{ 
	chAnimationFrame.prototype.initWith = function (_x1, _y1, _x2, _y2, _offsetX, _offsetY,_incX, _incY,_duration)
	{
		this.m_x1 = _x1;
		this.m_y1 = _y1;
		this.m_x2 = _x2;
		this.m_y2 = _y2;
		
		this.m_offsetX = _offsetX;
		this.m_offsetY = _offsetY;
		
		this.m_w = this.m_x2 - this.m_x1;
		this.m_h = this.m_y2 - this.m_y1;

		this.m_incX = _incX;
		this.m_incY = _incY;
		
		this.m_duration = _duration;
	}
	
	chAnimationFrame.prototype.fLog = function () 
	{ 
		var logText = "chAnimationFrame: " +
		"m_x1=" + this.m_x1 + ", " +
		"m_y1=" + this.m_y1 + ", " + 
		"m_x2=" + this.m_x2 + ", " + 
		"m_y2=" + this.m_y2 + ", " + 
		"m_offsetX=" + this.m_offsetX + ", " + 
		"m_offsetY=" + this.m_offsetY + ", " + 
		"m_incX=" + this.m_incX + ", " + 
		"m_incY=" + this.m_incY + ", " + 
		"m_duration=" + this.m_duration + "; "; 
		
		return logText;
	}  
}