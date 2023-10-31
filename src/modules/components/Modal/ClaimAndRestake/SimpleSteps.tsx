import React from 'react'

function SimpleSteps({ currentStep, numSteps }) {
  return (
    <ul className="steps">
      {new Array(numSteps).fill(0).map((_, i) => (
        // steps are 1-based indexing, so add 1 to current index to check active status
        <li className={i + 1 <= currentStep ? 'active' : ''} key={i} />
      ))}
    </ul>
  )
}

export default SimpleSteps
