const Order = require("../models/order");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const mockStripeAPI = async ({ amount, currency }) => {
  const client_secret = "comrade, you dey see wetin I dey see?";
  return { client_secret, amount };
};

const getAllOrders = async (req, res) => {
  res.send("getAllOrders");
};

const createOrder = async (req, res) => {
  const { items, tax, shippingFee } = req.body;
  if (!items || items.length < 1)
    throw new BadRequestError("Please provide the items for order");
  if (!tax || !shippingFee)
    throw new BadRequestError("please provide task and shipping fee");

  const orderItems = [];
  let subtotal = 0;
  for (const item of items) {
    const product = await Product.findOne({ _id: item.product });
    if (!product)
      throw new NotFoundError(`No product associated with id: ${item.product}`);
    const { name, price, image } = product;
    const singleItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: item.product
    };
    subtotal += item.amount * price;
    orderItems.push(singleItem);
  }

  const total = tax + shippingFee + subtotal;
  const paymentIntent = await mockStripeAPI({ amount: total, currency: "usd" });
  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
    orderItems,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getCurrentUserOrders = async (req, res) => {
  res.send("getCurrentUserOrders");
};

const getOrder = async (req, res) => {
  res.send("getOrder");
};

const updateOrder = async (req, res) => {
  res.send("updateOrder");
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  getCurrentUserOrders,
};
