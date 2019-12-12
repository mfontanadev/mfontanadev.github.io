// Class XmlMngr:
//    Se encarga de cargar almacenar localmente valores de tipo hash key.

// Constants for recources.

function XmlMngr () 
{ 
	
	// http://people.w3.org/mike/localstorage.html
	XmlMngr.prototype.initWith = function ()
	{
		this.m_arrXml = new Array();
		this.m_offLineMode = true;
		
		this.fillXmlArray();
	}
	
	XmlMngr.prototype.test = function (_key, _targetArray)
	{
		/*
		this.clear();
		var _arrImages = new Array();
			_arrImages.push('10');
			_arrImages.push('20');
			_arrImages.push('30');
		
		this.setValue('array', _arrImages);
		this.showAll();

		var _arrTarget = new Array();
		this.fillArray('array', _arrTarget);
		*/
	}
	
	XmlMngr.prototype.fillXmlArray = function () 
	{
		if (this.m_offLineMode == true)
		{
			var xmlDocItem = null;
			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("guy.anim.js", guyanimjs);
			this.m_arrXml.push(xmlDocItem);
			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("guy.sprites.js", guyspritesjs);
			this.m_arrXml.push(xmlDocItem);

			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("cody.anim.js", codyanimjs);
			this.m_arrXml.push(xmlDocItem);
			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("cody.sprites.js", codyspritesjs);
			this.m_arrXml.push(xmlDocItem);

			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("raiden.anim.js", raidenanimjs);
			this.m_arrXml.push(xmlDocItem);
			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("raiden.sprites.js", raidenspritesjs);
			this.m_arrXml.push(xmlDocItem);

			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("guy_bad_j.anim.js", guy_bad_janimjs);
			this.m_arrXml.push(xmlDocItem);
			xmlDocItem = new chKeyXmlItem();
			xmlDocItem.initWithString("guy_bad_j.sprites.js", guy_bad_jspritesjs);
			this.m_arrXml.push(xmlDocItem);
		}
	}

	XmlMngr.prototype.getXmlByKey = function (_key) 
	{
		var xmlDoc = null;
		
		for (var i = 0; i < this.m_arrXml.length; i++) 
		{
			if (this.m_arrXml[i].m_key == _key)
			{
				xmlDoc = this.m_arrXml[i].m_xml;
				break;
			}
		}
		return xmlDoc 
	}
	
	// Find node given _tag and _attributeName
	// Example:
	// _tag = "spr"
	// _attributeName = "C_FACE"
	XmlMngr.prototype.getElementByName = function(_sprites, _tag, _attributeName)
	{
		var result = null;
		var items = _sprites.getElementsByTagName(_tag);

		if (items != null)
		{
			// Recorrer las estructuras y popular las propias del juego.
			for (var i = 0; i < items.length; i++) 
			{
				if (items[i].attributes["name"].value == _attributeName)
				{
					result = items[i];
					break;
				}
			}
		}	

		return result;
	}
	
	// Find node given _tag and _attributeName. Similar to getElementByName but 
	// here _sprites is the key from hash.
	// Example:
	// _tag = "spr"
	// _attributeName = "C_FACE"	
	XmlMngr.prototype.getElementByName_withTxt = function(_sprites, _tag, _attributeName)
	{
		var sprites = m_xmlMngr.getXmlByKey(_sprites);

		var result = null;
		var items = sprites.getElementsByTagName(_tag);

		if (items != null)
		{
			// Recorrer las estructuras y popular las propias del juego.
			for (var i = 0; i < items.length; i++) 
			{
				if (items[i].attributes["name"].value == _attributeName)
				{
					result = items[i];
					break;
				}
			}
		}	

		return result;
	}
	

}

