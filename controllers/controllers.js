// VIEW CONTROLLER

var ObjectId = require("mongodb").ObjectId;


module.exports = {
  index: function (app, req, res) {
    return res.render("index", {
      title: "Welcome",
      message: "Demo Node Site."
    });
  },

  main: function (app, req, res) {

    return res.render("studentinfo", {
      title: "Welcome",
      message: "Demo Node Site."
    });
  },

  viewAll: function (app, req, res) {
    console.info("View All controller");
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        console.dir(docs)
        if (err) {
          console.error(err);
        }
        return res.render("viewAll", {
          title: "All Films",
          films: docs
        });
      });
  },

  viewAllJSON: function (app, req, res) {
    console.info("View All JSON controller");
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        res.json(docs);
      });
  },
  viewOne: function (app, req, res) {
    console.info("Get Item controller");
    let ID = req.params.ID;
    var o_id = new ObjectId(ID);

    app
      .set("myDb")
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        return res.render("viewOne", {
          title: `${docs[0].filmName}`,
          film: docs[0]
        });
      });
  },

  
};
