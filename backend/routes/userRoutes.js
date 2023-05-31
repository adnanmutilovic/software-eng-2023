const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", auth, userController.getUserProfile);
router.put("/profile", auth, userController.updateUserProfile);
router.get("/favorites", auth, userController.getFavoriteCurrencies);
router.delete("/favorites/:currencyId", auth, userController.removeCurrencyFromFavorites);

module.exports = router;
