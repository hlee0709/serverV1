const fs = require("fs");

var posts = [];
var categories = [];

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/posts.json", (err, data) => {
      if (err) {
        reject("Unable to read posts");
      } else {
        posts = JSON.parse(data);
      }
    });
    fs.readFile("./data/categories.json", (err, data) => {
      if (err) {
        reject("Unable to read categories");
      } else {
        categories = JSON.parse(data);
      }
    });
    resolve();
  });
};

module.exports.getAllPosts = function () {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      reject("No posts to be displayed : Posts are empty");
    } else {
      resolve(posts);
    }
  });
};

module.exports.getPublishedPosts = function () {
  return new Promise((resolve, reject) => {
    var publishedPost = [];
    for (i = 0; i < posts.length; i++) {
      if (posts[i].published == true) {
        publishedPost.push(posts[i]);
      }
    }
    if (publishedPost.length === 0) {
      reject("No published post found");
    } else {
      resolve(publishedPost);
    }
  });
};

module.exports.getCategories = function () {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject("No categories found");
    } else {
      resolve(categories);
    }
  });
};
