 const adminauth = (req, res, next) => { // this is only for /admin if this not then not even a singline ,iddleware will execute
    const token = "xyz";
    const isAuthorised = token === "xyz";
    if (!isAuthorised) {
      res.status(401).send("stranger no acess");
    } else {
      next();
    }
  };
  const userauth = (req, res, next) => { // this is only for /admin if this not then not even a singline ,iddleware will execute
    const token = "xz";
    const isAuthorised = token === "xyz";
    if (!isAuthorised) {
      res.status(401).send("stranger no acess");
    } else {
      next();
    };
  };
  module.exports = {
    adminauth,
    userauth,
  };