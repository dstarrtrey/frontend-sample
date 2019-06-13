import React from 'react';
import styled from 'styled-components';

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2a2a2a;
`;

const Pic = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Caption = styled.p`
  position: absolute;
  font-size: 5vh;
  text-align: center;
  color: white;
  width: 90%;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  text-shadow: 2px 2px black;
`;

const Image = props => {
  return (
  <ImageDiv>
    <Pic src={props.src} alt={props.caption}/>
    <Caption>{props.caption}</Caption>
  </ImageDiv>
  );
};

export default Image;