import { describe, expect, test as it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from 'solid-testing-library';
import { getRequestSpy } from '../setupVitest';
import { App } from './app';

describe('user app', () => {
  const waitForInitialRequests = async () => {
    await waitFor(() =>
      expect(getRequestSpy('200 GET /api/people/1/')).toHaveBeenCalledTimes(1),
    );
  };

  it('should fetch data', async () => {
    const initialProps = {};
    const { unmount } = render(() => <App {...initialProps} />);

    await waitForInitialRequests();
    expect(screen.getByTestId('userData')).toMatchSnapshot();

    fireEvent.input(screen.getByPlaceholderText('Enter Numeric Id'), {
      target: {
        value: '2',
      },
    });

    await waitFor(() =>
      expect(getRequestSpy('200 GET /api/people/2/')).toHaveBeenCalledTimes(1),
    );
    expect(screen.getByTestId('userData')).toMatchSnapshot();
    unmount();
  });
});
