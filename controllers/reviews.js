const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review created");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted");
  res.redirect(`/listings/${id}`);
};
