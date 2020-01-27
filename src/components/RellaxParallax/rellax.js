export default function Rellax(el, options) {
  const self = Object.create(Rellax.prototype)

  let posY = 0
  let screenY = 0
  let block = {}
  let pause = true

  // check what requestAnimationFrame to use, and if
  // it's not supported, use the onscroll event
  const loop =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      return setTimeout(callback, 1000 / 60)
    }

  // store the id for later use
  let loopId = null

  // Test via a getter in the options object to see if the passive property is accessed
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, `passive`, {
      get() {
        supportsPassive = true
        return true
      },
    })
    window.addEventListener(`testPassive`, null, opts)
    window.removeEventListener(`testPassive`, null, opts)
  } catch (e) {
    console.log(e)
  }

  // check what cancelAnimation method to use
  const clearLoop =
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    clearTimeout

  // check which transform property to use
  const transformProp =
    window.transformProp ||
    (function() {
      const testEl = document.createElement(`div`)
      if (testEl.style.transform === null) {
        const vendors = [`Webkit`, `Moz`, `ms`]
        // eslint-disable-next-line
        for (const vendor in vendors) {
          if (testEl.style[`${vendors[vendor]}Transform`] !== undefined) {
            return `${vendors[vendor]}Transform`
          }
        }
      }
      return `transform`
    })()

  // Default Settings
  self.options = {
    speed: -2,
    center: false,
    callback() {},
  }

  // User defined options (might have more in the future)
  if (options) {
    Object.keys(options).forEach(function(key) {
      self.options[key] = options[key]
    })
  }

  // The elements don't exist
  else {
    console.warn(`Rellax: The elements you're trying to select don't exist.`)
    return
  }

  // Get and cache initial position of all elements
  function cacheBlock() {
    block = createBlock(el) // eslint-disable-line
  }

  // Let's kick this script off
  // Build array for cached element values
  function init() {
    el.style.cssText = block.style

    block = null

    screenY = window.innerHeight
    setPosition() // eslint-disable-line

    cacheBlock()

    animate() // eslint-disable-line

    // If paused, unpause and set listener for window resizing events
    if (pause) {
      window.addEventListener(`resize`, init)
      pause = false
      // Start the loop
      update() // eslint-disable-line
    }
  }

  // We want to cache the parallax blocks'
  // values: base, top, height, speed
  // el: is dom object, return: el cache values
  function createBlock(element) {
    const dataPercentage = element.getAttribute(`data-rellax-percentage`)
    const dataSpeed = element.getAttribute(`data-rellax-speed`)
    const dataZindex = element.getAttribute(`data-rellax-zindex`) || 0
    const dataMin = element.getAttribute(`data-rellax-min`)
    const dataMax = element.getAttribute(`data-rellax-max`)

    // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
    // ensures elements are positioned based on HTML layout.
    //
    // If the element has the percentage attribute, the posY and posX needs to be
    // the current scroll position's value, so that the elements are still positioned based on HTML layout
    const wrapperPosY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    const elPosY = dataPercentage || self.options.center ? wrapperPosY : 0

    const blockTop = elPosY + element.getBoundingClientRect().top
    const blockHeight =
      element.clientHeight || element.offsetHeight || element.scrollHeight

    const blockWidth =
      element.clientWidth || element.offsetWidth || element.scrollWidth

    // apparently parallax equation everyone uses
    let percentageY =
      dataPercentage || (elPosY - blockTop + screenY) / (blockHeight + screenY)
    if (self.options.center) {
      percentageY = 0.5
    }

    // Optional individual block speed as data attr, otherwise global speed
    const speed = dataSpeed || self.options.speed

    const bases = updatePosition(percentageY, speed) // eslint-disable-line

    // ~~Store non-translate3d transforms~~
    // Store inline styles and extract transforms
    const style = element.style.cssText
    let transform = ``

    // Check if there's an inline styled transform
    const searchResult = /transform\s*:/i.exec(style)
    if (searchResult) {
      // Get the index of the transform
      const { index } = searchResult

      // Trim the style to the transform point and get the following semi-colon index
      const trimmedStyle = style.slice(index)
      const delimiter = trimmedStyle.indexOf(`;`)

      // Remove "transform" string and save the attribute
      if (delimiter) {
        transform = ` ${trimmedStyle.slice(11, delimiter).replace(/\s/g, ``)}`
      } else {
        transform = ` ${trimmedStyle.slice(11).replace(/\s/g, ``)}`
      }
    }

    return {
      baseX: bases.x,
      baseY: bases.y,
      top: blockTop,
      height: blockHeight,
      width: blockWidth,
      speed,
      style,
      transform,
      zindex: dataZindex,
      min: dataMin,
      max: dataMax,
    }
  }

  // set scroll position (posY, posX)
  // side effect method is not ideal, but okay for now
  // returns true if the scroll changed, false if nothing happened
  function setPosition() {
    const oldY = posY

    posY =
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop || window.pageYOffset

    if (oldY !== posY) {
      // scroll changed, return true
      return true
    }

    // scroll did not change
    return false
  }

  // Ahh a pure function, gets new transform value
  // based on scrollPosition and speed
  // Allow for decimal pixel values
  function updatePosition(percentageY, speed) {
    const result = {}
    const valueY = speed * (100 * (1 - percentageY))

    result.y = Math.round(valueY)

    return result
  }

  // Remove event listeners and loop again
  function deferredUpdate() {
    window.removeEventListener(`resize`, deferredUpdate)
    window.removeEventListener(`orientationchange`, deferredUpdate)
    window.removeEventListener(`scroll`, deferredUpdate)
    document.removeEventListener(`touchmove`, deferredUpdate)

    // loop again
    loopId = loop(update) // eslint-disable-line
  }

  // Loop
  function update() {
    if (setPosition() && pause === false) {
      animate() // eslint-disable-line

      // loop again
      loopId = loop(update)
    } else {
      loopId = null

      // Don't animate until we get a position updating event
      window.addEventListener(`resize`, deferredUpdate)
      window.addEventListener(`orientationchange`, deferredUpdate)
      window.addEventListener(
        `scroll`,
        deferredUpdate,
        supportsPassive ? { passive: true } : false
      )
      document.addEventListener(
        `touchmove`,
        deferredUpdate,
        supportsPassive ? { passive: true } : false
      )
    }
  }

  // Transform3d on parallax element
  function animate() {
    const percentageY = (posY - block.top + screenY) / (block.height + screenY)

    // Subtracting initialize value, so element stays in same spot as HTML
    const positions = updatePosition(percentageY, block.speed) // - blocks[i].baseX;
    let positionY = positions.y - block.baseY

    // The next two "if" blocks go like this:
    // Check if a limit is defined (first "min", then "max");
    // Check if we need to change the Y or the X
    // (Currently working only if just one of the axes is enabled)
    // Then, check if the new position is inside the allowed limit
    // If so, use new position. If not, set position to limit.

    // Check if a min limit is defined
    if (block.min !== null) {
      positionY = positionY <= block.min ? block.min : positionY
    }

    // Check if a max limit is defined
    if (block.max !== null) {
      positionY = positionY >= block.max ? block.max : positionY
    }

    const { zindex } = block

    // Move that element
    // (Set the new translation and append initial inline transforms.)
    const translate = `translate3d(0px,${positionY}px,${zindex}px) ${block.transform}`
    el.style[transformProp] = translate

    self.options.callback(positions)
  }

  self.destroy = function() {
    el.style.cssText = block.style

    // Remove resize event listener if not pause, and pause
    if (!pause) {
      window.removeEventListener(`resize`, init)
      pause = true
    }

    // Clear the animation loop to prevent possible memory leak
    clearLoop(loopId)
    loopId = null
  }

  // Init
  init()

  // Allow to recalculate the initial values whenever we want
  self.refresh = init

  return self
}
