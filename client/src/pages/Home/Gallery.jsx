import React from 'react'
import CircularGallery from './CircularGallery'

const Gallery = () => {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery bend={3} textColor="black-200" borderRadius={0.05} scrollEase={0.02}/>
    </div>
  )
}

export default Gallery
