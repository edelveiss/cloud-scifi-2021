import React from "react"
import styled from "styled-components"
import "d3-transition"
import { select } from "d3-selection"
import ReactDOM from "react-dom"
import ReactWordcloud from "react-wordcloud"
import { Resizable } from "re-resizable"

import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale.css"

import words from "../words"

const WCContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  background: "#E7EAED",
}

function getCallback(callback) {
  return function (word, event) {
    const isActive = callback !== "onWordMouseOut"
    const element = event.target
    const text = select(element)

    text
      .on("click", () => {
        if (isActive) {
          window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank")
        }
      })
      .transition()
      .attr("background", "white")
      .attr("font-size", isActive ? "300%" : "100%")
      .attr("text-decoration", isActive ? "underline" : "none")
  }
}

const callbacks = {
  getWordTooltip: word => `"${word.text}" ${word.value} `,
  onWordClick: getCallback("onWordClick"),
  onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOver: getCallback("onWordMouseOver"),
}

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
}

const size = [600, 400]
function WordCloud() {
  return (
    <WCContainer>
      <Resizable style={resizeStyle}>
        <ReactWordcloud
          callbacks={callbacks}
          words={words}
          size={size}
          options={options}
        />
      </Resizable>
    </WCContainer>
  )
}

export default WordCloud
