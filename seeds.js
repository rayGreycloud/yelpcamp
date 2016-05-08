var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cape Lookout State Park",
    image: "http://www.reserveamerica.com/webphotos/OR/pid402146/0/540x360.jpg",
    description: "Cape Lookout State Park can be reached by traveling an hour and a half west of Portland through the scenic Wilson River pass. Along the way stop and enjoy waterfalls, scenic views and some great fishing. A popular campground and day-use area, Cape Lookout is located on a sand spit between Netarts Bay and the ocean, giving you a terrific view of the ocean with easy access to the beach. Beachcombing is popular here, and the park is reputedly a good place to find glass floats. More than eight miles of hiking and walking trails wind through a lush old-growth forest."
  },
  
  {
    name: "Silver Falls State Park",
    image: "http://www.reserveamerica.com/webphotos/OR/pid402235/1/540x360.jpg",
    description: "People call it the “crown jewel” of the Oregon State Parks system, and once you visit, you know why. Silver Falls State Park is the kind of standout scenic treasure that puts Oregon firmly onto the national—and international—stage. Its beauty, boundless recreational opportunities and historic presence keep it there. Nestled in the foothills of Oregon’s Cascade Mountains, less than an hour east of the state capital of Salem, Oregon, the sprawling 9,200 acre property is the largest state park in Oregon, and one of the most popular."
  },
  
  {
    name: "Ecola State Park",
    image: "http://media.oregonlive.com/pacific-northwest-news/photo/ecola-state-park-57c1053637f7fdf4.jpg",
    description: "Wrapping around Tillamook Head between Seaside and Cannon Beach, Ecola State Park is a hiking and sightseeing mecca with a storied past. Trails for Explorers Ecola’s trails are situated above nine miles of Pacific Ocean shoreline known as Tillamook Head. They offer clifftop viewpoints that look out on picturesque seascapes, cozy coves, forested capes and even a long-abandoned offshore lighthouse. Hikes vary from short day hikes to extended roundtrip adventures with hike-in camping."
  }
];

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    } 
    console.log("All campgrounds removed from database.");

  // Add some campgrounds 
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else {
            console.log("Added a Campground");
            // Create seed comments
          /*  Comment.create(
              {
                text: "Bacon ipsum dolor amet meatloaf hamburger pork belly, short loin bresaola pork chop salami tri-tip ham capicola.",
                author: "Caesar"
              }, function(err, comment){
                  if(err){
                    console.log(err);
                  } else {
                      campground.comments.push(comment);
                      campground.save();
                      console.log("Created a new Comment.");
                  }
                  });*/
              }
             
           });
        });
        
    });
}


module.exports = seedDB;