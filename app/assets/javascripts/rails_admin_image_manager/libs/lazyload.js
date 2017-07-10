
/**
 *
 * @param {Func} cb
 * @param {Object} options
 */
export default function Lazyload(cb, threshold = 120 ) {
  this.lastScroll = 0
  this.cb         = cb
  this.threshold  = threshold

  this._boundHandleScroll = this.handleScroll.bind(this)
}

/**
 * Add event listener
 */
Lazyload.prototype.start = function() {
  // Keep initial scroll position
  this.lastScroll = getScrollTop()
  window.addEventListener('scroll', this._boundHandleScroll)
}

/**
 * Remove event listener
 */
Lazyload.prototype.stop = function() {
  window.removeEventListener('scroll', this._boundHandleScroll)
}

/**
 * Handle scroll
 */
Lazyload.prototype.handleScroll = function(event) {

  if (!this.ticking) {

    window.requestAnimationFrame(() => {

      // Get current scroll position
      const currentScroll = getScrollTop()

      // If user has scrolled down and more than threshold
      if (currentScroll - this.lastScroll >= this.threshold) {

        // Execute callback
        this.cb.call()

        // Keep new milestone
        this.lastScroll = currentScroll
      }

      this.ticking = false

    })
  }

  this.ticking = true
}

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop
}
