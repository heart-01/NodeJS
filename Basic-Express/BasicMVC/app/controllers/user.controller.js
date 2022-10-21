const login = (req, res) => {
  if (req.body.remember === "remember") {
    // บันทึกลง cookie เก็บเอาไว้ใช้งาน
    req.session.remember = true;
    req.session.email = req.body.email;
    // req.sessionOptions.maxAge = 60000; // วันหมดอายุของ cookieSesseion
  }

  res.render("index", {
    title: `Logged in as ${req.body.email}`,
    isLoggedIn: true,
  });
};

const logout = (req, res) => {
  req.session = null;

  res.render("index", {
    title: "See you again later",
    isLoggedIn: false,
  });
};

const user = {
  login,
  logout,
};

export default user;
