import React from "react"
import styled from "styled-components"
import "d3-transition"
import { select } from "d3-selection"
import ReactWordcloud from "react-wordcloud"
import { Resizable } from "re-resizable"

import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale.css"

// import words from "../words"

const WCContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
// clip-path: polygon(
//   49% 30%,
//   68% 34%,
//   88% 37%,
//   93% 65%,
//   70% 61%,
//   88% 92%,
//   38% 67%,
//   25% 63%,
//   19% 46%,
//   31% 38%
// );

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  background: "#E7EAED",
}

function WordCloud({ movieNodes, bciDict }) {
  let wordSizeMap = {}
  let isWordSizeMapActivated = false

  function getCallback(callback) {
    return function (word, event) {
      const element = event.target
      const text = select(element)
      let textEl = document.querySelectorAll("text")

      let arrTextEll = Array.from(textEl)
      // console.log("arrTextEll", arrTextEll)
      arrTextEll.forEach(el => {
        if (el.firstChild !== null) {
          if (bciDict[word.text].has(el.firstChild.data)) {
            console.log("dataChild==>>", el.firstChild.data)
            console.log("bciDict[word.text]", bciDict[word.text])
          }
        }
      })

      if (!isWordSizeMapActivated) {
        textEl.forEach(
          d =>
            (wordSizeMap[d.innerHTML] = window
              .getComputedStyle(d, null)
              .getPropertyValue("font-size"))
        )
        isWordSizeMapActivated = true
      }

      //--------------mouseover----------------------
      if (callback === "onWordMouseOver") {
        arrTextEll
          .filter(el => el.firstChild !== null)
          .filter(
            textChild => bciDict[word.text].has(textChild.firstChild.data)
            // bciDict[textChild.firstChild.data].has(word.text)
            // word.text.substr(0, 1) === textChild.firstChild.data.substr(0, 1)
          )
          .map(el => {
            el.style.fontSize = "300%"
            el.style.transitionDuration = "0.5s"
            return el
          })
        text.attr("text-decoration", "underline").attr("cursor", "pointer")

        text.on("click", () => {
          window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank")
        })

        arrTextEll
          .filter(el => el.firstChild !== null)
          .filter(
            textChild => !bciDict[word.text].has(textChild.firstChild.data)
            // !bciDict[textChild.firstChild.data].has(word.text)
            //  &&
            // bciDict[textChild.firstChild.data].length > 1
            // word.text.substr(0, 1) !== textChild.firstChild.data.substr(0, 1)
          )
          .map(el => {
            el.style.transitionDuration = "0.5s"
            el.style.opacity = "0.4"
            return el
          })
      }
      //--------------mouseleave----------------------
      if (callback === "onWordMouseOut") {
        arrTextEll
          .filter(el => el.firstChild !== null)
          .filter(
            textChild => bciDict[word.text].has(textChild.firstChild.data)
            // bciDict[textChild.firstChild.data].has(word.text)
            // word.text.substr(0, 1) === textChild.firstChild.data.substr(0, 1)
          )
          .map(el => {
            el.style.fontSize = wordSizeMap[el.firstChild.data]
            el.style.transitionDuration = "0.5s"
            return el
          })

        arrTextEll
          .filter(el => el.firstChild !== null)
          .filter(
            textChild => !bciDict[word.text].has(textChild.firstChild.data)
            // !bciDict[textChild.firstChild.data].has(word.text)
            // &&
            // bciDict[textChild.firstChild.data].length > 1
            // word.text.substr(0, 1) !== textChild.firstChild.data.substr(0, 1)
          )
          .map(el => {
            el.style.transitionDuration = "0.5s"
            el.style.opacity = "1"
            return el
          })

        text.attr("text-decoration", "none").attr("cursor", "none")
      }
    }
  }

  const callbacks = {
    // getWordTooltip: word => `"${word.text}" ${word.value} `,
    getWordTooltip: word => `"${word.tooltip}" `,
    onWordMouseOut: getCallback("onWordMouseOut"),
    onWordMouseOver: getCallback("onWordMouseOver"),
  }

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    deterministic: false,
    fontFamily: "impact",
    // fontSizes: [5, 60],
    fontSizes: [16, 64],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 1,
    rotationAngles: [0, 0],
    // rotations: 3,
    // rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
  }

  const size = [800, 600]
  // function WordCloud({ movieNodes }) {
  // console.log("movieNodes", movieNodes)
  return (
    <WCContainer>
      <Resizable style={resizeStyle}>
        <ReactWordcloud
          callbacks={callbacks}
          // words={words}
          words={movieNodes}
          size={size}
          options={options}
        />
      </Resizable>
    </WCContainer>
  )
}

export default WordCloud
