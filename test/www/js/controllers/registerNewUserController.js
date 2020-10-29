function registerNewUser()
{
	const username = document.querySelector('#ctrlUsernameReg').value;
	const password = document.querySelector('#ctrlPasswordReg').value;
  
	if (username === '' || password === '') 
	{
		ons.notification.alert('ERROR: User and pass are mandatory.');
	} 
	else 
	{
		var userModel = new UserModel();

		userModel.findUserByName
		(
			username, 
			function(_userEntity) 
			{ 
				if (_userEntity !== null)
				{
					ons.notification.alert('ERROR: User already exist.');
				}
				else
				{
					var newUser = new UserEntity();
					newUser.init("0", username, password, "req1", "anw1");

					userModel.addUser
					(
						newUser,
						function(_result)
						{
							ons
							.notification.alert('User registered.')
							.then(
								function(name) 
								{
									onsenNavigateTo("loginView.html");
								}
							);
						},
						function(_result)
						{
							ons.notification.alert("ERROR: " + _result);
						}
					);
				}
			},
			function(_result) 
			{
				appLog("login, " + _result); 
			}
		);
	}
}

function cancelRegistration()
{
	onsenNavigateTo("loginView.html");
}
