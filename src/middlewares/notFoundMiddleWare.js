const pageNotFoundMiddleware = (req, res, next) => {
  res.status(404).send("<h1>Page is not found</h1>")
}

const endPointNotFoundMiddleware = (req, res, next) => {
  res.status(404).send({ statusCode: 404, message: "API endpoint Not found"})
}

module.exports = {
  pageNotFoundMiddleware,
  endPointNotFoundMiddleware
}