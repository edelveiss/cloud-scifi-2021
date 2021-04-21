import React, { useState, useEffect } from "react"
import styled from "styled-components"
import WordCloud from "../components/WordCloud"
import Header from "../components/Header"
import { renameMovieKeys } from "../utils"

import { graphql } from "gatsby"

export const query = graphql`
  query {
    allMoviesCsv {
      nodes {
        id
        Cover
        Description
        Name_of_the_Movie
        Year
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
  const [movieNodes, setMovieNodes] = useState(data.allMoviesCsv.nodes)

  useEffect(() => {
    setMovieNodes(renameMovieKeys(movieNodes))
  }, [])

  return (
    <Container>
      <Header headerText="Movie WordCloud" />
      <WordCloud movieNodes={movieNodes} />
    </Container>
  )
}
