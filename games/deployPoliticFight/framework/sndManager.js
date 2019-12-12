
function SndManager()
{
	SndManager.prototype.initWith = function(urlList, urlListClassic, _callback_allLoadedAudio, _soundDisabled) 
	{
		msglog('INIT SOUND:initWith');
		
		this.m_context = null;
		this.m_arrAudio = new Array();
		this.m_soundDisabled = _soundDisabled;
		this.m_urlList = urlList;
		this.m_urlListClassic = urlListClassic;
		
		if (_soundDisabled == false)
		{
			this.m_context  = window.AudioContext || window.mozAudioContext;
			//var _ctx  = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
			msglog('this.m_context');

			if (typeof AudioContext !== "undefined") {
				this.m_context = new AudioContext();
				msglog('INIT SOUND: new AudioContext()');
			} /*else if (typeof webkitAudioContext !== "undefined") {
				this.m_context = new webkitAudioContext();
				msglog('INIT SOUND: new webkitAudioContext()');
			} */
			/*
			if (this.m_context == null)
				this.m_context = new AudioContext();
			else
			{
				this.m_context = new AudioContext();		
				msglog('INIT SOUND: NOT SUPPORTED');
			}*/
			
			if (this.m_context != null)
			{	
				this.m_arrAudioStram = new Array();
				this.m_loading = 0;
				this.m_gainNode = this.m_context.createGain();
				this.m_gainNode.connect(this.m_context.destination);
			}
			else
			{
				msglog('INIT SOUND: new AudioContext() not created.');
			}
		}
		else
		{
			msglog('INIT SOUND: DISABLED BY USER');
		}

		// Finally, continue with program loading
		this.onLastLoad = _callback_allLoadedAudio;
	}
	
	SndManager.prototype.loadAudiosClasicMode = function() 
	{
		var tmpAudio = null;
		var tmpDummyAudio = document.getElementById("dummy");
		msglog('loadAudiosClasicMode');
		for	(var i=0; i < this.m_urlListClassic.length; i++)
		{
			tmpAudio = document.getElementById("id" + this.m_urlListClassic[i]);
			msglog(tmpAudio);
			
			if (tmpAudio != null)
				this.m_arrAudio.push(tmpAudio);
			else
				this.m_arrAudio.push(tmpDummyAudio);
		}
	}
	
	SndManager.prototype.loadBuffer = function(url, index) 
	{
		var loader = this;

		var audio = document.createElement("audio");
		audio.addEventListener("canplay", function () 
		{
			// Crear stream a partir del audio y agregarlo a la coleccion.
			var streamingAudioSource = loader.m_context.createMediaElementSource(this);
				
			loader.m_arrAudio.push(this);
			loader.m_arrAudioStram.push(streamingAudioSource);

			// Asociar audio a un gain node.
			streamingAudioSource.connect(loader.m_gainNode);
			
			msglog(this);
			
			// Seguir cargando el resto de los audios.
			loader.m_loading++;
			if (loader.m_loading >= loader.m_urlList.length)
			{
				if (loader.onLastLoad != null)
				{
					msglog('ALL SOUND LOADED');
					loader.onLastLoad();
				}
			}
			else
			{
				loader.loadBuffer(loader.m_urlList[loader.m_loading], loader.m_loading);
			}
			
		}, false);

		audio.src = url;
		audio.id = "mID" + index;
		msglog('Loading:' + url);
	}

	SndManager.prototype.load = function() 
	{
		msglog('load');
		if (this.m_context != null)
		{
			msglog('Load context = 	:' + this.m_context);
			if (this.m_urlList.length > 0)
				this.loadBuffer(this.m_urlList[0], 0);
		}
		else
		{
			// Fallback to traditional audio
			this.loadAudiosClasicMode();
				
			this.onLastLoad();
		}
	}

	SndManager.prototype.play = function(_id) 
	{
		if (this.m_context != null || this.m_soundDisabled == false)
		{
			m_sndManager.m_arrAudio[_id].play();
		}
	}
	
	SndManager.prototype.stop = function(_id) 
	{
		
		if (this.m_soundDisabled == false)
		{
			m_sndManager.m_arrAudio[_id].pause();
			//if (this.m_context != null)
			//	m_sndManager.m_arrAudio[_id].currentTime = 0;
		}
	}

	SndManager.prototype.isPlaying = function(_id) 
	{
		if (this.m_context != null && this.m_soundDisabled == false)
		{
			return m_sndManager.m_arrAudio[_id].currentTime > 0;
		}
		
		return false;
	}
	
	SndManager.prototype.setLoop = function(_id, _infiniteLoop) 
	{
		if (this.m_context != null && this.m_soundDisabled == false)
		{
			m_sndManager.m_arrAudio[_id].loop = _infiniteLoop;
		}
	}
	
	SndManager.prototype.setVolume = function(_id, _volumePercent) 
	{
		if (this.m_context != null && this.m_soundDisabled == false)
		{
			m_sndManager.m_arrAudio[_id].volume = _volumePercent / 100;
		}
	}
	
	SndManager.prototype.initPanner = function(_audioId) 
	{
		/*
		// Hook up the audio graph for this sample.
		var m_panner = m_sndManager.m_context.createPanner();
		m_panner.coneOuterGain = 0.01;
		m_panner.coneOuterAngle = 50;
		m_panner.coneInnerAngle = 0;

		// Set the panner node to be at the origin looking in the +x
		// direction.
		m_panner.connect(m_sndManager.m_context.destination);
		m_sndManager.m_arrAudioStram[_audioId].connect(m_panner);
		//m_sndManager.m_arrAudio[_audioId].loop = true;
		
		//this.m_panner.setPosition(0,0,-0.5);
		//this.changePosition(this.point);
		//this.changeOuterAngle(0);
		//this.changeAngleHelper(0);
		*/
	}

}