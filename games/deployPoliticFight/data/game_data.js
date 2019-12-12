
var C_GAME_TITLE_AND_VERSION = 'Politic Fight FF (v2.1.1)'

// Definition of images to perform preloaded data. This indexes are important for performance.
// We don´t seek images in resourceMngr by name.
var C_IMG_GUY_SPRITE = 0;
var C_IMG_GUY_BAD_J_SPRITE = 1;
var C_IMG_GUY_BAD_2_SPRITE = 2;
var C_IMG_LEVEL_1_BACKGROUND = 3;
var C_IMG_LEVEL_2_BACKGROUND = 4;
var C_IMG_STORE = 5;
var C_IMG_GUY_BAD_RYDEN_SPRITE = 6;
var C_IMG_FONT = 7;
var C_IMG_FONT_SMALL = 8;
var C_IMG_MAIN_MENU = 9;

var gl_images_definition = 
	[
		'guy.png',				// C_IMG_GUY_SPRITE
		'guy_bad_j.png',		
		'cody.png',		// C_IMG_GUY_BAD_2_SPRITE
		'level1_background.png',		
		'level1_background.png',		
		'store.png',
		'guy_bad_ryden.png',
		'font.png',
		'font_small.png',
		'main_menu.png'
	];

// SOUND CONSTANTS
var C_SND_BOMBO_ID = 0;
var C_SND_COW_BELL_ID = 1;
var C_SND_CRASH_ID = 2;
var C_SND_MED_TOM_ID = 3;
var C_SND_SNARE_ID = 4;
var C_SND_PUNCH_ID = 5;
var C_SND_JUMP_ID = 6;
var C_SND_RAY_ID = 7;

var gl_sound_definition = 
[
	'sounds/Bombo.wav',
	'sounds/CowBell.wav',
	'sounds/Crash.wav',
	'sounds/MedTom.wav',
	'sounds/Snare.wav',
	'sounds/Punch.wav',
	'sounds/Jump.wav',
	'sounds/ray.wav'
];

var gl_sound_definitionClassic = 
[
	'C_SND_BOMBO_ID',
	'C_SND_COW_BELL_ID',
	'C_SND_CRASH_ID',
	'C_SND_MED_TOM_ID',
	'C_SND_SNARE_ID',
	'C_SND_PUNCH_ID',
	'C_SND_JUMP_ID',
	'C_SND_RAY_ID'
];
	
// QUICK REFERENCES
// "name": Name in socre bar 
// "x" : Position X in pixels at creation time.
// "y" : Position Y in pixels at creation time.
// "xFace" : Left corner for face image used in score indicator. 
// "yFace" : Top corner for face image used in score indicator.
// "maxEnergy": Statima size, in pixels.
// "spriteSheet": Image file with sprites.
// "hitPower": Percent of damage when hit to someone.
// "hitDamage": Percent of damage when someone hit us. This value is added to HitPower each time Hero hit.	
var gl_sprites_definition = 
{
	"actor_collection": 
	[
		// Definition data for HERO
		{
			"id": 1,
			"class": C_CLASS_PLAYER,
			"type": C_OBJ_TYPE_PLAYER_GUY,
			"name": "GUY", 
			"x" : 180, 
			"y" : 160,
			"xFace" : 0, 
			"yFace" : 128,
			"maxEnergy": 200,
			"spriteSheet": C_IMG_GUY_SPRITE,
			"hitPower": 20,
			"spritesFile": "guy.sprites.js",
			"animFile": "guy.anim.js"
		},
		
		// Definition data for J
		{
			"id": 2,
			"class": C_CLASS_ENEMY,
			"type": C_OBJ_TYPE_ENEMY_GUY,
			"name": "J", 
			"x" : -10, 
			"y" : 160,
			"xFace" : 384, 
			"yFace" : 320,
			"maxEnergy": 200,
			"spriteSheet": C_IMG_GUY_BAD_J_SPRITE,
			"hitPower": 10,
			"hitDamage": 15,	
			"spritesFile": "guy_bad_j.sprites.js",
			"animFile": "guy_bad_j.anim.js",
			"hitLevel": 1,
			"followLevel": 100
		},
		
		// Definition data for CODY
		{
			"id": 3,
			"class": C_CLASS_PLAYER,
			"type": C_OBJ_TYPE_PLAYER_CODY,
			"name": "CODY", 
			"x" : 180, 
			"y" : 160,	
			"xFace" : 0, 
			"yFace" : 128,
			"maxEnergy": 200,
			"spriteSheet": C_IMG_GUY_BAD_2_SPRITE, 
			"hitPower": 20,
			"spritesFile": "cody.sprites.js",
			"animFile": "cody.anim.js"
		},
		
		// Definition data for RYDEN
		{
			"id": 4,
			"class": C_CLASS_ENEMY,
			"type": C_OBJ_TYPE_ENEMY_RYDEN,
			"name": "RYDEN", 
			"x" : -10, 
			"y" : 160,
			"xFace" : 36, 
			"yFace" : 17,
			"maxEnergy": 200,
			"spriteSheet": C_IMG_GUY_BAD_RYDEN_SPRITE, 
			"hitPower": 25,
			"hitDamage": -10,	
			"spritesFile": "raiden.sprites.js",
			"animFile": "raiden.anim.js",
			"hitLevel": 10,
			"followLevel": 20
		}
	
	],
	
	"potion_collection": 
	[
		// Strong potion, red
		{
			"id": 10,
			"_class": C_CLASS_POTION,
			"type": C_OBJ_TYPE_POTION_STRONG,
			"spriteSheet": C_IMG_STORE,
			"x1" : 0, 
			"y1" : 0,
			"x2" : 28, 
			"y2" : 11,
			"offsetX1" : 300, 
			"offsetY1" : 0,
			"blinkRate" : 6
		},
		
		// Speed potion, blue
		{
			"id": 20,
			"_class": C_CLASS_POTION,
			"type": C_OBJ_TYPE_POTION_SPEED,
			"spriteSheet": C_IMG_STORE,
			"x1" : 0, 
			"y1" : 32,
			"x2" : 28, 
			"y2" : 32 + 11,
			"offsetX1" : 500, 
			"offsetY1" : 0,
			"blinkRate" : 6
		},

		// Stamina potion, green
		{
			"id": 30,
			"_class": C_CLASS_POTION,
			"type": C_OBJ_TYPE_POTION_STAMINA,
			"spriteSheet": C_IMG_STORE,
			"x1" : 0, 
			"y1" : 64,
			"x2" : 28, 
			"y2" : 64 + 11,
			"offsetX1" : 700,  
			"offsetY1" : 0,
			"blinkRate" : 6
		}

	]
};

var gl_levels_definition = 
{
	"level_collection": 
	[
		// Level one
		{
			"id": 1,
			"_class": C_CLASS_LEVEL,
			"_type": C_OBJ_TYPE_LEVEL_SINGLE,
			"spriteSheet": C_IMG_LEVEL_1_BACKGROUND,
			"maxEnemies": 5,
			"level_stages": 
			[
				// Stage 1
				{
					"_class": C_CLASS_STAGE,
					"_type": C_OBJ_TYPE_STAGE_SINGLE,
					"enemiesGeneratePosition": 0,
					"enemiesToGenerate": 2,
					"boss": -1
				},
				// Stage 2
				{
					"_class": C_CLASS_STAGE,
					"_type": C_OBJ_TYPE_STAGE_SINGLE,
					"enemiesGeneratePosition": 300,
					"enemiesToGenerate": 3,
					"boss": -1
				},
				// Stage 3
				{
					"_class": C_CLASS_STAGE,
					"_type": C_OBJ_TYPE_STAGE_SINGLE,
					"enemiesGeneratePosition": 500,
					"enemiesToGenerate": 4,
					"boss": C_OBJ_TYPE_ENEMY_RYDEN
				}
			],
			"potions": 
			[
				{ "type": C_OBJ_TYPE_POTION_STRONG, "x" : 100,  "y" : 180},
				{ "type": C_OBJ_TYPE_POTION_SPEED, "x" : 500,  "y" : 180},
				{ "type": C_OBJ_TYPE_POTION_STAMINA, "x" : 1000,  "y" : 180}
			]
		},
		
		// Level two
		{
			"id": 2,
			"_class": C_CLASS_LEVEL,
			"type": C_OBJ_TYPE_LEVEL_SINGLE,
			"spriteSheet": C_IMG_LEVEL_2_BACKGROUND,
			"maxEnemies": 10,
			"level_stages": 
			[
				// Stage 1
				{
					"_class": C_CLASS_STAGE,
					"_type": C_OBJ_TYPE_STAGE_SINGLE,
					"enemiesGeneratePosition": 0,
					"enemiesToGenerate": 2,
					"boss": -1
				},
				// Stage 2
				{
					"_class": C_CLASS_STAGE,
					"_type": C_OBJ_TYPE_STAGE_SINGLE,
					"enemiesGeneratePosition": 300,
					"enemiesToGenerate": 3,
					"boss": -1
				},
				// Stage 3
				{
					"_class": C_CLASS_STAGE,
					"_type": C_OBJ_TYPE_STAGE_SINGLE,
					"enemiesGeneratePosition": 500,
					"enemiesToGenerate": 4,
					"boss": -1
				}
			],
			"potions": 
			[
				{ "type": C_OBJ_TYPE_POTION_STRONG, "offsetX1" : 100,  "offsetY1" : 120},
				{ "type": C_OBJ_TYPE_POTION_SPEED, "offsetX1" : 130,  "offsetY1" : 120},
				{ "type": C_OBJ_TYPE_POTION_STAMINA, "offsetX1" : 160,  "offsetY1" : 120}
			]
		}
	]
};

var gl_resources = 
{
	"bitmpas": 
	[
		{
			"id": C_RESOURCE_ID_GO_INDICATOR, "_class": C_CLASS_RESOURCE, "_type": C_OBJ_TYPE_BITMAP, "spriteSheet": C_IMG_STORE,
			"x1": 68,   "y1": 0, 	"x2": 69+32,   "y2": 00+24, 	"offsetX": 0, 	"offsetY": 0, 	"posX":300, 	"posY": 40
		},
		{
			"id": C_RESOURCE_ID_GO2_INDICATOR, "_class": C_CLASS_RESOURCE, "_type": C_OBJ_TYPE_BITMAP, "spriteSheet": C_IMG_STORE,
			"x1": 85,   "y1": 10, 	"x2": 85+40,   "y2": 10+40, 	"offsetX": 0, 	"offsetY": 0, 	"posX":300, 	"posY": 50
		}
	],
	"animations": 
	[
		{
			"id": 1, 
			"_type": C_ANIM_RAIDEN_FIRE1,
			"x" : 0, 
			"y" : 0,
			"frames": 
			[
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX": -2, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1},
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX":  2, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1},
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX":  4, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1},
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX":  2, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1}
			]
		},
		{
			"id": 2, 
			"_type": C_ANIM_RAIDEN_FIRE2,
			"spriteSheet": C_IMG_GUY_BAD_RYDEN_SPRITE, 
			"x" : 0, 
			"y" : 0,
			"frames": 
			[
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX": -2, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1},
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX":  2, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1},
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX":  4, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1},
				{"x1": 14,   "y1": 144, 	"x2": 14+52,   "y2": 144+104, 	"offsetX":  2, "offsetY": 0, "incX": 0, "incY": 0, "duration": 1}
			]
		}
	]
};

