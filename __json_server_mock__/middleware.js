module.exports = (req, res, next) => {
  console.log(req.body);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "tomo" && req.body.password === "022059") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else return res.status(400).json({ message: "用户名或密码错误" });
  }
  next();
};
