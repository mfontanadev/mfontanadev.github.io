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
			populateCardsDataWithLocalization(Cards);
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

function setCardsHtmlElements(_cards)
{
	_cards.forEach(cardItem => {
		injectionCardsText(cardItem);
	});
}

function populateCardsDataWithLocalization(_cards) {
	if (getLanguageCode() === LANG_ARG) {
		populateCardsData_arg(_cards);
	}
	else if (getLanguageCode() === LANG_ENG) {
		populateCardsData_eng(_cards);
	}
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