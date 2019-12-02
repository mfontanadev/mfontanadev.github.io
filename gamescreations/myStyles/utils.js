var mouseX = 0;
var mouseY = 0;
var currentParentId = "";
var currentTooltipId  = "";

document.onmousemove=GetMousePosV2;

function GetMousePosV2(evt) 
{
	if (evt.pageX) 
		mouseX = evt.pageX;
	else if (evt.clientX)
	  mouseX = evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft :  document.body.scrollLeft);
	else 
		mouseX = -1;

	if (evt.pageY) 
		mouseY = evt.pageY;
	else if (evt.clientY)
	  mouseY = evt.clientY + (document.documentElement.scrollTop ?  document.documentElement.scrollTop :  document.body.scrollTop);
	else 
		mouseY = -1;
	
		
	if (currentParentId != "")
	{
		  img = document.getElementById(currentParentId); 
			mx = xstooltip_findPosX(img)
			my = xstooltip_findPosY(img)

  		if (mouseX < mx || mouseX > mx + img.width || mouseY < my || mouseY > my + img.height)
  		{
  			currentParentId = "";
				xstooltip_hide(currentTooltipId);
  	  }
	}
}

function xstooltip_findPosX(obj) 
{
  var curleft = 0;
  if (obj.offsetParent) 
  {
    while (obj.offsetParent) 
        {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function xstooltip_findPosY(obj) 
{
    var curtop = 0;
    if (obj.offsetParent) 
    {
        while (obj.offsetParent) 
        {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

function xstooltip_show(tooltipId, parentId, posX, posY)
{
    it = document.getElementById(tooltipId);
  
    //if (currentParentId == "")
    {
				currentParentId = parentId;
				currentTooltipId = tooltipId;

    		SetToolTipInnerText(it, parentId);
    		
        // need to fixate default size (MSIE problem)
        it.style.width = it.offsetWidth + 'px';
        it.style.height = it.offsetHeight + 'px';
        
        img = document.getElementById(parentId); 
				
        x = xstooltip_findPosX(img) + posX;
        y = xstooltip_findPosY(img) + posY;
  	  			
  	  	if (x + it.offsetWidth > screen.width)
  	  		x = screen.width - (it.offsetWidth + 20);  	  	
  	  			
        it.style.top = y + 'px';
        it.style.left = x + 'px';
    }
    
    it.style.visibility = 'visible'; 
}

function xstooltip_hide(id)
{
    it = document.getElementById(id); 
    it.style.visibility = 'hidden'; 
		currentTooltipId = "";
	/*
    var mouseX = document.Show.MouseX.value;
    var mouseY = document.Show.MouseY.value;
    
    pit = document.getElementById(parentId);
    
    if (it.style.top
    it = document.getElementById(id); 
    it.style.visibility = 'hidden'; 
      
    
   	document.Show.MouseX.value = tempX
  	document.Show.MouseY.value = tempY
    
    //it.style.top = '';
    //it.style.top = 0;
    //it.style.left = '';
    //it.style.left = 0;
*/
}


function SetToolTipInnerText(p_tooltId, p_parentId)
{
	var txtTitulo = "";
	var txtArgumento = "";
	var txtTipo = "";
	var txtLenguaje = "";
	var txtResolucion = "";
	var txtMotivacion = "";
	var line = "";
	var dosBoxDownload = "";

	// Datos de cada thumbail.
	if (p_parentId == "id_GAME_CRUZADAS")
	{
		txtTitulo = "CRUZADAS";
		//txtTipo	= "Juego";
		txtArgumento	= "Palabras cruzadas como en las revistas.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "720x348x2bits (mshercules, se usa DOXBOX para emular MS-DOS)";
		txtMotivacion = "Base para plantillas de juegos.";
	}

	if (p_parentId == "id_GAME_MEMOTEST")
	{
		txtTitulo = "MEMOTEST";
		//txtTipo	= "Juego";
		txtArgumento	= "Simulacion del juego de mesa Memotest.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "720x348x2bits (mshercules, se usa DOXBOX para emular MS-DOS)";
		txtMotivacion = "Usar graficos extraidos del News.";
	}

	if (p_parentId == "id_GAME_MINI-RALY")
	{
		txtTitulo = "MINI RALLY";
		//txtTipo	= "Juego";
		txtArgumento	= "Versión digital del autito y la pista en rollo.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "720x348x2bits (mshercules, se usa DOXBOX para emular MS-DOS)";
		txtMotivacion = "Scroll vertical y utilizacion de tiles.";
	}

	if (p_parentId == "id_GAME_TELEFONO")
	{
		txtTitulo = "TELEFONO";
		//txtTipo	= "Juego";
		txtArgumento	= "Similar al juego real Simon.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "720x348x2bits (mshercules, se usa DOXBOX para emular MS-DOS)";
		txtMotivacion = "Creación de rutinas para fuentes.";
	}

	if (p_parentId == "id_GAME_TETRIS")
	{
		txtTitulo = "TETRIS";
		//txtTipo	= "Juego";
		txtArgumento	= "Version CHEL del Tetris.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "720x348x2bits (mshercules, se usa DOXBOX para emular MS-DOS)";
		txtMotivacion = "Obtener conocimiento en Game Design.";
	}

	if (p_parentId == "id_GAME_CELETICOS")
	{
		txtTitulo = "CELETICOS";
		//txtTipo	= "Juego";
		txtArgumento	= "Tortazos a las celebridades y políticos.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "640x480x16 (vga)";
		txtMotivacion = "Primeras pruebas en modo VGA.";
	}

	if (p_parentId == "id_GAME_NAVE")
	{
		txtTitulo = "Nave";
		//txtTipo	= "Juego";
		txtArgumento	= "Shooter de naves en formato vertical.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "320x300x256 (vga)";
		txtMotivacion = "Producto final del curso de videojuegos.";
	}

	if (p_parentId == "id_GAME_PATTOM-VS-ROMMEL")
	{
		txtTitulo = "Pattom vs. Rommel";
		txtArgumento	= "Version CHEL del Gorilla.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "640x480x16 (vga)";
		txtMotivacion = "Utilizaciòn de mascara para hacer transparencias.";
	}

	if (p_parentId == "id_GAME_TRACK-PACK")
	{
		txtTitulo = "Track Pack";
		txtArgumento	= "Escapar del laberinto.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "640x480x16 (vga)";
		txtMotivacion = "Juego Socoban, utilizar mapas y tiles.";
	}

	if (p_parentId == "id_GAME_TRENES")
	{
		txtTitulo = "Trenes";
		txtArgumento	= "Protector de pantallas en modo texto.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "80x25 (modo texto)";
		txtMotivacion = "Multi threading para control individual de trenes.";
	}

	if (p_parentId == "id_GAME_RESERVA")
	{
		txtTitulo = "Reserva";
		txtArgumento	= "Manejar un camión de bomberos y apagar incendios.";
		txtLenguaje = "Visual Studio C++ 6.0";
		txtResolucion = "400x400x16bits ";
		txtMotivacion = "Juego presentado en concurso CODEAR (enero 2009).";
	}

	if (p_parentId == "id_GAME_SPACE-MMM-INVADERS")
	{
		txtTitulo = "Space mmm invaders";
		txtArgumento	= "Version CHEL de Space Invaders.";
		txtLenguaje = "Visual Studio C++ 6.0";
		txtResolucion = "400x400x16bits ";
		txtMotivacion = "Desarrollar un framework para programar juegos.";
	}

	if (p_parentId == "id_GAME_BLENDEO")
	{
		txtTitulo = "Blendeo";
		txtArgumento	= "Generador de figuras.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "640x480x16";
		txtMotivacion = "Implementar algoritmo de interpolación lineal.";
	}

	if (p_parentId == "id_GAME_FUEGO")
	{
		txtTitulo = "Fuego";
		txtArgumento	= "Efecto de fuego.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "320x200x256";
		txtMotivacion = "Practicar idea de automatas celulares.";
	}

	if (p_parentId == "id_GAME_SCR-BEZIER")
	{
		txtTitulo = "Bezier";
		txtArgumento	= "Animación de polígono y sus puntos de control.";
		txtLenguaje = "Quick Basic 4.5";
		txtResolucion = "640x480x16";
		txtMotivacion = "Implementar modelo de curvas Bezier.";
	}

	if (p_parentId == "id_GAME_SCR-FOT3D")
	{
		txtTitulo = "Foto 3D";
		txtArgumento	= "Descomponer una foto en sus canales de colores.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "320x200x256";
		txtMotivacion = "Desarrollar motor 3D basico.";
	}

	if (p_parentId == "id_GAME_GENLAB")
	{
		txtTitulo = "Generador de Laberintos";
		txtArgumento	= "Genera una imagen de un laberinto.";
		txtLenguaje = "Quick Basic 7.0";
		txtResolucion = "320x200x256";
		txtMotivacion = "Desarrollar un algoritmo que genere laberintos.";
	}

	if (p_parentId == "id_GAME_360")
	{
		txtTitulo = "360";
		txtArgumento	= "Version CHEL de una foto panorámica.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "640x480x256 (VESA)";
		txtMotivacion = "Implementar algoritmo para unir fotos.";
	}

	if (p_parentId == "id_GAME_CAIDITA3D")
	{
		txtTitulo = "Caidita 3D";
		txtArgumento	= "Simular caida de dominos.";
		txtLenguaje = "Visual Studio C++ 6.0";
		txtResolucion = "800x600x16bits";
		txtMotivacion = "Adquirir conocimientos en DirectX.";
	}

	if (p_parentId == "id_GAME_ALGGENETICO")
	{
		txtTitulo = "Algoritmo genético";
		txtArgumento	= "Simulación de mutaciones.";
		txtLenguaje = "Visual Basic 6";
		txtResolucion = "800x600x16bits";
		txtMotivacion = "IMplementar algoritmos genéticos.";
	}

	if (p_parentId == "id_GAME_ALGGENETICO")
	{
		txtTitulo = "Algoritmo genético";
		txtArgumento	= "Simulación de mutaciones.";
		txtLenguaje = "Visual Basic 6";
		txtResolucion = "800x600x16bits";
		txtMotivacion = "Implementar algoritmos genéticos.";
	}

	if (p_parentId == "id_GAME_DOMINO")
	{
		txtTitulo = "Dominó";
		txtArgumento	= "Simulación caida de dominós.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "320x200x256";
		txtMotivacion = "Utilización de perspectiva isometrica.";
	}

	if (p_parentId == "id_GAME_FUNSOMBR")
	{
		txtTitulo = "Funciones Sombreadas";
		txtArgumento	= "Dibujado de función con diferentes técnicas.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "640x480x256 (VESA)";
		txtMotivacion = "Implementar iluminación uniforme de polígonos.";
	}

	if (p_parentId == "id_GAME_NURBS")
	{
		txtTitulo = "N.U.R.B.S.";
		txtArgumento	= "Non Uniform Rational B-Splines.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "640x480x256 (VESA)";
		txtMotivacion = "Implementar algoritmo para dibujado de B-Splines.";
	}

	if (p_parentId == "id_GAME_PM2DEN3D")
	{
		txtTitulo = "Punto medio 3d";
		txtArgumento	= "Fractal Punto Medio usando motor 3d.";
		txtLenguaje = "Borland C 3.1";
		txtResolucion = "640x480x256 (VESA)";
		txtMotivacion = "Usar motor 3D e implementar fractales.";
	}

	if (p_parentId == "id_GAME_PAPENBOMBUMAN")
	{
		txtTitulo = "PaPenBomBuMan";
		txtArgumento	= "Pac Man + Pengo + Bomber + Bubble.";
		txtLenguaje = "Visual Studio C++ 6.0";
		txtResolucion = "592x592x16 bits";
		txtMotivacion = "Concurso CODEAR mayo-junio de 2009.";
	}
	
//	txtMotivacion = mouseX;
	//if (mouseX > 400) 
//		alert ("hola");

	// Contatenar los datos previos con la estructura base del tooltip.
		     line = "<table class='tooltipStyle' border='0' cellpadding='0' cellspacing='0'>                      ";         
	line = line + "   <table class='tooltipStyle' border='0' cellpadding='0' cellspacing='0'><tr>               ";
	line = line + "      <td style='background-color: #993399' class='tooltipStyleMainTittle'>&nbsp;                            ";
	line = line + txtTitulo;
	line = line + "      </td><tr>                                                                              ";            
	line = line + "      <td style='background-color: #EEEEEE'>                                                 ";   
	line = line + "  	  <p class='tooltipStyleFont'><b>&nbsp;&nbsp;<span class='tooltipStyleTitlesDesc'>Argumento:</span> </b>&nbsp;      ";
	line = line + txtArgumento;
	line = line + "  	  <p class='tooltipStyleFont'><b>&nbsp;&nbsp;<span class='tooltipStyleTitlesDesc'>Lenguaje:</span> </b>&nbsp;       ";
	line = line + txtLenguaje;
	line = line + "      </p><p class='tooltipStyleFont'><b>&nbsp;&nbsp;<span class='tooltipStyleTitlesDesc'>Resolución:</span> </b>&nbsp;";
	line = line + txtResolucion + dosBoxDownload;
	line = line + "      </p><p class='tooltipStyleFont'><b>&nbsp;&nbsp;<span class='tooltipStyleTitlesDesc'>Motivación:</span> </b>&nbsp;";
	line = line + txtMotivacion;
	line = line + "      </p><p class='tooltipStyleFont'><b>&nbsp;&nbsp;<span class='tooltipStyleTitlesDesc'>&nbsp;</span></b>&nbsp;</p>  ";
	line = line + "</td></tr></table>                                                                           ";               

	p_tooltId.innerHTML = line ;
}