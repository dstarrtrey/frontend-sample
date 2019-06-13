import React, { useState } from 'react';
import { images } from './static/images.json';
import PhotoGallery from './components/PhotoGallery';
import styled, { keyframes } from 'styled-components';

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 10% auto 10%;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`;
const ButtonContainer = styled.div`
  z-index: 1;
  font-size: 50px;
  height: 101%;
  width: 100%;
  background-color: white;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Button = styled.div`
  cursor: pointer;
  transition: .5s color linear;
  &:hover{
    color: #6f6f6f;
  }
`;
const Pics = styled.div`
  z-index: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition: ${props => props.transition};
  left: ${props => {
    const { moving, direction } = props;
    if (moving) {
      return direction === 'left' ? '100%' : '-100%';
    } else {
      return '0%';
    }
  }};
`;

function App() {
  const [ photoIndex, setPhotoIndex ] = useState(0);
  const TRANSITION_LENGTH = 500;
  const [ transition, setTransition ] = useState({
    moving: false,
    direction: 'right',
    transition: `left ${TRANSITION_LENGTH}ms ease-in-out`
  });

  const handleClick = (dir) => {
    setTransition({
      moving: true,
      direction: dir,
      transition: `left ${TRANSITION_LENGTH}ms ease-in-out`
    });
    setTimeout(function(){
      if (dir === 'left') {
        photoIndex > 0 
          ? setPhotoIndex(photoIndex - 1)
          : setPhotoIndex(images.length - 1); 
      } else {
        photoIndex !==  images.length - 1 
          ? setPhotoIndex(photoIndex + 1)
          : setPhotoIndex(0); 
      }
      setTransition({
        moving: false,
        direction: 'left',
        transition: `left 0ms ease-in-out`
      });
    }, TRANSITION_LENGTH)
  };

  return<>
    <h1>Photo Gallery</h1>
    <GalleryGrid>
      <ButtonContainer>
        <Button onClick={() => handleClick('left')}>-</Button>
      </ButtonContainer>
      <Pics
        moving={transition.moving}
        direction={transition.direction}
        transition={transition.transition}
      >
        <PhotoGallery
          images={images}
          setIndex={setPhotoIndex}
          index={photoIndex}
        />
      </Pics>
      <ButtonContainer>
        <Button onClick={() => handleClick('right')}>+</Button>
      </ButtonContainer>
    </GalleryGrid>
    <div>{photoIndex}</div>
  </>
}

export default App;
