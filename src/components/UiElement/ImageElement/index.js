import React from 'react';
import config from '../../../config';

function ImageElement({ source, alt = 'image', ...rest }) {
  return (
    <>
      <img src={`${config.IMAGE_URL}/${source}`} alt={alt} {...rest} />
    </>
  );
}

export default ImageElement;
