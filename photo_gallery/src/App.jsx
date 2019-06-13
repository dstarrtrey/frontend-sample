import React, { useState } from 'react';
import { images } from './static/images.json';
import PhotoGallery from './components/PhotoGallery';
import styled from 'styled-components';

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 10% auto 10%;
  justify-items: center;
  align-items: center;
`;

const Button = styled.div`
  font-size: 50px;
  cursor: pointer;
  transition: .5s color linear;
  &:hover{
    color: #6f6f6f;
  }
`;

function App() {
  const [ photoIndex, setPhotoIndex ] = useState(0);

  return<>
    <h1>Photo Gallery</h1>
    <GalleryGrid>
      <Button onClick={() => {
        photoIndex > 0 
          ? setPhotoIndex(photoIndex - 1)
          : setPhotoIndex(images.length - 1); 
      }}>-</Button>

      <PhotoGallery
        images={images}
        setIndex={setPhotoIndex}
        index={photoIndex}
      />

      <Button onClick={() => {
        photoIndex !==  images.length - 1 
          ? setPhotoIndex(photoIndex + 1)
          : setPhotoIndex(0); 
      }}>+</Button>
    </GalleryGrid>
  </>
}

export default App;
