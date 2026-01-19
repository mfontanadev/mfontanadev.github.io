const KEY_LOCALIZATION_COUNTRY = "localization.country";
const KEY_LOCALIZATION_LANGCODE = "localization.langCode";

var lz_def = { 
	ARG : {countryCode: "ARG", languageCode : "SPA"},
	USA : {countryCode: "USA", languageCode : "ENG"}
}

const DEFAULT_LANG = lz_def.USA.languageCode;
const DEFAULT_COUNTRY = lz_def.USA.countryCode;

var Localization = [
	{country: lz_def.ARG.countryCode, langCode: lz_def.ARG.languageCode},
	{country: lz_def.USA.countryCode, langCode: lz_def.USA.languageCode}
];
