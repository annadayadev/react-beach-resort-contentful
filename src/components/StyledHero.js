//with styled component
import React from "react";
import styled from "styled-components";
import defaultImg from "../images/room-2.jpeg";

// const orange = "#f15025";
// const SimpleButton = styled.button`
//   color: ${orange};
//   background: green;
//   font-size: 3rem;
// `;

const StyledHero = styled.header`
  min-height: 60vh;
  background: url(${defaultImg}) center/cover no repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;
//export default SimpleButton;
