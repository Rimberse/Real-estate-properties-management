// Using dependencies
const express = require("express");
const cors = require("cors");                                     // used to communicate with a backend from another URL
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config({ path: "../.env" });
const properties = require("./services/properties");
const authentication = require("./services/authentication");
const tours = require("./services/tours");

// Logging requests
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---------------------");
  next();
};

app.use(requestLogger);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  response.status(statusCode).json({ message: error.message });
  return;
});

const realProperties = [
  {
    id: 1,
    address: "123 rue de Machin, Villejuif",
    owner: "Jessy VY",
    type: "Maison",
    bedrooms: 5,
    surface: "110 m2",
    state: "neuf",
    price: 399000,
    availabilityDate: new Date("07/15/2022").toDateString(),
    city: "Villejuif",
    parkingLots: 2,
  },
  {
    id: 2,
    address: "457 boulevard de Bidul, Paris 75016",
    owner: "Meryem KOSE",
    type: "Appartement",
    bedrooms: 3,
    surface: "80 m2",
    state: "neuf",
    price: 599000,
    availabilityDate: new Date("09/22/2022").toDateString(),
    city: "Paris 16eme",
    parkingLots: 1,
  },
  {
    id: 3,
    address: "987 avenue de tristesse, Rouen",
    owner: "Ratiba KADI",
    type: "Maison",
    bedrooms: 8,
    surface: "180 m2",
    state: "Bon etat",
    price: 250000,
    availabilityDate: new Date().toDateString(),
    city: "Rouen",
    parkingLots: 2,
  },
];

// POST admin credentials. Used to verify admin's access rights
app.post("/authentication/adminLogin", async (req, res, next) => {
  const { Id_Admin, password } = req.body;
  if (!Id_Admin || !password)
    return res.send({ message: "Please enter your id & password" });
  else {
    try {
      res.json(await authentication.getAdmin(Id_Admin, password));
    } catch (err) {
      console.log(`Error while checking admin credentials `, err.message);
      next(err);
    }
  }
});

// POST user credentials. Used to verify user's access rights
app.post("/authentication/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.send({ message: "Please enter your email & password" });
  else {
    try {
      const response = await authentication.getUser(email, password);

      if (response.cookie)
        res.cookie(
          response.cookie.user,
          response.cookie.token,
          response.cookie.cookies
        );

      res.json({ userID: response.userID, message: response.message });
    } catch (err) {
      console.log(`Error while checking user credentials `, err.message);
      next(err);
    }
  }
});

// POST user credentials for signing up. Used to create new user accounts
app.post("/authentication/signup", async (req, res, next) => {
  const { email, password: password_ok } = req.body;
  if (!email || !password_ok)
    return res.send({ message: "Please enter your email & password" });
  else {
    try {
      res.json(await authentication.createUser(email, password_ok));
    } catch (err) {
      console.log(`Error while signing up user `, err.message);
      next(err);
    }
  }
});

// TO implement later. Not used
app.get("/authentication/logOK", async (req, res, next) => {
  if (!req.cookies.Registered_user) return next();
  try {
    req.user = await authentication.verifyUser(req.cookies);
    return next();
  } catch (error) {
    if (error) return next();
  }
});

// POST user credentials. Used in case if the user has forgotten their credentials
app.post("/authentication/forgotPassword", async (req, res, next) => {
  const user = req.body;
  if (!user.email) return res.send({ message: "Please enter your email" });
  else {
    try {
      res.json(await authentication.getPassword(user));
    } catch (err) {
      console.log(`Error while retreiving user password `, err.message);
      next(err);
    }
  }
});

// GET request to logout. Used to end user session and logout users from the website
app.get("/authentication/logout", async (req, res, next) => {
  res.clearCookie("Registered_user");
  res.redirect("/");
});

// Entry page
app.get("/", (request, response) => {
  response.send("<h1>Real estate agency</h1>");
});

// GET total number of properties in db. Used to calculate number of pages
app.get("/api/properties/total", async (request, response, next) => {
  try {
    response.json(await properties.getAll());
  } catch (error) {
    console.log(
      `Error while getting total number of properties `,
      error.message
    );
    next(error);
  }
});

// GET real estate properties. Used to get the list of all properties
app.get("/api/properties", async (request, response, next) => {
  try {
    response.json(await properties.getMultiple(request.query.page));
  } catch (error) {
    console.error(`Error while getting properties `, error.message);
    next(error);
  }
});

// POST real estate property. Used to add new property to db
app.post("/api/properties", async (request, response, next) => {
  try {
    response.json(await properties.create(request.body));
  } catch (error) {
    console.error(`Error while creating property `, error.message);
    next(error);
  }
});

// PUT real estate property. Used to update informations of existing property in db
app.put("/api/properties/:id", async (request, response, next) => {
  try {
    response.json(await properties.update(request.params.id, request.body));
  } catch (error) {
    console.error(`Error while updating property `, error.message);
    next(error);
  }
});

// DELETE real estate property. Used to remove an existing property from the list (front) and from the db
app.delete("/api/properties/:id", async (request, response, next) => {
  try {
    response.json(await properties.remove(request.params.id));
  } catch (error) {
    console.error(`Error while deleting property `, error.message);
    next(error);
  }
});

// GET all house tours. Used to retrieve all bookings made by clients
app.get("/api/houseTours", async (request, response, next) => {
  try {
    response.json(await tours.getMultiple(request.query.page));
  } catch (error) {
    console.error(`Error while getting house tours `, error.message);
    next(error);
  }
});

// POST a house tour. Used to book house tours
app.post("/api/houseTours", async (request, response, next) => {
  try {
    response.json(await tours.create(request.body));
  } catch (error) {
    console.error(`Error while creating a house tour `, error.message);
    next(error);
  }
});

// sends a json response if no associate route is found e.g: (/something/somewhere)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
