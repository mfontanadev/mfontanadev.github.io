// Class ChFrecuencer
//
// This class is used when you need wait some time interval and then
// perform a function call. 
// It is like a timer.
//
// Example: fire the hero cannon each two seconds.
function ChTimer () 
{ 
	ChTimer.prototype.initWith = function (_miliSeconds)
	{
		this.m_counter = -1;
		this.m_time = _miliSeconds;
		this.m_msTime = Math.round((this.m_time * C_FPS_RENDER) / 1000, 1);
	}	
	
	ChTimer.prototype.implementGameLogic = function () 
	{ 
		if (this.m_counter > 0)
			this.m_counter++;
		
		if (this.m_counter > this.m_msTime)
			this.m_counter = 0;
	}  

	ChTimer.prototype.reset = function () 
	{ 
		this.m_counter = -1;
	}
	
	ChTimer.prototype.start = function () 
	{ 
		this.m_counter = 1;
	}

	ChTimer.prototype.endReached = function () 
	{ 
		return (this.m_counter == 0);
	}
	
	ChTimer.prototype.isReady = function () 
	{ 
		return (this.m_counter == -1);
	}
	
	ChTimer.prototype.hasStarted = function () 
	{ 
		return (this.m_counter >= 1);
	}
}



