
const getAllOrders = async (req, res) => {
  res.send("getAllOrders")
};

const createOrder = async (req, res) => {
  res.send("createOrder")
}

const getCurrentUserOrders = async (req, res) => {
  res.send("getCurrentUserOrders")
}

const getOrder = async (req, res) => {
  res.send("getOrder")
}

const updateOrder = async (req, res) => {
  res.send("updateOrder")
}


module.exports = {
  getAllOrders, createOrder, getOrder, updateOrder, getCurrentUserOrders
}