import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Button from './';

describe('Button', () => {
  describe('default', () => {
    const testId = 'default';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(<Button data-testid={testId} />).container;
    });

    test('renders without any props', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <button> by default', () => {
      const button = screen.getByTestId(testId);
      // Make sure the actual DOM element type is BUTTON
      expect(button.tagName).toMatch('BUTTON');
      // Check that we also use the correct type for accessibility
      expect(button).toHaveAttribute('type', 'button');
      // Check that we do not use the redundant "role" attribute when the tag is BUTTON
      expect(button).not.toHaveAttribute('role');
    });
  });

  describe('as', () => {
    describe('<div />', () => {
      test('has correct a11y attributes', () => {
        const props = {
          as: 'div',
          'data-testid': 'as-div',
        };
        render(<Button {...props} />);

        const button = screen.getByTestId(props['data-testid']);

        // Should not have a type anymore, but SHOULD have a role
        expect(button).not.toHaveAttribute('type');
        expect(button).toHaveAttribute('role', 'button');
      });
    });

    describe('<a />', () => {
      test('has correct a11y attributes', () => {
        const props = {
          as: 'a',
          'data-testid': 'as-anchor',
          href: 'https://google.com',
        };

        render(<Button {...props} />);

        const button = screen.getByTestId(props['data-testid']);

        // Should not have either role or type if we render an anchor
        expect(button).not.toHaveAttribute('type');
        expect(button).not.toHaveAttribute('role');
        expect(button).toHaveAttribute('href', props.href);
        expect(button).not.toHaveAttribute('rel');
      });

      test('has secure rel attribute for external links', () => {
        const props = {
          as: 'a',
          'data-testid': 'as-anchor-target',
          href: 'https://google.com',
          target: '_blank',
        };

        render(<Button {...props} />);

        const button = screen.getByTestId(props['data-testid']);

        // Make sure we render the target
        expect(button).toHaveAttribute('target', props.target);
        // Make sure we have a secure rel attribute for a link with a target
        expect(button).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    describe('<Component />', () => {
      test('renders a React component', () => {
        const props = {
          as: Link,
          'data-testid': 'as-component',
          to: '/users',
        };

        const history = createMemoryHistory();

        render(
          <Router history={history}>
            <Button {...props} />
          </Router>
        );

        const button = screen.getByTestId(props['data-testid']);

        // Make sure this renders a link (from the Link component)
        expect(button.tagName).toMatch('A');
      });

      test.todo('sets a correct React ref when not rendering as a Component');
    });
  });

  describe('isBrandColor', () => {
    test.todo('Set up test for brand color from provider');
  });
});
