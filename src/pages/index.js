import React from "react"
import styled from "styled-components"
import WordCloud from "../components/WordCloud"
import Header from "../components/Header"

const Container = styled.div`
  margin: 1rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default function Home() {
  return (
    <Container>
      <Header headerText="React WordCloud" />
      <WordCloud />
    </Container>
  )
}
