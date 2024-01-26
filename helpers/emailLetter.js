const { VERIFY_PATH } = process.env;

const emailLetter = (email, verificationToken) => {
  const emailToVetification = {
    to: email,
    subject: "Contacts service registration",
    html: ` <div style="    text-align: center;">
                    <h1>
                        Hellow!<br/>
	                    Welcome to "Contacts service"
                    </h1>
                    <a href="${VERIFY_PATH}/${verificationToken}"><h2>
                        Click here to complete registration
                    </h2></a>
                </div>`,
  };
  return emailToVetification;
};

module.exports = emailLetter;
