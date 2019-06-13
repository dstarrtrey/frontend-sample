import React, { useState, useEffect } from 'react';
import Image from './Image';
import styled from 'styled-components';

const Gallery = styled.div.attrs(props => {
  return {
    style: {
      left: `${props.left}px`
    }
  }
})`
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
  const [ left, setLeft ] = useState(0);
  const [ isTouched, setIsTouched ] = useState(false);
  const [ latestDrag, setLatestDrag ] = useState(0);
  const [ velocity, setVelocity ] = useState(0);
  const [ startX, setStartX ] = useState(0);
  const [ lastX, setLastX ] = useState(0);
  const [ originalOffset, setOriginalOffset ] = useState(0);
  const [ width, setWidth ] = useState(0);
  const [ stoppingInterval, setStoppingInterval ] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [])

  const handleStart = startX => {
    // Initializes a click/touch event
    setIsTouched(true);
    setLatestDrag(Date.now());
    setStartX(startX);
    setVelocity(0);
    setOriginalOffset(left);
    console.log(startX);
  };
  
  const handleMove = moveX => {
    if (isTouched) {
      const currentTime = Date.now();
      const elapsed = currentTime - latestDrag;
      // Calculates velocity based on pixels moved / ms 
      const newVelocity = 20 * (moveX - lastX) / elapsed;
      const totalChange = moveX - startX - originalOffset;
      
      // If the swipe is more than it's container's width, next!
      if (totalChange < -(width * 0.8) || totalChange > (width * 0.8)) {

      }

      // Updates all values upon moving
      setLeft(totalChange);
      setVelocity(newVelocity);
      setLatestDrag(currentTime);
      setLastX(moveX);
    }
  };

  const handleEnd = event => {
    console.log('velocity', velocity);
    setStartX(0);
    setIsTouched(false);
    setStoppingInterval(window.setInterval(slidingAnimation, 33));    
  };

  const slidingAnimation = () => {
    if (!isTouched && left < -0.01) {
      // Inclreases velocity and left from negative values
      const newVelocity = velocity + 10 * 0.033;
      const newLeft = left + newVelocity;
      if (newLeft < -(width * 0.8)) {
        window.clearInterval(stoppingInterval);
        console.log('completed:', newLeft)
        // Next!
      }
      setVelocity(newVelocity);
      setLeft(newLeft);
    } else if (!isTouched && left > 0.01) {
      const newVelocity = velocity - 10 * 0.033;
      const newLeft = left - newVelocity;
      if (newLeft > (width * 0.8)) {
        window.clearInterval(stoppingInterval);
        console.log('completed:', newLeft)
        // Next!
      }
      setVelocity(newVelocity);
      setLeft(newLeft);
    }else if (!isTouched) {
      // Once the animation is done, resets all
      window.clearInterval(stoppingInterval);
      setLeft(0);
      setVelocity(0);
      setStoppingInterval(null);
      setOriginalOffset(0);
    }
  };

  // Prev and next are rendered for a fluid swipe transition
  const prev = index === 0
    ? images.length - 1
    : index - 1;
  const next = index === images.length - 1
    ? 0
    : index + 1;

  return <Gallery left={left}>
    <Prev>
      <Image src={images[prev].image} caption={images[prev].caption}/>
    </Prev>
    <Current
      onTouchStart={touchEvent => handleStart(touchEvent.targetTouches[0].clientX)}
      onMouseDown={mouseEvent => handleStart(mouseEvent.clientX)}
      onTouchMove={touchEvent => handleMove(touchEvent.targetTouches[0].clientX)}
      onMouseMove={mouseEvent => handleMove(mouseEvent.clientX)}
      onTouchEnd={() => handleEnd()}
      onMouseUp={() => handleEnd()}
      onMouseLeave={() => handleEnd()}
    >
      <Image src={images[index].image} caption={images[index].caption}/>
    </Current>
    <Next>
      <Image src={images[next].image} caption={images[next].caption}/>
    </Next>
  </Gallery>;
};

export default PhotoGallery;