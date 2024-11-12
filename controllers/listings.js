const Listing = require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.locals.fetchCategory = [
    "mountain",
    "arctic",
    "farms",
    "amazing pools",
    "camping",
    "castles",
    "iconic cities",
    "rooms",
  ];
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not exists");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  // let response = await geocodingClient
  //   .forwardGeocode({
  //     query: req.body.listing.location,
  //     limit: 1,
  //   })
  //   .send();

  //   console.log(response.body.features[0].geometry);

  // let { title, description, image, price, loaction, country } = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(req.body.listing);

  let newListing = new Listing(req.body.listing);
  // newListing.geomatry = response.body.features[0].geometry;
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  console.log(newListing);
  // res.send("rfv");
  let savedListing = await newListing.save();
  console.log(savedListing);

  req.flash("success", "New Listing created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not exists");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};


//Filter listing Routes
module.exports.roomFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["rooms"];
  res.render("listings/index.ejs", { allListings });
};

module.exports.iconicCitiesFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["iconic cities"];
  res.render("listings/index.ejs", { allListings });
};

module.exports.mountainFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["mountain"];
  res.render("listings/index.ejs", { allListings });
};

module.exports.castlesFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["castles"];
  res.render("listings/index.ejs", { allListings });
};
module.exports.amazingPoolsFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["amazing pools"];
  res.render("listings/index.ejs", { allListings });
};
module.exports.campingFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["camping"];
  res.render("listings/index.ejs", { allListings });
};
module.exports.farmsFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["farms"];
  res.render("listings/index.ejs", { allListings });
};
module.exports.arcticFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["arctic"];
  res.render("listings/index.ejs", { allListings });
};
module.exports.domesFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["domes"];
  res.render("listings/index.ejs", { allListings });
};
module.exports.boatsFilterListing = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.locals.fetchCategory = ["boats"];
  res.render("listings/index.ejs", { allListings });
};
// module.exports.searchFilterListing = async (req, res, next) => {
//   const allListings = await Listing.find({});
//   let searchQuery = req.query.search;
//   res.locals.fetchCountry = searchQuery;
//   // res.render("listings/index.ejs", { allListings });
// };
