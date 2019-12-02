// Global constants
// *****************

var C_DEBUG_MODE = true;
var C_LOG = false;
var C_FPS_RENDER = 60;
var C_PIXEL_SIZE = 1; 
var C_FPS_MS = 1000 / C_FPS_RENDER;
var C_AVOID_RENDER = true;
	
var C_DEBUG_SHOW_LINES = false;
var C_SHOW_METRICS = false;
var C_DEBUG_SHOW_JOYSTICK = false;
var C_RENDER_COLLISION_RECT = false;
	
// App globals
var C_LOCAL_STORE_NAMESPACE = "treinto";
//var C_LOCAL_STORE_NAMESPACE = "tanks";
var C_EDITOR_LEVEL_INTRO_KEY = 'stored_level_intro';
var C_EDITOR_LEVEL_HELP_KEY = 'stored_level_help';
var C_EDITOR_LEVEL_1_KEY = 'stored_level_1';
var C_EDITOR_LEVEL_2_KEY = 'stored_level_2';
var C_EDITOR_EMPTY_KEY = 'EMPTY';
var C_EDITOR_NEW_EDITION = 'stored_new_edition';

// App states
var C_APP_STATE_INTRO = 1;
var C_APP_STATE_PLAY = 2;
var C_APP_STATE_HELP = 3;
var C_APP_STATE_LEVEL = 4;
var C_APP_STATE_EDITION = 5;
var C_APP_STATE_FRAMER = 6;
var C_APP_STATE_GAMEOVER = 7;

var C_BUTTON_RIGHT_KEY = C_KEY_RIGHT;
var C_BUTTON_UP_KEY = C_KEY_UP;
var C_BUTTON_LEFT_KEY = C_KEY_LEFT;
var C_BUTTON_DOWN_KEY = C_KEY_DOWN;

var C_BUTTON_A_KEY = C_KEY_SPACE;	// Jump
var C_BUTTON_B_KEY = C_KEY_SPACE;	// Protect
var C_BUTTON_C_KEY = C_KEY_SPACE;	// Punch

var C_BUTTON_SIZE = 20;

// Objects constants
var C_STATE_ALIVE = 1;
var C_STATE_BRICK_COLLITION = 2;
var C_STATE_TAGGED_TO_DELETE = 3;		

// Background constans

// Maze constants
var C_CELL_WIDTH = 32;
var C_CELL_HEIGHT = 32;

// Menu items
var C_MAIN_MENU_ITEM_PLAY = 0;
var C_MAIN_MENU_ITEM_HELP = 1;
var C_MAIN_MENU_ITEM_EXIT = 2;

// Hero constant:	
var C_MIN_DESTRUCTION_SIZE = 3;
var C_BEATEN_POWER = 5;
var C_PARTICLE_SIZE = 15;
var C_MAX_PARTICLES = 50;		// Number of particles at the same time.
var C_GENERATION_SPEED = 25;	// If 0 is in this random, then generate.

var C_PLAYER_SPEED = 1;
var C_PLAYER_ROTATION_SPEED = 3;
var C_SMOGCAR_SPEED = 2;

//Particle class constants
var C_PARTICLE_NATURAL_DISSOLVE = 0.1;

var C_OFFSETX_ENGINE = 0 * 120;
var C_OFFSETY_ENGINE = 0 * 120;
var C_OFFSETX_SHIELD = (0 * 120);
var C_OFFSETY_SHIELD = (1 * 120);
var C_OFFSETX_ENERGY = (0 * 120);
var C_OFFSETY_ENERGY = (2 * 120);
var C_OFFSETX_L4 = (0 * 120);
var C_OFFSETY_L4 = (3 * 120);

var C_OFFSETX_RADAR = 600 - (0 * 120);
var C_OFFSETY_RADAR = (0 * 120);
var C_OFFSETX_CANNON = 600 - (0 * 120);
var C_OFFSETY_CANNON = (1 * 120);
var C_OFFSETX_R3 = 600 - (0 * 120);
var C_OFFSETY_R3 = (2 * 120);
var C_OFFSETX_R4 = 600 - (0 * 120);
var C_OFFSETY_R4 = (3 * 120);

// Animation flags
// Class definitions
var C_CLASS_NONE = 0;
var C_OBJ_TYPE_NONE = 0;

var C_CLASS_FIRE = 1;
var C_CLASS_PARTICLE = 2;
var C_CLASS_BRICK = 3;
	var C_OBJ_TYPE_STONE = 0;
	var C_OBJ_TYPE_WOOD = 1;
	var C_OBJ_TYPE_GENERATOR = 2;
	var C_OBJ_TYPE_BRICK = 3;
var C_CLASS_PLAYER = 4;
	var C_OBJ_TYPE_PLAYER = 8;
var C_CLASS_SMOGCAR = 5;
	var C_OBJ_TYPE_SMOGCAR_CW = 4;		// clock wise when corner bifurcation
	var C_OBJ_TYPE_SMOGCAR_ACW = 5;		// anti clock wise when corner bifurcation
var C_CLASS_DECORATION = 6;
	var C_OBJ_TYPE_GREEN = 0;			
	var C_OBJ_TYPE_I = 1;			
	var C_OBJ_TYPE_II = 2;			
	var C_OBJ_TYPE_III = 3;			
	var C_OBJ_TYPE_IIII = 4;			
	var C_OBJ_TYPE_H = 5;			
	var C_OBJ_TYPE_V = 6;			
	var C_OBJ_TYPE_X = 7;			
	var C_OBJ_GREEN_FAR = 8;
var C_CLASS_ENEMY = 700;
	var C_OBJ_TYPE_ENEMY_TANQUETA = 701;
var C_CLASS_ENGINE = 800;
	var C_OBJ_TYPE_ENGINE_MULLER = 801;
var C_CLASS_RADAR = 900;
	C_OBJ_TYPE_RADAR_LEVEL_1 = 901;
var C_CLASS_SHIELD = 1000;
	C_OBJ_TYPE_SHIELD_TYPE_1 = 1001;
var C_CLASS_ENERGY = 1100;
	C_OBJ_TYPE_ENERGY_1 = 1101;
var C_CLASS_CHBUTTON = 1200;
	C_OBJ_TYPE_CHBUTTON_BLUE = 1201;
	C_OBJ_TYPE_CHBUTTON_GREEN = 1202;
var C_CLASS_CANNON = 1300;
	C_OBJ_TYPE_CANNON_1 = 1301;
var C_CLASS_SMOKE = 1400;
	C_OBJ_TYPE_SMOKE_1 = 1401;

var C_STATUS_ALIVE = 1;
var C_STATUS_DIE = 2;
var C_STATUS_DESTROYED = 3;

// Delta movement from one frame to another.
var C_FIRE_STEP_SIZE = 1;		
// Delta movement from one frame to another.
var C_FIRE_MAX_STEPS = Math.round(C_CELL_WIDTH / C_FIRE_STEP_SIZE, 0);		
// Decremental qtty per frame when fire is dissolving.
var C_FIRE_DISSOLVING_POWER = 5;		

// Views states
var C_STATE_VIEW_GAMEOVER_WIN = 1;
var C_STATE_VIEW_GAMEOVER_LOST = 2;
