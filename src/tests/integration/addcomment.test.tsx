import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../../queries/comments', async () => {
  const actual = await vi.importActual<typeof import('../../queries/comments')>('../../queries/comments');
  return {
    ...actual,
    addComment: vi.fn().mockResolvedValue(123), // spy
  };
});

import { addComment } from '../../queries/comments';
import { AddComment } from '../../components/Comments/AddComment';

describe('<AddComment />', () => {
  it('submits root comment and clears input', async () => {
    render(<AddComment />);
    await userEvent.type(screen.getByPlaceholderText(/add a comment/i), 'Good job!');
    await userEvent.click(screen.getByRole('button', { name: /add a new comment/i }));
    await waitFor(() =>  expect(addComment).toHaveBeenCalledWith('Good job!', undefined));
    expect(addComment).toHaveBeenCalledTimes(1);
    expect(screen.getByPlaceholderText(/add a comment/i)).toHaveValue('');
  });

  it('submits with parentId and calls handleClose', async () => {
    const onClose = vi.fn();
    render(<AddComment parentId={7} handleClose={onClose} />);
    await userEvent.type(screen.getByPlaceholderText(/add a comment/i), 'Thanks!');
    await userEvent.click(screen.getByRole('button', { name: /add a new comment/i }));
    await waitFor(() =>  expect(addComment).toHaveBeenCalledWith('Thanks!', 7));
    expect(addComment).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
