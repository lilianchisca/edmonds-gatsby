import { useState, useEffect, useRef } from 'react'
import throttle from 'lodash/throttle'

const windowGlobal = typeof window !== `undefined` && window

export default function useScrollDirection() {
  const scrollPos = useRef(0)
  const [direction, setDirection] = useState({
    isDown: false,
    isUp: false,
  })

  useEffect(() => {
    const handleScroll = throttle(() => {
      setDirection({
        isDown: windowGlobal.pageYOffset > scrollPos.current,
        isUp: windowGlobal.pageYOffset < scrollPos.current,
      })
      scrollPos.current = windowGlobal.pageYOffset
    }, 100)

    windowGlobal.addEventListener(`scroll`, handleScroll)
    return () => windowGlobal.removeEventListener(`scroll`, handleScroll)
  }, [])

  return direction
}
