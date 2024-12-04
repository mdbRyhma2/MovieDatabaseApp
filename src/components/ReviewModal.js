import React from 'react'

export default function ReviewModal() {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button> X </button>
        <div className='title'>
            <h4>Review</h4>
        </div>
        <div className='body'>

        </div>
        <div className='review-footer'>
            <button>Cancel</button>
            <button>Submit</button>
        </div>
      </div>
    </div>
  )
}
