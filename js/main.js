var Cards = new Array();

const LANG_SPA = "spa";
const LANG_ENG = "eng";
const KEY_LOCALIZATION_COUNTRY = "localization.country";
const KEY_LOCALIZATION_LANGCODE = "localization.langCode";

var Localization = [
	{country: "arg", langCode: LANG_SPA},
	{country: "usa", langCode: LANG_ENG}
];

function CardItem(_id, _title, _image, _description, _appURL, _sourcesURL) 
{
	this.id = _id;
	this.title = _title;
	this.image = _image;
	this.description = _description;
	this.appURL = _appURL;
	this.sourcesURL = _sourcesURL;	
}

function setSiteTitle()
{
  // Version 1.4.0: adding localization
	document.title = "mfontanadev home v1.4.0"
}

function init(_htmlControlNavBar, _refreshPage)
{
	setSiteTitle();

	injectionOfNavigationBar(_htmlControlNavBar);
	injectionOfLocalization(_refreshPage);

	setTimeout(function() {
		applyLocalization();

		setTimeout(function() {
			populateCardsDataWithLocalization(Cards);
			setCardsHtmlElements(Cards);
		}, 100);
	}, 100);
}

function setCardsHtmlElements(_cards)
{
	_cards.forEach(cardItem => {
		injectionCardsText(cardItem);
	});
}

function populateCardsDataWithLocalization(_cards) {
	if (getLocalization().langCode === LANG_SPA) {
		populateCardsData_arg(_cards);
	}
	else if (getLocalization().langCode === LANG_ENG) {
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

function setText(_idControl, _text) {
	document.getElementById(_idControl).innerHTML = _text;
}

function donationDialogBox() {
	$('#localizationDialog').modal('show')
}

// Localizatoin helper
function applyLocalizationToLocalizationDialog(_hrefToRefresh) {
	// Set event to each flag in the language selector.
	Localization.forEach(localize => {
		$('#idCountry_' + localize.country).click(function() { changeLocalization(localize, _hrefToRefresh);});	
		document.getElementById("idCountryFlagIcon_" + localize.country).style = "display: none";
	});

	// Show the current lenaguage flag in the navigation bar.
	let showNavBarFlag = document.getElementById("idCountryFlagIcon_" + getLocalization().country); 
	if (showNavBarFlag !== null ) {
		showNavBarFlag.style = "display: block";
	}
	else {
		document.getElementById("idCountryFlagIcon_arg").style = "display: block";
	}	

	// Apply localization to language selector dialog.
	if (getLocalization().langCode === LANG_ENG) {
		setText("idLocalizationDialog'Title", "Clic on a flag to change the language");
	}		
	else if (getLocalization().langCode === LANG_SPA) {
		setText("idLocalizationDialog'Title", "Clic sobre una bandera para cambiar el lenguaje");
	}
}

function applyLocalizationToNavigationBar() {

	if (getLocalization().langCode === LANG_ENG) {
		setText("id_nav-bar-item-home", "Home");
		setText("id_nav-bar-item-projects", "Projects");
		setText("id_nav-bar-item-videos", "Videos");
		setText("id_nav-bar-item-products", "Products");
		setText("id_nav-bar-item-about", "About");
		document.getElementById("id_nav-bar-item-localization").title = "Language selector";
		document.getElementById("idDonateButton").title = "Donate";
		document.getElementById("idTwittxButton").title = "Twittx";
	}		
	else if (getLocalization().langCode === LANG_SPA) {
		setText("id_nav-bar-item-home", "Principal");
		setText("id_nav-bar-item-projects", "Proyectos");
		setText("id_nav-bar-item-videos", "Videos");
		setText("id_nav-bar-item-products", "Productos");
		setText("id_nav-bar-item-about", "Contacto");
		document.getElementById("id_nav-bar-item-localization").title = "Selector de lenguaje";
		document.getElementById("idDonateButton").title = "Donar";
		document.getElementById("idTwittxButton").title = "Twittx";
	}
}

function injectionOfLocalization(_hrefToRefresh)
{
	$(
	    function()
	    {
	      $("#localization-placeholder").load
	      	(
						"http://127.0.0.1:3000/localization.html",
						//"http://localhost:8080/navigation.html",
						//"https://raw.githubusercontent.com/mfontanadev/mfontanadev.github.io/master/navigation.html",
		      	function()
		      	{
							$('#id_nav-bar-item-localization').click(function() { localizationDialogSelector();});	
							applyLocalizationToLocalizationDialog(_hrefToRefresh);
						}
	      	); 
	    }
	);
}

function localizationDialogSelector()
{
	$('#localizationDialog').modal('show')
}

function setLocalizationCode(_localization){
	localStorage.setItem(KEY_LOCALIZATION_COUNTRY, _localization.country);
	localStorage.setItem(KEY_LOCALIZATION_LANGCODE, _localization.langCode);
}

function getLocalization() {
	let country = localStorage.getItem(KEY_LOCALIZATION_COUNTRY);
	let langCode = localStorage.getItem(KEY_LOCALIZATION_LANGCODE);
	let returnValue = {country: "arg", langCode: LANG_SPA};
 
	if (country !== null && langCode !== null && validateLocalization(returnValue))
	{
		returnValue = {country: country, langCode: langCode};
	}
	else
	{
		setLocalizationCode(returnValue);
	}

	return returnValue;
}

function validateLocalization(_localization){
	let found = false

	Localization.forEach(localize => {
		if (localize.country === _localization.country && 
				localize.langCode === _localization.langCode) {
					found = true;
				}
	});

	return found;
}

function changeLocalization(_localization, _hrefToRefresh){
	let currentLocalization = getLocalization();

	if (_localization.country !== currentLocalization.country) {
		setLocalizationCode(_localization);
		
		document.getElementById('idCloseLocalizationDialogButton').click();

		window.location.href = _hrefToRefresh;
	}
}
