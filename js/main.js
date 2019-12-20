var Cards = new Array();

function setSiteTitle()
{
	document.title = "mfontanadev home v1.2.1"
}

function init()
{
	populateCardsData_english(Cards);
	setCardsHtmlElements(Cards);
}

function CardItem(_id, _title, _description, _appURL, _sourcesURL) 
{
	this.id = _id;
	this.title = _title;
	this.description = _description;
	this.appURL = _appURL;
	this.sourcesURL = _sourcesURL;	
}

function populateCardsData_english(_cards)
{
	_cards.push(
		new CardItem(
			"idLittleConstructor", 
			"Little constructor" ,
			"Play and build your own house model. Following @javidx9 tutorial I made my own 3D Engine (javascript). I tried to modelate this amazing toy from my childhood (see <a href='http://www.instagram.com/casitas_frm/'>link</a>).",
			"http://mfontanadev.github.io/games/deployLittleConstructor/index.html",
			"https://github.com/mfontanadev/appLittleConstructor"
		)
	)

	_cards.push(
		new CardItem(
			"idWishFlower", 
			"Wishflower" ,
			"Artgame where you can make a wish. Using fractal L-Systems and inspired in 'Plum Park in Kameido'.",
			"http://wishflower.herokuapp.com",
			"https://github.com/mfontanadev/wishflower"
		)
	)

	_cards.push(
		new CardItem(
			"idPoliticFight", 
			"Politic Fight" ,
			"An excuse to make my own platform game engine (javascript). Sprites were supposed to be political but I'm not good at drawing.",
			"http://mfontanadev.github.io/games/deployPoliticFight/index.html",
			""
		)
	)
}

function setCardsHtmlElements(_cards)
{
	_cards.forEach(cardItem => {
		injectionCardsText(cardItem);
	});
}

function injectionCardsText2(_cardItem)
{
	// Card title
	$("#"+_cardItem.id).find("[id='cardTitle']").html(_cardItem.title);
	$("#"+_cardItem.id).find("[id='cardDescription']").html(_cardItem.description);

	// Card button close.
	var buttonCloseHtml = "<button type=\"button\" class=\"close\" onclick=\"hideCardButtons('" + _cardItem.id + "');\" >x</button>";
	$("#"+_cardItem.id).find("[id='idButtonClose']").html(buttonCloseHtml);

	// Card buttons play and close.
	var buttonsHtml = "<button  style=\"margin-right:10px\" id=\"btnPlay\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.appURL + "');\">Play</button>";
	if (_cardItem.sourcesURL.length > 0)
		buttonsHtml += "<button id=\"btnSources\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.sourcesURL + "');\">Sources</button>";
	$("#"+_cardItem.id).find("[id='idButtons']").html(buttonsHtml);
}

function injectionCardsText(_cardItem)
{
	// Card title
	$("#"+_cardItem.id).find("[id='cardTitle']").html(_cardItem.title);
	$("#"+_cardItem.id).find("[id='cardDescription']").html(_cardItem.description);

	// Card button close.
	//var buttonCloseHtml = "<button type=\"button\" class=\"close\" onclick=\"hideCardButtons('" + _cardItem.id + "');\" >x</button>";
	//$("#"+_cardItem.id).find("[id='idButtonClose']").html(buttonCloseHtml);

	// Card buttons play and close.
	var buttonsHtml = "<button id=\"btnPlay\" style=\"font-size:.675rem; width:30%; margin-right:5px\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.appURL + "');\">Play</button>";
	//buttonsHtml += "<br>";
	if (_cardItem.sourcesURL.length > 0)
	{
		buttonsHtml += "<button id=\"btnSources\" style=\"font-size:.675rem; width:30%; margin-right:5px\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.sourcesURL + "');\">Sources</button>";
		//buttonsHtml += "<br>";
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
		      	//"http://127.0.0.1:8081/navigation.html", 
		      	//"navigation.html", 
		      	"https://raw.githubusercontent.com/mfontanadev/mfontanadev.github.io/master/navigation.html",
		      	function()
		      	{
					$(_menuItemIdToBeHighLighted).css('font-weight', 'bold');
		      		//$("#id_nav-bar-item-main").css('color', 'blue'); 
		      	}
	      	); 
	    }
	);
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

