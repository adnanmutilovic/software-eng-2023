const router = require("express").Router();
const currencyController = require("../controllers/currencyController");

router.get("/list", currencyController.getCurrencyList);
router.get("/convert", currencyController.convertCurrency);

module.exports = router;
