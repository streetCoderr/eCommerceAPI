const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  getCurrentUserOrders,
} = require("../controllers/orders_controller");
const { authorizer } = require("../middlewares")


router.route("/").get(authorizer('admin'), getAllOrders).post(createOrder);

router.route("/showMyOrders").get(getCurrentUserOrders);

router.route("/:id").get(getOrder).patch(updateOrder);

module.exports = router;
