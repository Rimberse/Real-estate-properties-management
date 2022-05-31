const db = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const getAdmin = async (Id_Admin, password) => {
  const rows = await db.query(
    `SELECT Id_Admin, password FROM Admin WHERE Id_admin="${Id_Admin}" AND password="${password}"`
  );

  let message;

  if (rows[0]) {
    message = "Admin has been logged successfully";
  } else {
    message = "Access denied";
  }

  return {
    message,
  };
};

const getUser = async (email, password) => {
  const rows = await db.query(`SELECT * FROM Users WHERE email="${email}"`);

  let message;

  if (!rows.length || !(await bcrypt.compare(password, rows[0].password))) {
    message = "Email/password incorrect";

    return {
      message,
    };
  } else {
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    const cookies = {
      expiresIn: new Date(
        Date.now() + process.env.COOKIES_EXPIRES * 24 * 3600 * 1000
      ),
    };

    const cookie = {
      user: "Registered_user",
      token,
      cookies,
    };

    message = "User has been logged in";

    return {
      userID: rows[0].id,
      message,
      cookie,
    };
  }
};

const createUser = async (email, password_ok) => {
  const rows = await db.query(`SELECT * FROM Users WHERE email="${email}"`);

  let message;

  if (rows[0]) {
    message = "Email has already been registered";

    return {
      message,
    };
  } else {
    const password = await bcrypt.hash(password_ok, 10);

    const result = await db.query(
      `INSERT INTO Users SET email="${email}", password="${password}"`
    );

    if (result.affectedRows) {
      message = "Registered successfully";

      return {
        message,
      };
    }
  }
};

const verifyUser = async (cookies) => {
  const decoded = jwt.verify(cookies.Registered_user, process.env.JWT_TOKEN);

  const rows = await db.query(`SELECT * FROM Users WHERE id="${decoded.id}"`);

  if (rows[0]) return rows[0];
};

const getPassword = async (user) => {
  const rows = await db.query(
    `SELECT email, password from Users WHERE email="${user.email}"`
  );

  let message;

  if (rows[0]) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: rows[0].email,
      subject: "Password recovery from Real Estate Managment System",
      html:
        "<p><b>Your login details for RSMS</b><br><b>Email: </b>" +
        rows[0].email +
        "<br><b>Password that has been encrypted : </b>" +
        rows[0].password +
        '<br><a href="http://localhost:3000/">Click here to login</a></p>',
    };

    // Gmail account used for sending out emails in case user has forgotten their password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const wrapedSendMail = async (mailOptions) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          message =
            "Your email and password have been sent successfully to your email";

          if (error) {
            console.log(error);
            resolve(false);
          } else {
            console.log("Email sent: " + info.response);
            resolve(true);
          }
        });
      });
    };

    await wrapedSendMail(mailOptions);
   
    return {
        message
    }
  } else {
    message =
      "A user with this email doesn't exist, please retry with the correct one";

    return {
      message,
    };
  }
};

module.exports = {
  getAdmin,
  getUser,
  createUser,
  verifyUser,
  getPassword,
};
