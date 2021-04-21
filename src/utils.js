export function renameMovieKeys(movieNodes) {
  const m = {
    Name_of_the_Movie: "text",
    Year: "value",
    Description: "tooltip",
    Cover: "info",
    id: "id",
  }

  function renameProperty(obj, fromKey, toKey) {
    obj[toKey] = obj[fromKey]
    delete obj[fromKey]
  }
  movieNodes.forEach(movie => {
    Object.keys(movie).map(k => renameProperty(movie, k, m[k]))
    movie.value = 2030 - Number(movie.value)
  })
  return movieNodes
}
