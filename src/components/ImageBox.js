import React from 'react';
import ImageGallery from 'react-image-gallery';

export default class ImageBox extends React.Component {
 handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }

  render() {


    return (
      <div>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.props.images}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}/>
      </div>
    );
  }
}
