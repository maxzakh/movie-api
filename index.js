const express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser");

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());

let Movies = [
    {
        title: "Office Space",
        director: "Mike Judge"
    },
    {
        title: "Old School",
        director: "Todd Phillips"
    },
    {
        title: "Young Frankenstein",
        director: "Mel Brooks"
    }
];

// GET requests
app.get("/", function (req, res) {
    res.send("Here are some of my favorite movies!");
});
app.get("/documentation", function (req, res) {
    res.sendFile("public/documentation.html", { root: __dirname });
});
app.get("/movies", function (req, res) {
    res.json(Movies);
});
app.get("/movies/:title", (req, res) => {
  res.json(Movies.find((movie) => {
      return movie.title === req.params.title
  }));
});
app.get("/movies/:director", (req, res) => {
    res.json(Movies.find((movie) => {
        return movie.director === req.params.director
    }));
}); 
// app.get("/users", (req, res) => {
//   res.send(“Successful GET request returning data on all the users”);
//  });

// POST requests
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
      const message = "Missing title in request body";
      res.status(400).send(message);
  } else {
      Movies.push(newMovie);
      res.status(201).send(newMovie);
  }
});

app.post("/users", (req, res) => {
    let newUser = req.body;
  
    if (!newUser.title) {
        const message = "Please create an account";
        res.status(400).send(message);
    } else {
        Users.push(newUser);
        res.status(201).send(newUser);
    }
  });

// Deletes a user from our list by ID
app.delete("/users/:id", (req, res) => {
    let user = users.find((user) => {
        return user.id === req.params.id
    });

    if (user) {
        users.filter(function(obj) {
            return obj.id !== req.params.id
        });
        res.status(201).send("user " + req.params.id + " was deleted")
    }
});

// listen for requests
app.listen(80, () =>
    console.log("Your app is listening on port 8080.")
);