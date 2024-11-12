const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");


router
.route("/")
//Index Route
.get(wrapAsync(listingController.index))
//Create Route
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.get("/rooms", wrapAsync(listingController.roomFilterListing));
router.get(
  "/iconicCities",
  wrapAsync(listingController.iconicCitiesFilterListing)
);
router.get(
  "/mountain",
  wrapAsync(listingController.mountainFilterListing)
);
router.get(
  "/castles",
  wrapAsync(listingController.castlesFilterListing)
);
router.get(
  "/amazing-pools",
  wrapAsync(listingController.amazingPoolsFilterListing)
);
router.get(
  "/camping",
  wrapAsync(listingController.campingFilterListing)
);
router.get(
  "/arctic",
  wrapAsync(listingController.arcticFilterListing)
);
router.get(
  "/farms",
  wrapAsync(listingController.farmsFilterListing)
);
router.get(
  "/domes",
  wrapAsync(listingController.domesFilterListing)
);
router.get(
  "/boats",
  wrapAsync(listingController.boatsFilterListing)
);
// router.get(
//   "/search",
//   wrapAsync(listingController.searchFilterListing)
// );

router
.route("/:id")
//show route
.get(wrapAsync(listingController.showListing))
  //update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
