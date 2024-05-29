

const getMovies = (req, res) => {
  res.send("getMovies")
}

const createNewMovie = (req, res) => {
  res.send("createNewMovie")
}

const updateMovie = (req, res) => {
  res.send("updateMovie")
}

const deleteMovie = (req, res) => {
  res.send("deleteMovie")
}

export { getMovies, createNewMovie, updateMovie, deleteMovie }
