import React from 'react';
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
  left: -102%;
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
  left: 102%;
  top: 0;
  width: 100%;
  height: 60vh;
`;

class PhotoGallery extends React.Component {
  state = {
    left: 0,
    isTouched: false,
    latestDrag: 0,
    velocity: 0,
    startX: 0,
    lastX: 0,
    originalOffset: 0,
    stoppingInterval: null,
  }
  
  handleStart = startX => {
    // Initializes a click/touch event
    const { stoppingInterval, left } = this.state;
    if (stoppingInterval !== null) {
      window.clearInterval(stoppingInterval);
    }
    this.setState({
      isTouched: true,
      latestDrag: Date.now(),
      startX,
      velocity: 0,
      originalOffset: left,
      stoppingInterval: null,
    });
  };
    
  handleMove = moveX => {
    const { isTouched, latestDrag, lastX, startX, originalOffset } = this.state;
    if (isTouched) {
      const currentTime = Date.now();
      const elapsed = currentTime - latestDrag;
      // Calculates velocity based on pixels moved / ms 
      const newVelocity = 20 * (moveX - lastX) / elapsed;
      const totalChange = moveX - startX - originalOffset;
      
      // If the swipe is more than it's container's width, next!
      if (totalChange < -800) {
        this.props.setIndex(this.props.index - 1);
      } //else if (totalChange > 800) {
      //   setIndex(index + 1);
      // }

      // Updates all values upon moving
      this.setState({
        left: totalChange,
        velocity: newVelocity,
        latestDrag: currentTime,
        lastX: moveX,
      });
    }
  };
  
  slidingAnimation = () => {
    const { left, isTouched, stoppingInterval, velocity } = this.state;
    const { index, images } = this.props;
    const prev = index === 0
      ? images.length - 1
      : index - 1;
    const next = index === images.length - 1
      ? 0
      : index + 1;
    if (!isTouched && left < -0.01) {
      // Increases velocity and left from negative values
      const newVelocity = velocity + 10 * 0.033;
      let newLeft = left + newVelocity;
      console.log('newVelocity', newVelocity, newLeft);
      if (newLeft < -800) {
        window.clearInterval(stoppingInterval);
        this.props.setIndex(next)
        newLeft = 0;
        this.setState({
          left: 0
        });
      } else if (newLeft > -5 && newLeft < 100) {
        window.clearInterval(stoppingInterval);
        this.setState({
          left: 0,
          velocity: 0,
          stoppingInterval: null,
          originalOffset: 0,
        });
      } else {
        this.setState({
          left: newLeft,
          velocity: newVelocity,
        })
      }
    } else if (!isTouched && left > 0.01) {
      const newVelocity = velocity - 10 * 0.033;
      let newLeft = left + newVelocity;
      console.log('newVelocity', newVelocity, newLeft);
      if (newLeft > 800) {
        window.clearInterval(stoppingInterval);
        this.props.setIndex(prev)
        newLeft = 0;
        this.setState({
          left: 0
        });
      } else if (newLeft > -100 && newLeft < 5) {
        window.clearInterval(stoppingInterval);
        this.setState({
          left: 0,
          velocity: 0,
          stoppingInterval: null,
          originalOffset: 0,
        });
      } else {
        this.setState({
          left: newLeft,
          velocity: newVelocity,
        })
      }
    }else if (!isTouched) {
      // Once the animation is done, resets all
      window.clearInterval(stoppingInterval);
      this.setState({
        left: 0,
        velocity: 0,
        stoppingInterval: null,
        originalOffset: 0,
      });
    }
  };

  handleEnd = () => {
    console.log('Handling End');
    this.setState({
      startX: 0,
      isTouched: false,
      stoppingInterval: window.setInterval(this.slidingAnimation.bind(this), 33)
    });
  };
  render() {
    const { index, setIndex, images } = this.props;

    // Prev and next are rendered for a fluid swipe transition
    const prev = index === 0
      ? images.length - 1
      : index - 1;
    const next = index === images.length - 1
      ? 0
      : index + 1;

    return <><Gallery left={this.state.left}>
      <Prev>
        <Image src={images[prev].image} caption={images[prev].caption}/>
      </Prev>
      <div
        onTouchStart={touchEvent => {
          touchEvent.preventDefault();
          this.handleStart(touchEvent.targetTouches[0].clientX)
        }}
        onMouseDown={mouseEvent => {
          mouseEvent.preventDefault();
          this.handleStart(mouseEvent.clientX)
        }}
        onTouchMove={touchEvent => this.handleMove(touchEvent.targetTouches[0].clientX)}
        onMouseMove={mouseEvent => this.handleMove(mouseEvent.clientX)}
        onTouchEnd={() => this.handleEnd()}
        onMouseUp={() => this.handleEnd()}
        onMouseLeave={() => this.handleEnd()}
      >
        <Current>
          <Image src={images[index].image} caption={images[index].caption}/>
        </Current>
      </div>
      <Next>
        <Image src={images[next].image} caption={images[next].caption}/>
      </Next>
      
    </Gallery>
    <h1>{this.state.left}</h1>
    </>;
  }
};

export default PhotoGallery;