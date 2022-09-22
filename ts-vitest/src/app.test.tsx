import { describe, expect, test as it } from 'vitest';
import { render, fireEvent, screen } from 'solid-testing-library';
import { App } from './app';

describe('<TodoList />', () => {
  it('should fetch user data', () => {
    const { unmount } = render(() => <App />);

    unmount();
  });
});
