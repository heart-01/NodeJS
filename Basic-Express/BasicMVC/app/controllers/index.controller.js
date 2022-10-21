const render = (req, res) => {
  let isLoggedIn = false;

  if (typeof req.session.remember !== "undefined") {
    isLoggedIn = req.session.remember;
  }

  // render ตาม path ที่ set ไว้ใน views แล้วนามสกุลไฟล์ไม่ต้องใส่ก็ได้ เพราะ set ไว้ใน views engine engine แล้ว
  res.render("index", {
    title: "Hello World",
    isLoggedIn,
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
