var Cards = new Array();

const LANG_ARG = "arg";
const LANG_ENG = "eng";
var LanguageCodes = [LANG_ARG, LANG_ENG];

function setSiteTitle()
{
  // Version 1.4.0: adding localization
	document.title = "mfontanadev home v1.4.0"
}

function init(_htmlControlNavBar, _refreshPage)
{
	setSiteTitle();

	injectionOfNavigationBar(_htmlControlNavBar);
	injectionOfLanguageSelector(_refreshPage);

	setTimeout(function() {
		applyLocalization();

		setTimeout(function() {
			populateCardsData_english(Cards);
			setCardsHtmlElements(Cards);
		}, 100);
	}, 100);
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
			"id8bitminirally", 
			"8_bit_minirally",
			"img/8_bit_minirally_mysite_thumb.png",
			"I ported my QuickBasic 4.5 game called Minirally to TIC-80, just for: fun, learn lua and enjoy TIC-80 console. NOTE: it is not intended to be a commercial stuff. NOTE: press PLAY to download from itchio or press SOURCES button.",
			"https://mfontanadev.itch.io/8-bit-minirally",
			"https://github.com/mfontanadev/retroProjects/tree/main/8_BIT_MINIRALLY"
		)
	)

	_cards.push(
		new CardItem(
			"idMemotest", 
			"Memotest",
			"img/memotest_mysite_thumb.png",
			"It is an imitation of the a real game called Memotest. NOTE: it is not intended to be a commercial stuff., programed with QuickBasic 4.5. NOTE: download required, press PLAY to download from itchio or press SOURCES button.",
			"https://mfontanadev.itch.io/memotest",
			"https://github.com/mfontanadev/retroProjects/tree/main/MEMOTEST"
		)
	)

	_cards.push(
		new CardItem(
			"idMinirally", 
			"Minirally",
			"img/minirally_mysite_thumb.png",
			"It is an imitation of the popular real game Mini Rally, programed with QuickBasic 4.5, monochromatic displays (those times). NOTE: download required, press PLAY to download from itchio or press SOURCES button.",
			"https://mfontanadev.itch.io/minirally",
			"https://github.com/mfontanadev/retroProjects/tree/main/MINIRALLY"
		)
	)

	_cards.push(
		new CardItem(
			"idTetris", 
			"Tetris",
			"img/tetris_mysite_thumb.png",
			"It is an imitation of the popular game Tetris, programed with QuickBasic 4.5, monochromatic displays (those times) near 1995. NOTE: download required, press PLAY to download from itchio or press SOURCES button.",
			"https://mfontanadev.itch.io/tetris",
			"https://github.com/mfontanadev/retroProjects/tree/main/TETRIS"
		)
	)

	_cards.push(
		new CardItem(
			"idTelefono", 
			"Telefono (Telephone)",
			"img/telefono_mysite_thumb.png",
			"It is an imitation of the popular game called Simon but using telephone numbers instead. Made with QuickBasic 4.5 in 1995. NOTE: download required, press PLAY to download from itchio or press SOURCES button.",
			"https://mfontanadev.itch.io/telefono",
			"https://github.com/mfontanadev/retroProjects/tree/main/TELEFONO"
		)
	)

	_cards.push(
		new CardItem(
			"idLittleConstructorThreeJSEx", 
			"Little constructor ThreeJSEx",
			"img/little-constructor-threejs-ex.png",
			"Same as 'Little constructor ThreeJS' with new UX, now it is user friendly. Play and build your own house model. Following @javidx9 tutorial I made my own 3D Engine (javascript). I tried to modelate this amazing toy from my childhood (see <a href='http://www.instagram.com/casitas_frm/'>link</a>).",
			"https://mfontanadev.github.io/games/deployLittleConstructorThreeJSEx/index.html",
			"https://github.com/mfontanadev/appLittleConstructor/tree/ThreeJSEx"
		)
	)

	_cards.push(
		new CardItem(
			"idMicroSpy", 
			"MicroSpy" ,
			"img/microspy-thumb.jpg",
			"Game developed for Jam2020 hosted by @javidx9. Your mission is scape from, -The Great or The Big Machine? it is both",
			"https://mfontanadev.itch.io/micro-spy",
			"https://github.com/mfontanadev/POCs/tree/master/MicroSpy"
		)
	)
	
	_cards.push(
		new CardItem(
			"idRiseOfLadybug_part3", 
			"Rise of Ladybug Part #3" ,
			"img/rise-of-ladybug-thumb.jpg",
			"Part #3 alias chapter3_gamePage, final part. GAME PLAYABLE, ENJOY. Minigame to push myself to follow a no time schedule (max 2 hours per day) and much more. See datails on Git.",
			"https://mfontanadev.github.io/games/deployRiseOfLadybug/chapter3_gamePage/index.html",
			"https://github.com/mfontanadev/POCs/tree/master/RiseOfLadybug/chapter3_gamePage/RiseOfLadybug"
		)
	)

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
	//window.location = _url;
	window.open(_url);
}


function injectionOfNavigationBar(_menuItemIdToBeHighLighted, _reloadSection)
{
	$(
	    function()
	    {
	      $("#nav-placeholder").load
	      	(
						"http://127.0.0.1:3000/navigation.html",
						//"http://localhost:8080/navigation.html",
						//"https://raw.githubusercontent.com/mfontanadev/mfontanadev.github.io/master/navigation.html",
		      	function()
		      	{
							$(_menuItemIdToBeHighLighted).css('font-weight', 'bold');
							$('#id_imgLogo').click(function() { logoClick(_menuItemIdToBeHighLighted);});

							applyLocalizationToNavigationBar();
						}
	      	); 
	    }
	);
}

function applyLocalizationToNavigationBar() {

	if (getLanguageCode() === LANG_ENG) {
		setText("id_nav-bar-item-home", "Home");
		setText("id_nav-bar-item-projects", "Projects");
		setText("id_nav-bar-item-videos", "Videos");
		setText("id_nav-bar-item-products", "Products");
		setText("id_nav-bar-item-about", "About");
		document.getElementById("id_nav-bar-item-language").title = "Language selector";
		document.getElementById("idDonateButton").title = "Donate";
		document.getElementById("idTwittxButton").title = "Twittx";
	}		
	else if (getLanguageCode() === LANG_ARG) {
		setText("id_nav-bar-item-home", "Principal");
		setText("id_nav-bar-item-projects", "Proyectos");
		setText("id_nav-bar-item-videos", "Videos");
		setText("id_nav-bar-item-products", "Productos");
		setText("id_nav-bar-item-about", "Contacto");
		document.getElementById("id_nav-bar-item-language").title = "Selector de lenguaje";
		document.getElementById("idDonateButton").title = "Donar";
		document.getElementById("idTwittxButton").title = "Twittx";
	}
}

function injectionOfLanguageSelector(_hrefToRefresh)
{
	$(
	    function()
	    {
	      $("#language-selector-placeholder").load
	      	(
						"http://127.0.0.1:3000/language-selector.html",
						//"http://localhost:8080/navigation.html",
						//"https://raw.githubusercontent.com/mfontanadev/mfontanadev.github.io/master/navigation.html",
		      	function()
		      	{
							$('#id_nav-bar-item-language').click(function() { languageDialogSelector();});	
							applyLocalizationToLanguageDialog(_hrefToRefresh);
						}
	      	); 
	    }
	);
}


function applyLocalizationToLanguageDialog(_hrefToRefresh) {
	// Set event to each flag in the language selector.
	LanguageCodes.forEach(langCode => {
		$('#idLanguage_' + langCode).click(function() { changeLanguage(langCode, _hrefToRefresh);});	
	});

	// Show the current lenaguage flag in the navigation bar.
	let showNavBarFlag = document.getElementById("idLanguageFlagIcon_" + getLanguageCode()); 
	if (showNavBarFlag !== null ) {
		showNavBarFlag.style = "display: block";
	}
	else {
		document.getElementById("idLanguageFlagIcon_eng").style = "display: block";
	}	

	// Apply localization to language selector dialog.
	if (getLanguageCode() === LANG_ENG) {
		setText("idLanguageDialogTitle", "Clic on a flag to change the language");
	}		
	else if (getLanguageCode() === LANG_ARG) {
		setText("idLanguageDialogTitle", "Clic sobre una bandera para cambiar el lenguaje");
	}
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

function languageDialogSelector()
{
	$('#languageDialog').modal('show')
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

function setLanguageCode(_languageCode){
	localStorage.setItem("LANGUAGE", _languageCode);
}

function getLanguageCode(){
	let returnValue = localStorage.getItem("LANGUAGE");
	return returnValue === null ? LANG_ENG : returnValue;
}

function changeLanguage(_languagecode, _hrefToRefresh){
	setLanguageCode(_languagecode);
	
	document.getElementById('idCloseLanguageDialogButton').click();

	window.location.href = _hrefToRefresh;
}

function setText(_idControl, _text) {
	document.getElementById(_idControl).innerHTML = _text;
}

function donationDialogBox() {
	$('#languageDialog').modal('show')
}