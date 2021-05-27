import React from "react"
import styled from "styled-components"
import WordCloud from "../components/WordCloud"
import Header from "../components/Header"
// import { renameMovieKeys } from "../utils"

import { graphql } from "gatsby"

export const query = graphql`
  query {
    allMovies1Csv(filter: { Title: { ne: "" }, Name_of_BCI: { ne: "" } }) {
      edges {
        node {
          id
          Name_of_BCI
          Cover
          Description
          Year
          Title
        }
      }
    }
  }
`
const Container = styled.div`
  margin: 1rem auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default function Home({ data }) {
  // const [movieNodes, setMovieNodes] = useState(data.allMovies1Csv.edges)

  console.log("movieNodes", data.allMovies1Csv.edges)

  let dataDict = {}
  let bciDict = {}
  data.allMovies1Csv.edges.forEach(edge => {
    // var bciSet = new Set( edge.node.Name_of_BCI.split(/[\s,/]+/));
    edge.node.Name_of_BCI.split(/[\s,/]+/).forEach(wordEl => {
      const word = wordEl.toLowerCase()
      if (word !== "of" && word !== "the") {
        if (dataDict[word]) {
          dataDict[word] += 1
        } else {
          dataDict[word] = 1
        }
        edge.node.Name_of_BCI.split(/[\s,/]+/).forEach(association => {
          if (bciDict[word]) {
            bciDict[word].add(association.toLowerCase())
          } else {
            bciDict[word] = new Set([association.toLowerCase()])
          }
        })
      }
    })
  })

  let movieNodes = []
  // console.log("dataDict", dataDict)
  console.log("bciDict", bciDict)
  for (var key in dataDict) {
    movieNodes.push({ text: key, value: dataDict[key], tooltip: key })
  }

  return (
    <Container>
      <Header headerText="Movie WordCloud" />
      <WordCloud movieNodes={movieNodes} bciDict={bciDict} />
    </Container>
  )
}
