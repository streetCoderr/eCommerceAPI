const {UnauthorizedError} = require("../errors")

const checkPermission = (userId, user) => {
  if (String(userId) !== String(user.userId) && user.role != 'admin') 
    throw new UnauthorizedError("You dont have permission to view this route")
  return
}

module.exports = checkPermission