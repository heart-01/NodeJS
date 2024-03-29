const render = (req, res) => {
  res.render("index", {
    title: "Hello World",
    username: req.user ? req.user.username : "", // Passport จะแนบ data user ให้เข้ามาที่ req ให้ตลอดเมื่อ login สำเร็จ
  });
};

// server-sent event stream
const pingServer = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  res.write("data: ping\n\n");

  // send a ping approx every 2 seconds
  const timer = setInterval(() => {
    res.write("data: ping\n\n");

    // this is the important part
    res.flush(); // บีบอัด response Buffer แล้วส่งออกไปยัง client
  }, 2000);

  res.on("close", () => clearInterval(timer));
};

const index = {
  render,
  pingServer,
};

export default index;
