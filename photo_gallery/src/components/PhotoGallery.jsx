import React from 'react';
import Image from './Image';
import styled from 'styled-components';

const Gallery = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
`;

const PhotoGallery = props => {
  const { index, setIndex, images } = props;
  const prev = index === 0
    ? images.length - 1
    : index - 1;
  const next = index === images.length - 1
    ? 0
    : index + 1;

  return <Gallery>
    {/* <Image src={images[prev].image} caption={images[prev].caption}/> */}
    <Image src={images[index].image} caption={images[index].caption}/>
    {/* <Image src={images[next].image} caption={images[next].caption}/> */}
  </Gallery>;
};

export default PhotoGallery;