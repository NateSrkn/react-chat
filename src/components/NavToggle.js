import React from 'react'
import anime from 'animejs'

const NavToggle = ({ isOpen, setIsOpen }) => {
  
  const toggleNav = () => {
    if(!isOpen) {
      anime({
        targets: '#sidebar',
        width: '100%',
        left: '0',
        easing: 'linear',
        duration: '300',
        complete: setIsOpen(true)
      })
    } else {
      anime({
        targets: '#sidebar',
        width: '0',
        left: '-30px',
        easing: 'linear',
        duration: '300',
        complete: setIsOpen(false)
      })
    }
  }
  return (
    <div id="nav-toggle" className="nav-toggle" onClick={() => toggleNav()}>
      {!isOpen ? <i className="fas fa-bars"></i> : <i className="far fa-times-circle"></i>}
    </div>
  )
}

export default NavToggle