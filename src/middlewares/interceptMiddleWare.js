const interceptMiddleWare = (req, res, next) => {
  // start count time
  console.time("start-req");
  const info = {
    method: req.method
  }
  console.log(info);
  console.log("Before handling request");
  //do critical time stuff

  next();

  console.log("After handling request");
  console.timeEnd("start-req");
  // end count time
};

module.exports = interceptMiddleWare;
