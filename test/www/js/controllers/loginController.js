function login()
{
	const username = document.querySelector('#ctrlUsername').value;
	const password = document.querySelector('#ctrlPassword').value;
  
	if (username === 'admin' && password === 'admin') 
	{
		onsenNavigateTo(C_VIEW_PAGE_ID_MAIN_VIEW);
	} 
	else 
	{
		var userModel = new UserModel();

		userModel.findUserByName
		(
			username, 
			function(_userEntity) 
			{ 
				if (_userEntity !== null && _userEntity.getPassword() === password)
				{
					whoPaidApplication.getSession().setCurrentUser(_userEntity);
					onsenNavigateTo(C_VIEW_PAGE_ID_MAIN_VIEW);
				}
				else
					ons.notification.alert('ERROR: User or password incorrect.');
			},
			function(_result) 
			{
				appLog("login, " + _message); 
			}
		);
	}
}

function navigateToRegisterNewUser()
{
	onsenNavigateTo("registerNewUserView.html");
}

function forgotPass()
{
}