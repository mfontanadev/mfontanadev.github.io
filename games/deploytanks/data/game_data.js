
var C_GAME_TITLE_AND_VERSION = 'Tanks (v1.0.0)'

// Definition of images to perform preloaded data. This indexes are important for performance.
// We don´t seek images in resourceMngr by name.
var C_IMG_GREEN = 0;
var C_IMG_FONT = 1;
var C_IMG_FONT_SMALL = 2;
var C_IMG_HERO = 3;
var C_IMG_GREEN_FAR = 4;

var C_IMG_ENEMY_TANQUETA = 5;

var C_IMG_ENGINE_BUTTON_OFF = 6;
var C_IMG_ENGINE_BUTTON_ON = 7;
var C_IMG_MAIN_MENU = 8;

var C_IMG_RADAR = 9;

var C_IMG_BUTTON_GREEN_OFF = 10;
var C_IMG_BUTTON_GREEN_ON = 11;

var C_IMG_SHIELD_WOOD = 12;
var C_IMG_SHIELD_SILVER = 13;
var C_IMG_SHIELD_GOLD = 14;
var C_IMG_SHIELD_BLUE = 15;
var C_IMG_TACOMETRO = 16;
var C_IMG_TACOMETRO_ROW = 17;

var C_IMG_ENERGY_INDICATOR = 18;
var C_IMG_ENERGY_ROW_INDICATOR = 19;

var C_IMG_IND_BACKGROUND_LEFT = 20;
var C_IMG_IND_BACKGROUND_RIGHT = 21;

var C_IMG_ENEMY_RECYCLED = 22;
	
var C_IMG_FACTORY = 23;
	
var gl_images_definition = 
	[
			'background_pattern_01.png',
			'font.png',
			'font_small.png',
			'hero.png',
			'background_pattern_01.png',
			'enemy_tanqueta.png',
			'engine_button_off.png',
			'engine_button_on.png',
			'main_menu.png',
			'radar.png',
			'button_green_off.png',
			'button_green_on.png',
			'shield_wood.png',
			'shield_silver.png',
			'shield_gold.png',
			'shield_blue.png',
			'tacometro.png',
			'tacometro_row.png',
			'energy_indicator.png',
			'energy_row.png',
			'ind_background_left.png',
			'ind_background_right.png',
			'recycled.png',
			'factory.png'
	];

// SOUND CONSTANTS
var C_SND_NO_SOUND 			= 0;					
var C_SND_ENGINE_0 			= 1;					
var C_SND_ENGINE_MOVING 	= 2;
var C_SND_HITTED 			= 3;
var C_SND_SHOOT 			= 4;
var C_SND_TANQUETA 			= 5;
var C_SND_TANQUETA_EN 		= 6;
var C_SND_ENGINE_STARTING 	= 7;
var C_SND_ENGINE_STARTED 	= 8;
var C_SND_BULLET_IMPACT 	= 9;
var C_SND_RADAR_BUTTON 		= 10;
var C_SND_BULLET_NOT_IMPACT = 11;

var C_SND_ENGINE_0_VOLUME = 5;
var C_SND_ENGINE_MOVING_VOLUME = 40;
var C_SND_TANQUETA_VOLUME = 10;
var C_SND_ENGINE_STARTED_VOLUME = 100;

var sound_manifest = [
	{src:"nosound.wav", id:0},
	
	{src:"engine_0.wav", id:1},
	{src:"engine_moving.wav", id:2},
	{src:"hitted.wav", id:3},

	{src:"shoot.wav", id:4},
	{src:"tanqueta.wav", id:5},
	{src:"tanqueta.wav", id:6},

	{src:"engine_starting.wav", id:7},
	{src:"engine_started.wav", id:8},
	{src:"bullet_impact.wav", id:9},

	{src:"radar_button.wav", id:10},
	{src:"bullet_not_impact.wav", id:11}
];

