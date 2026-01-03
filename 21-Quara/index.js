const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");
const mo = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(mo("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "manish_maurya",
    content:
      "Just finished building a basic CRUD app with Express and EJS. Starting to finally enjoy backend.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
  {
    id: uuidv4(),
    username: "rahul_dev",
    content:
      "Spent the whole evening debugging a POST request issue. Turns out it was the form action path.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: uuidv4(),
    username: "neha_codes",
    content:
      "Learning RESTful routing today. GET, POST, PATCH finally making sense.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    id: uuidv4(),
    username: "arjun.tech",
    content:
      "Small wins matter. Successfully implemented edit and update functionality without breaking everything.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("form.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content, img } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content, img });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

const port = 8080;
app.listen(port, () => {
  console.log("listing to App...");
});
