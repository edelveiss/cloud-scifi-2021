import React from "react"
import styled from "styled-components"

const HeaderH1 = styled.h1`
  color: purple;
`
export default function Header(props) {
  return <HeaderH1>{props.headerText}</HeaderH1>
}
