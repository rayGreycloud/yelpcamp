var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: desc, author: author};
  Campground.create(newCampground, function(err, newCreate){
    if(err){
      console.log(err);
    } else {
        req.flash("success", "Campground Added.");
        res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");  
});

// SHOW - shows more info about specific campground
router.get("/:id", function(req, res){
  // find campground with ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
        // render show template with that campground
        res.render("campgrounds/show", {campground: foundCampground});        
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      req.flash("error", "Campground not found!?!");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      console.log(err);
      req.flash("error", "Campground could not be Updated!");
      res.redirect("/campgrounds");
    } else {
        req.flash("success", "Campground Updated.");
        res.redirect("/campgrounds/" + req.params.id); 
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      req.flash("error", "Campground could not be Deleted!");      
      res.redirect("/campgrounds/" + req.params.id);
    } else {
      req.flash("success", "Campground Deleted.");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
