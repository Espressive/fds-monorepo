import pt from 'prop-types';
import React, { useLayoutEffect, useRef } from 'react';
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu';

import { popperOverTrigger } from '../../shared/popperModifiers';

const propTypes = {
  items: pt.arrayOf(pt.object).isRequired,
};

const ActionsMenu = ({ trigger, items }) => {
  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  const triggerRef = useRef();

  useLayoutEffect(() => {
    if (triggerRef.current) {
      // console.warn(window.getComputedStyle(triggerRef.current)['float']);
    }
  });

  const menu = useMenuState({
    modal: true,
    placement: 'bottom-end',
    unstable_popperModifiers: [popperOverTrigger],
  });

  return (
    <>
      <MenuButton {...menu} {...trigger.props} ref={triggerRef}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </MenuButton>
      <Menu
        {...menu}
        aria-label='Menu'
        className='ui active dropdown'
        preventBodyScroll
      >
        <div
          className='menu transition visible'
          style={{ position: 'initial' }}
        >
          {items.map(({ content, ...rest }) => (
            <MenuItem
              {...menu}
              {...rest}
              as='div'
              className='item'
              key={content}
            >
              {content}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = propTypes;

export default ActionsMenu;
