import React from 'react';
import Image from './Image';
import styled from 'styled-components';

const Gallery = styled.div`
  position: relative;
  width: 100%;
`;

const Prev = styled.div`
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 60vh;
`;

const Current = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
`;

const Next = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  width: 100%;
  height: 60vh;
`;

const PhotoGallery = props => {
  const { index, setIndex, images } = props;
  // Prev and next are rendered for a fluid swipe transition
  const prev = index === 0
    ? images.length - 1
    : index - 1;
  const next = index === images.length - 1
    ? 0
    : index + 1;

  return <Gallery>
    <Prev>
      <Image src={images[prev].image} caption={images[prev].caption}/>
    </Prev>
    <Current>
      <Image src={images[index].image} caption={images[index].caption}/>
    </Current>
    <Next>
      <Image src={images[next].image} caption={images[next].caption}/>
    </Next>
  </Gallery>;
};

export default PhotoGallery;