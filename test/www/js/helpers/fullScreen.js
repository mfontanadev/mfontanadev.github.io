FullScreen.fullScreenApi = 
{ 
			supportsFullScreen: false,
			isFullScreen: function() { return false; }, 
			requestFullScreen: function() {}, 
			cancelFullScreen: function() {},
			fullScreenEventName: '',
			prefix: '',
			fullScreenElement: ''
};

FullScreen.browserPrefixes = 'webkit moz o ms khtml'.split(' ');

function FullScreen()
{
}

FullScreen.init = function(_fullScreenElement)
{
	FullScreen.fullScreenApi.fullScreenElement = _fullScreenElement;

	// check for native support
	if (typeof document.cancelFullScreen != 'undefined') 
	{
		FullScreen.fullScreenApi.supportsFullScreen = true;
	}
	else 
	{	
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = FullScreen.browserPrefixes.length; i < il; i++ ) 
		{
			FullScreen.fullScreenApi.prefix = FullScreen.browserPrefixes[i];
			
			if (typeof document[FullScreen.fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' )
			{
				FullScreen.fullScreenApi.supportsFullScreen = true;
				
				break;
			}
		}
	}
	
	// update methods to do something useful
	if (FullScreen.fullScreenApi.supportsFullScreen) 
	{
		FullScreen.fullScreenApi.fullScreenEventName = FullScreen.fullScreenApi.prefix + 'fullscreenchange';
		
		FullScreen.fullScreenApi.isFullScreen = function() 
		{
			switch (this.prefix) {	
				case '':
					return document.fullScreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		}
		FullScreen.fullScreenApi.requestFullScreen = function(el) 
		{
			appLog("prefix:" + FullScreen.fullScreenApi.prefix);
			if (typeof document.documentElement !== 'undefined' && getDeviceType() === "desktop")
			{
				appLog("requestFullScreen document:" +  document.documentElement);
				return document.documentElement.requestFullscreen();
			}
			else
			{
				appLog("requestFullScreen prefix:");
				return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
			}
		}
		FullScreen.fullScreenApi.cancelFullScreen = function(el)
		{
			appLog("prefix:" + FullScreen.fullScreenApi.prefix);
			if (typeof document.documentElement !== 'undefined' && getDeviceType() === "desktop")
			{
				appLog("cancelFullScreen document:");
				return document.exitFullscreen(); 
			}
			else
			{
				appLog("cancelFullScreen prefix:");
				return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
			}
		}		
	}

	// jQuery plugin
	if (typeof jQuery != 'undefined') {
		jQuery.fn.requestFullScreen = function() {
	
			return this.each(function() {
				var el = jQuery(this);
				if (FullScreen.fullScreenApi.supportsFullScreen) 
				{
					FullScreen.fullScreenApi.requestFullScreen(el);
				}
			});
		};
	}

	if (FullScreen.fullScreenApi.supportsFullScreen) 
	{
		appLog("prefix:" + FullScreen.fullScreenApi.prefix);
		appLog("YES: Your browser supports FullScreen");
	}
	else
	{
		appLog("NO: Your browser not supports FullScreen");
	}
};
