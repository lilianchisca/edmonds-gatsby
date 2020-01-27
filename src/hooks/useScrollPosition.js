import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'

const windowGlobal = typeof window !== `undefined` && window

function getScrollPosition() {
  return { x: windowGlobal.pageXOffset, y: windowGlobal.pageYOffset }
}

export function useScrollPosition() {
  const [position, setScrollPosition] = useState(getScrollPosition())
  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollPosition(getScrollPosition())
    }, 1)
    windowGlobal.addEventListener(`scroll`, handleScroll)
    return () => windowGlobal.removeEventListener(`scroll`, handleScroll)
  }, [])
  return position
}

export function useScrollXPosition() {
  const { x } = useScrollPosition()
  return x
}

export function useScrollYPosition() {
  const { y } = useScrollPosition()
  return y
}
