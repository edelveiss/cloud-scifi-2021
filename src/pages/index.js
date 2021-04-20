import React from "react"
import styled from "styled-components"
import WordCloud from "../components/WordCloud"
import Header from "../components/Header"
// import * as d3 from "d3"
// import movies from "../data/movies.csv"

const Container = styled.div`
  margin: 1rem auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default function Home() {
  // d3.csv(movies, function (movies) {
  //   console.log(movies)
  // })

  return (
    <Container>
      <Header headerText="Movie WordCloud" />
      <WordCloud />
    </Container>
  )
}
