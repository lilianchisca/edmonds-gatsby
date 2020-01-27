import React, { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Rellax from './rellax'

const RellaxParallax = ({
  as = `div`,
  center,
  children,
  callback,
  percentage,
  speed = `-1`,
  zIndex,
  ...props
}) => {
  const rellaxEl = useRef(null)
  const rellaxInstance = useRef(null)
  const Tag = as
  const config = {}

  if (center) {
    config.center = true
  }

  if (typeof callback === `function`) {
    config.callback = callback
  }

  useLayoutEffect(() => {
    rellaxInstance.current = new Rellax(rellaxEl.current, config)

    return () => {
      rellaxInstance.current.destroy()
    }
  }, [config])

  return (
    <Tag
      ref={rellaxEl}
      data-rellax-percentage={percentage}
      data-rellax-speed={speed}
      data-rellax-zindex={zIndex}
      {...props}
    >
      {children}
    </Tag>
  )
}

RellaxParallax.propTypes = {
  as: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  callback: PropTypes.func,
  percentage: PropTypes.number,
  speed: PropTypes.string,
  zIndex: PropTypes.number,
}

export default RellaxParallax
