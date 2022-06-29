const generateTokenUser = (user) => ({
  userId: user._id,
  name: user.name,
  role: user.role
})

module.exports = generateTokenUser