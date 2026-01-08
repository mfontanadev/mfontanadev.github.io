var Cards = new Array();

const SERVER_URL = "http://127.0.0.1:3000/";		// VsCode plugin
//const SERVER_URL = "http://localhost:8080/";		// localhost
//const SERVER_URL = "https://raw.githubusercontent.com/mfontanadev/mfontanadev.github.io/master/";		//git hub

function CardItem(_id, _title, _image, _description, _appURL, _sourcesURL) 
{
	this.id = _id;
	this.title = _title;
	this.image = _image;
	this.description = _description;
	this.appURL = _appURL;
	this.sourcesURL = _sourcesURL;	
}

function init(_htmlControlNavBar, _refreshPage)
{
	setSiteTitle();

	loadLocalizatoinDataForCards(Cards);

	injectionOfNavigationBar(_htmlControlNavBar, _refreshPage);
}

function setSiteTitle()
{
  // Version 2.1.0: Adding localization coinfig and wait donate dialog functionality.
	document.title = "mfontanadev home v2.1.0"
}

function loadLocalizatoinDataForCards(_cards) {
	if (getLocalization().langCode === lz_def.ARG.languageCode) {
		loadCardsDataLocalizated_arg(_cards);
	}
	else if (getLocalization().langCode === lz_def.USA.languageCode) {
		loadCardsDataLocalizated_eng(_cards);
	}
}

function injectionOfNavigationBar(_menuItemIdToBeHighLighted, _reloadSection)
{
	$(
	    function()
	    {
	      $("#nav-placeholder").load
	      	(

						SERVER_URL + "navigation.html",
		      	function()
		      	{
							$(_menuItemIdToBeHighLighted).css('font-weight', 'bold');
							$('#id_imgLogo').click(function() { logoClick(_menuItemIdToBeHighLighted);});

							applyLocalizationToNavigationBar();
							initAfterNavigationBarLoaded(_menuItemIdToBeHighLighted, _reloadSection);
						}
	      	); 
	    }
	);
}

function applyLocalizationToNavigationBar() {

	if (getLocalization().langCode === lz_def.USA.languageCode) {
		setText("id_nav-bar-item-home", "Home");
		setText("id_nav-bar-item-projects", "Projects");
		setText("id_nav-bar-item-videos", "Videos");
		setText("id_nav-bar-item-products", "Products");
		setText("id_nav-bar-item-about", "About");
		document.getElementById("id_nav-bar-item-localization").title = "Language selector";
		document.getElementById("idDonateButtonNavBar").title = "Donate";
		document.getElementById("idTwittxButton").title = "Twittx";
	}		
	else if (getLocalization().langCode === lz_def.ARG.languageCode) {
		setText("id_nav-bar-item-home", "Principal");
		setText("id_nav-bar-item-projects", "Proyectos");
		setText("id_nav-bar-item-videos", "Videos");
		setText("id_nav-bar-item-products", "Productos");
		setText("id_nav-bar-item-about", "Acerca");
		document.getElementById("id_nav-bar-item-localization").title = "Selector de lenguaje";
		document.getElementById("idDonateButtonNavBar").title = "Donar";
		document.getElementById("idTwittxButton").title = "Twittx";
	}

	// Set event to each flag in the navigation bar.
	Localization.forEach(localize => {
		document.getElementById("idCountryFlagIcon_" + localize.country).style = "display: none";
	});

	// Show the current language flag in the navigation bar.
	let showNavBarFlag = document.getElementById("idCountryFlagIcon_" + getLocalization().country); 
	if (showNavBarFlag !== null ) {
		showNavBarFlag.style = "display: block";
	}
	else {
		document.getElementById("idCountryFlagIcon_usa").style = "display: block";
	}	
}

function initAfterNavigationBarLoaded(_htmlControlNavBar, _refreshPage)
{
	injectionOfDonateDialog(_refreshPage);

	injectionOfLocalizationDialog(_refreshPage);

	applyPageLocalization();
	setCardsHtmlText(Cards);
	document.body.style.visibility = "visible";
	
	setCardsImages(Cards);

	redirectToDonatePageIfApplies();
}

function injectionOfDonateDialog(_hrefToRefresh) {
	$(
	    function()
	    {
	      $("#donate-placeholder").load
	      	(
						SERVER_URL + "donate.html",
		      	function()
		      	{
							applyLocalizationToDonateDialog(_hrefToRefresh);
						}
	      	); 
	    }
	);
}

function applyLocalizationToDonateDialog(_hrefToRefresh) {
	if (getLocalization().langCode === lz_def.USA.languageCode) {
		setText("idDonateDialogTitle", "Many thanks.");
		setText("idMercadoPagoFreeAmount", "$ x");
		setText("idPayPalFreeAmount", "USD x");
	}		
	else if (getLocalization().langCode === lz_def.ARG.languageCode) {
		setText("idDonateDialogTitle", "Muchas gracias.");
		setText("idMercadoPagoFreeAmount", "$ x");
		setText("idPayPalFreeAmount", "USD x");
	}
}

function injectionOfLocalizationDialog(_hrefToRefresh) {
	$(
	    function()
	    {
	      $("#localization-placeholder").load
	      	(
						SERVER_URL + "localization.html",
		      	function()
		      	{
							$('#id_nav-bar-item-localization').click(function() { showLocalizationDialogSelectorOnClickOverFlagIcon();});	
							applyLocalizationToLocalizationDialog(_hrefToRefresh);
						}
	      	); 
	    }
	);
}

function applyLocalizationToLocalizationDialog(_hrefToRefresh) {
	// Set event to each flag in the localization dialog.
	Localization.forEach(localize => {
		$('#idCountry_' + localize.country).click(function() { changeLocalization(localize, _hrefToRefresh);});	
	});

	// Apply localization to language selector dialog.
	if (getLocalization().langCode === lz_def.USA.languageCode) {
		setText("idLocalizationDialog'Title", "Clic on a flag to change the language");
	}		
	else if (getLocalization().langCode === lz_def.ARG.languageCode) {
		setText("idLocalizationDialog'Title", "Clic sobre una bandera para cambiar el lenguaje");
	}
}

function setCardsHtmlText(_cards) {
	_cards.forEach(cardItem => {
		injectionOfCardsText(cardItem);
	});
}

function injectionOfCardsText(_cardItem) {
	// Card title
	$("#"+_cardItem.id).find("[id='cardTitle']").html(_cardItem.title);
	$("#"+_cardItem.id).find("[id='cardDescription']").html(_cardItem.description);

	// Card image
	//var imgHtlm = "<img id=\"cardImage\" src=\"" + _cardItem.image + "\" class=\"card-img-top pointer\" onclick=\"showCardButtons('" + _cardItem.id + "');\">";
	//$("#"+_cardItem.id).find("[id='cardImage']").html(imgHtlm);

	// Card buttons play and close.
	var buttonsHtml = "<button id=\"btnPlay\" style=\"font-size:.675rem; width:30%; margin-right:5px\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.appURL + "');\">Play</button>";

	if (_cardItem.sourcesURL.length > 0)
	{
		buttonsHtml += "<button id=\"btnSources\" style=\"font-size:.675rem; width:30%; margin-right:5px\" type=\"button\" class=\"btn btn-secondary btn-sm\" onclick=\"navigateTo('" + _cardItem.sourcesURL + "');\">Sources</button>";
	}
	buttonsHtml += "<button id=\"btnClose\" style=\"font-size:.675rem; width:30%;\" type=\"button\" class=\"btn btn-dark btn-sm\" onclick=\"hideCardButtons('" + _cardItem.id + "');\">Close</button>";
	
	$("#"+_cardItem.id).find("[id='idButtons']").html(buttonsHtml);
}

function redirectToDonatePageIfApplies() {
	setTimeout(() => {
		const urlParams = new URLSearchParams(window.location.search);
		let redirectToPage = urlParams.get('redirectToPage')

		if (redirectToPage !== null) { 
			if (redirectToPage.toUpperCase() === "DONATE-PAGE")
			{
					document.getElementById("idDonateButton").click();						
			}
		}
	}, 1000);
}

function setCardsImages(_cards) {
	_cards.forEach(cardItem => {
		injectionOfCardsImages(cardItem);
	});
}

function injectionOfCardsImages(_cardItem) {
	// Card image
	var imgHtlm = "<img id=\"cardImage\" src=\"" + _cardItem.image + "\" class=\"card-img-top pointer\" onclick=\"showCardButtons('" + _cardItem.id + "');\">";
	$("#"+_cardItem.id).find("[id='cardImage']").html(imgHtlm);
}

function navigateTo(_url) {
	//window.location = _url;
	window.open(_url);
}

function logoClick(_currentPageTag) {
	if (_currentPageTag === "#id_nav-bar-item-home")
	{
		$('#myModal').modal('show')
	}
	else
	{
		window.location.href = "index.html";
	}
}

function showCardButtons(_idElement) {
	var elementBody = $("#"+_idElement).find("[id='cardBody']");
	var elementButtons = $("#"+_idElement).find("[id='cardButtons']");
	
	elementBody.removeClass("d-none");
	elementBody.addClass("d-none");
	elementButtons.removeClass("d-none");
}

function hideCardButtons(_idElement) {
	var elementBody = $("#"+_idElement).find("[id='cardBody']");
	var elementButtons = $("#"+_idElement).find("[id='cardButtons']");

	elementBody.removeClass('d-none');
	elementButtons.removeClass('d-none');
	elementButtons.addClass('d-none');
}

function setText(_idControl, _text) {
	document.getElementById(_idControl).innerHTML = _text;
}

function donateDialogBox() {
	$('#donateDialog').modal('show')
}

function showLocalizationDialogSelectorOnClickOverFlagIcon() {
	$('#localizationDialog').modal('show')
}

function setLocalizationCode(_localization) {
	localStorage.setItem(KEY_LOCALIZATION_COUNTRY, _localization.country);
	localStorage.setItem(KEY_LOCALIZATION_LANGCODE, _localization.langCode);
}

function getLocalization() {
	let country = localStorage.getItem(KEY_LOCALIZATION_COUNTRY);
	let langCode = localStorage.getItem(KEY_LOCALIZATION_LANGCODE);
	let returnValue = {country: DEFAULT_COUNTRY, langCode: DEFAULT_LANG};
 
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

function validateLocalization(_localization) {
	let found = false

	Localization.forEach(localize => {
		if (localize.country === _localization.country && 
				localize.langCode === _localization.langCode) {
					found = true;
				}
	});

	return found;
}

function changeLocalization(_localization, _hrefToRefresh) {
	let currentLocalization = getLocalization();

	if (_localization.country !== currentLocalization.country) {
		setLocalizationCode(_localization);
		
		document.getElementById('idCloseLocalizationDialogButton').click();

		window.location.href = _hrefToRefresh;
	}
}
