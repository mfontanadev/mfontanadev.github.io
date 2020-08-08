var Cards = new Array();

function setSiteTitle()
{
	document.title = "mfontanadev home v1.2.2"
}

function init()
{
	populateCardsData_english(Cards);
	setCardsHtmlElements(Cards);
}

function CardItem(_id, _title, _image, _description, _appURL, _sourcesURL) 
{
	this.id = _id;
	this.title = _title;
	this.image = _image;
	this.description = _description;
	this.appURL = _appURL;
	this.sourcesURL = _sourcesURL;	
}

function populateCardsData_english(_cards)
{
	_cards.push(
		new CardItem(
			"idRiseOfLadybug_part2", 
			"Rise of Ladybug Part #2" ,
			"img/rise-of-ladybug-thumb.jpg",
			"Part #2 alias chapter2_interMissionPage. WARINIG: GAME UNDER CONSTRUCTION. Minigame to push myself to follow a no time schedule (max 2 hours per day) and much more. See datails on Git.",
			"https://mfontanadev.github.io/games/deployRiseOfLadybug/chapter2_interMissionPage/index.html",
			"https://github.com/mfontanadev/POCs/tree/master/RiseOfLadybug/chapter2_interMissionPage/RiseOfLadybug"
		)
	)

 	_cards.push(
		new CardItem(
			"idRiseOfLadybug_part1", 
			"Rise of Ladybug Part #1" ,
			"img/rise-of-ladybug-thumb.jpg",
			"Part #1 alias chapter1_menupage. WARINIG: GAME UNDER CONSTRUCTION. Minigame to push myself to follow a no time schedule (max 2 hours per day) and much more. See datails on Git.",
			"https://mfontanadev.github.io/games/deployRiseOfLadybug/chapter1_menupage/index.html",
			"https://github.com/mfontanadev/POCs/tree/master/RiseOfLadybug/chapter1_menupage/RiseOfLadybug"
		)
	)

	_cards.push(
		new CardItem(
			"idThreeJSSenoid", 
			"ThreeJS senoid" ,
			"img/threejs-senoid.png",
			"App that shows you some zFunctions like senoid, raindrop, Perlin noise, in a 3D way but, really this is another excuse to play with Three.js.",
			"https://mfontanadev.github.io/games/deployThreeJSSenoid/POC_senoid_threejs.html",
			"https://github.com/mfontanadev/POCs/tree/master/ThreeJS_senoid"
		)
	)

	_cards.push(
		new CardItem(
			"idEngineJSSenoid", 
			"EngineJS senoid" ,
			"img/engineJS-senoid.jpg",
			"App that shows you senoid function in a 3D way but, really this another excuse to play with hyper minimal 3dEngineJS, based on @javidx9 tutorial about 3D and Perlin noise.",
			"https://mfontanadev.github.io/games/deployJSEngineSenoid/JSEngine_senoid_v1.0.html",
			"https://github.com/mfontanadev/POCs/tree/master/JSEngine_senoid"
		)
	)

	_cards.push(
		new CardItem(
			"idLittleConstructorThreeJS", 
			"Little constructor ThreeJS",
			"img/little-constructor-threejs.jpg",
			"Same as 'Little constructor' with ThreeJS render engine (it looks solid). Play and build your own house model. Following @javidx9 tutorial I made my own 3D Engine (javascript). I tried to modelate this amazing toy from my childhood (see <a href='http://www.instagram.com/casitas_frm/'>link</a>).",
			"https://mfontanadev.github.io/games/deployLittleConstructorThreeJS/index.html",
			"https://github.com/mfontanadev/appLittleConstructor/tree/ThreeJS"
		)
	)

	_cards.push(
		new CardItem(
			"idLittleConstructor", 
			"Little constructor" ,
			"img/little-constructor.jpg",
			"Play and build your own house model. Following @javidx9 tutorial I made my own 3D Engine (javascript). I tried to modelate this amazing toy from my childhood (see <a href='http://www.instagram.com/casitas_frm/'>link</a>).",
			"http://mfontanadev.github.io/games/deployLittleConstructor/index.html",
			"https://github.com/mfontanadev/appLittleConstructor"
		)
	)

	_cards.push(
		new CardItem(
			"idWishFlower", 
			"Wishflower" ,
			"img/wishflower.jpg",
			"Artgame where you can make a wish. Using fractal L-Systems and inspired in 'Plum Park in Kameido'.",
			"http://wishflower.herokuapp.com",
			"https://github.com/mfontanadev/wishflower"
		)
	)

	_cards.push(
		new CardItem(
			"idPoliticFight", 
			"Politic Fight" ,
			"img/politic-fight.jpg",
			"An excuse to make my own platform game engine (javascript). Sprites were supposed to be politician but I'm not good at drawing.",
			"http://mfontanadev.github.io/games/deployPoliticFight/index.html",
			"https://github.com/mfontanadev/appPoliticFight"
		)
	)
}

function setCardsHtmlElements(_cards)
{
	_cards.forEach(cardItem => {
		injectionCardsText(cardItem);
	});
}

function injectionCardsText(_cardItem)
{
	// Card title
	$("#"+_cardItem.id).find("[id='cardTitle']").html(_cardItem.title);
	$("#"+_cardItem.id).find("[id='cardDescription']").html(_cardItem.description);

	// Card image
	var imgHtlm = "<img id=\"cardImage\" src=\"" + _cardItem.image + "\" class=\"card-img-top pointer\" onclick=\"showCardButtons('" + _cardItem.id + "');\">";

	$("#"+_cardItem.id).find("[id='cardImage']").html(imgHtlm);

	// Card buttons play and close.
	var buttonsHtml = "<button id=\"btnPlay\" style=\"font-size:.675rem; width:30%; margin-right:5px\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.appURL + "');\">Play</button>";

	if (_cardItem.sourcesURL.length > 0)
	{
		buttonsHtml += "<button id=\"btnSources\" style=\"font-size:.675rem; width:30%; margin-right:5px\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.sourcesURL + "');\">Sources</button>";
	}
	buttonsHtml += "<button id=\"btnClose\" style=\"font-size:.675rem; width:30%;\" type=\"button\" class=\"btn btn-dark btn-sm\" onclick=\"hideCardButtons('" + _cardItem.id + "');\">Close</button>";
	
	$("#"+_cardItem.id).find("[id='idButtons']").html(buttonsHtml);
}

function navigateTo(_url)
{
	window.location = _url;
}


function injectionOfNavigationBar(_menuItemIdToBeHighLighted)
{
	$(
	    function()
	    {
	      $("#nav-placeholder").load
	      	(
				//"http://localhost:8080/navigation.html",
				"https://raw.githubusercontent.com/mfontanadev/mfontanadev.github.io/master/navigation.html",
		      	function()
		      	{
					$(_menuItemIdToBeHighLighted).css('font-weight', 'bold');
					$('#id_imgLogo').click(function() { logoClick(_menuItemIdToBeHighLighted);});
		      	}
	      	); 
	    }
	);
}

function logoClick(_currentPageTag)
{
	if (_currentPageTag === "#id_nav-bar-item-home")
	{
		$('#myModal').modal('show')
	}
	else
	{
		window.location.href = "index.html";
	}
}

function showCardButtons(_idElement)
{
	var elementBody = $("#"+_idElement).find("[id='cardBody']");
	var elementButtons = $("#"+_idElement).find("[id='cardButtons']");
	
	elementBody.removeClass("d-none");
	elementBody.addClass("d-none");
	elementButtons.removeClass("d-none");
}

function hideCardButtons(_idElement)
{
	var elementBody = $("#"+_idElement).find("[id='cardBody']");
	var elementButtons = $("#"+_idElement).find("[id='cardButtons']");

	elementBody.removeClass('d-none');
	elementButtons.removeClass('d-none');
	elementButtons.addClass('d-none');
}

