
function SndManager()
{
	SndManager.prototype.initWith = function(_soundList, _soundPath, _callback_allLoadedAudio, _soundDisabled) 
	{
		msglog('INIT SOUND:initWith');
		this.m_soundDisabled = _soundDisabled;
		this.m_firstInit = false;
			
		if (_soundDisabled == false)
		{
			if (!createjs.Sound.initializeDefaultPlugins()) 
			{
				msglog('INIT SOUND: new createjs.Sound.initializeDefaultPlugins() not created.');
            }
			else
			{
				createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
				createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)); // add an event listener for when load is completed
				createjs.Sound.registerManifest(_soundList, _soundPath);
				msglog('INIT SOUND: ok');
			}
		}
		else
		{
			msglog('INIT SOUND: DISABLED BY USER');
		}

		// Finally, continue with program loading
		_callback_allLoadedAudio();
	}
	
	SndManager.prototype.soundLoaded = function(event)
	{
		msglog("Sound loaded id=" + event.id);
		if (event.id == 0)
			m_sndManager.play("0");

	}
			
	
	SndManager.prototype.initFirstSound = function(_id) 
	{
		if (this.m_firstInit == false)
		{
			this.play("0");
			this.m_firstInit = true;
		}
	}
	
	
	SndManager.prototype.play = function(_id) 
	{
		if (this.m_soundDisabled == false)
		{
console.log(" play2");
			//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
            var instance = createjs.Sound.play(_id, createjs.Sound.INTERRUPT_ANY, 0, 0, false, 1);
console.log(" play3");

            if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) 
			{
			console.log(" fail");	
				msglog("play sound fail id=" + _id);
				return; 
			}

			instance.addEventListener ("complete", function(instance) 
			{
				msglog("fin audio");
			});
		}
	}
	
	SndManager.prototype.stop = function(_id) 
	{
		if (this.m_soundDisabled == false)
		{
			createjs.Sound.stop(_id);
		}
			/*
		if ((this.m_soundDisabled == false || this.m_soundDisabled == false) && m_sndManager.m_arrAudio[_id] != null)
		{
			//m_sndManager.m_arrAudio[_id].stop();
			m_sndManager.m_arrAudio[_id].pause();
			if (this.m_context != null)
				m_sndManager.m_arrAudio[_id].currentTime = 0;
		}*/
	}

	SndManager.prototype.isPlaying = function(_id) 
	{
		/*
		if ((this.m_soundDisabled == false || this.m_soundDisabled == false) && m_sndManager.m_arrAudio[_id] != null)
		{
			return m_sndManager.m_arrAudio[_id].currentTime > 0;
		}*/
		
		return false;
	}
	
	SndManager.prototype.setLoop = function(_id, _infiniteLoop) 
	{
		/*
		if ((this.m_soundDisabled == false || this.m_soundDisabled == false) && m_sndManager.m_arrAudio[_id] != null)
		{
			m_sndManager.m_arrAudio[_id].loop = _infiniteLoop;
		}*/
	}
	
	SndManager.prototype.setVolume = function(_id, _volumePercent) 
	{
		/*
		if ((this.m_soundDisabled == false || this.m_soundDisabled == false) && m_sndManager.m_arrAudio[_id] != null)
		{
			m_sndManager.m_arrAudio[_id].volume = _volumePercent / 100;
		}*/
	}
	
}