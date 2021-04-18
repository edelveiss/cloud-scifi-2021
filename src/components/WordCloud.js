import React from "react"
import styled from "styled-components"
import "d3-transition"
import { select } from "d3-selection"
import * as d3 from "d3"
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
    // textEl.addEventListener("mouseover", event => {
    //   document.body.style.background = "blue"
    // })
    const isActive = callback === "onWordMouseOver"
    const isMouseOut = callback === "onWordMouseOut"
    const element = event.target
    const text = select(element)

    let textEl = document.querySelectorAll("text")

    text
      .on("click", () => {
        if (isActive) {
          window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank")
        }
      })
      .on("mouseover", () => {
        textEl.forEach(textChild => {
          if (
            word.text.substr(0, 1) === textChild.firstChild.data.substr(0, 1)
          ) {
            textChild.style.color = "red"
            textChild.style.fontSize = "50px"
            textChild.style.transitionDuration = "2s"
          }
        })
      })
      .on("mouseleave", () => {
        textEl.forEach(textChild => {
          if (
            word.text.substr(0, 1) === textChild.firstChild.data.substr(0, 1)
          ) {
            textChild.style.color = "blue"
            textChild.style.fontSize = "15px"
            textChild.style.transitionDuration = "2s"
          }
        })
      })
      .transition()
      .attr("background", "white")
      .attr("font-size", isActive ? "300%" : "100%")
      .attr("text-decoration", isActive ? "underline" : "none")
  }
}

const callbacks = {
  //   getWordColor: word => getColors(word),
  getWordTooltip: word => `"${word.text}" ${word.value} `,
  onWordClick: getCallback("onWordClick"),
  // onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOver: getCallback("onWordMouseOver"),
}
// const options = {
//   rotations: 1,
//   rotationAngles: [0, 0],
// }
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
