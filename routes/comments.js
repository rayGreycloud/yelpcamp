var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// COMMENTS ROUTES

// NEW COMMENT - shows form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// CREATE NEW COMMENT - add new comment to specific campground
router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
  if(err){
    console.log(err);
    res.redirect("/campgrounds");
  } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something went wrong!?!");
          console.log(err);
        } else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            req.flash("success", "New Comment Added.");
            res.redirect("/campgrounds/" + campground._id);
        }
      });
  }
  });  
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      req.flash("error", "Comment could not be found!?!");
      console.log(err);
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }    
  });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      req.flash("error", "Comment could not be Updated!");
      res.redirect("back");
    } else {
      req.flash("success", "Comment Updated.");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY COMMENT ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      console.log(err);
      req.flash("error", "Comment could not be Deleted!");
      res.redirect("back");
    } else {
      req.flash("success", "Comment Deleted.");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


module.exports = router;
