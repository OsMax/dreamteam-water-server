const { VERIFY_PATH, FORGOT_PASSWORD_PATH } = process.env;

const emailLetter = (email, verificationToken) => {
  const emailToVetification = {
    to: email,
    subject: "Water tracker service registration",
    html: ` <div style="text-align: center;">
                    <h1>
                        Hellow!<br/>
	                    Welcome to "Tracker of water"
                    </h1>
                    <a href="${VERIFY_PATH}/${verificationToken}"><h2>
                        Click here to complete registration
                    </h2></a>
                </div>`,
  };
  return emailToVetification;
};

const passwordLetter = (email, verificationToken) => {
  const emailToPassword = {
    to: email,
    subject: "Water tracker service registration",
    html: ` <div style="text-align: center;">
                    <h1>
                        Hellow!<br/>
	                    It's "Tracker of water"
                      You forgot your password.
                    </h1>
                    <a href="${FORGOT_PASSWORD_PATH}/${verificationToken}"><h2>
                        Click here to recover it!
                    </h2></a>
                </div>`,
  };
  return emailToPassword;
};

module.exports = { emailLetter, passwordLetter };
