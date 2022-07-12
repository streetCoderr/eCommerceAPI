const Order = require("../models/order");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const { checkPermission } = require("../utils")

const mockStripeAPI = async ({ amount, currency }) => {
  const client_secret = "comrade, you dey see wetin I dey see?";
  return { client_secret, amount };
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({orders, count: orders.length})
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
  const orders = await Order.find({user: req.user.userId})
  res.status(StatusCodes.OK).json({orders})
};

const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order)
    throw new NotFoundError(`No order associated with id: ${req.params.id}`)
  checkPermission(order.user, req.user)
  res.status(StatusCodes.OK).json({order})
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
