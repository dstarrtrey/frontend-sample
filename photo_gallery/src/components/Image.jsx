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
  font-size: 40px;
  color: white;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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