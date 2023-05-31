const router = require("express").Router();
const exchangeHistoryController = require("../controllers/exchangeHistoryController");
const auth = require("../middleware/auth");

router.get("/", auth, exchangeHistoryController.getUserExchangeHistory);
router.post("/", auth, exchangeHistoryController.createExchangeRecord);

module.exports = router;
