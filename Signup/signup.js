const express = require("express");
const Joi = require("joi");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






const Signupschema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-]+$/),
  confirm_pass: Joi.ref("password"),
});

app.get("/", (req, res) => {
  res.send("App started pash.");
});

app.post("/signup", (req, res) => {
  const { error, value } = Signupschema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    res.json("Successfull");
  }

  console.log(req.body);
});

const port = process.env.PORT || 4237;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
