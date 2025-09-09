import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Comments } from '../../components/Comments/Comments';

// helpers to always target the *root* composer at the bottom
const rootTextarea = () => {
  const all = screen.getAllByPlaceholderText(/add a comment/i);
  return all[all.length - 1];
};
const rootCommentBtn = () => {
  const all = screen.getAllByRole('button', { name: /add a new comment/i });
  return all[all.length - 1];
};

describe('<Comments /> nested reply without testids', () => {
  it('adds a reply under the correct parent (not another parent)', async () => {
    render(<Comments />);

    // 1) Create two root comments so we can disambiguate nesting
    await userEvent.type(rootTextarea(), 'Parent A');
    await userEvent.click(rootCommentBtn());
    await screen.findByText('Parent A');

    await userEvent.type(rootTextarea(), 'Parent B');
    await userEvent.click(rootCommentBtn());
    await screen.findByText('Parent B');

    // 2) Find Parent A's row
    const parentATextEl = await screen.findByText('Parent A');
    const parentARow = parentATextEl.closest('div.cursor-pointer') as HTMLElement;
    expect(parentARow).toBeTruthy();

    // 3) Click row to open the inline reply editor rendered as the *next sibling*
    await userEvent.click(parentARow);
    const replyEditor = parentARow.nextElementSibling as HTMLElement; // contains AddComment
    expect(replyEditor).toBeTruthy();

    // 4) Type the reply *inside that reply editor*
    const replyBox = within(replyEditor).getByPlaceholderText(/add a comment/i);
    await userEvent.type(replyBox, 'Child A1');
    const replyPost = within(replyEditor).getByRole('button', { name: /add a new comment/i });
    await userEvent.click(replyPost);

    // 5) After submit, children render as the *next sibling* after the reply editor (ml-8 container)
    await screen.findByText('Child A1'); 
    const parentARowAfter = (await screen.findByText('Parent A')).closest('div.cursor-pointer') as HTMLElement;
    const childrenContainer = parentARowAfter.nextElementSibling as HTMLElement; // .ml-8 div
    expect(childrenContainer).toBeTruthy();
    expect(within(childrenContainer).getByText('Child A1')).toBeInTheDocument();

    // 6) Sanity check the reply is NOT rendered under Parent B
    const parentBTextEl = await screen.findByText('Parent B');
    const parentBRow = parentBTextEl.closest('div.cursor-pointer') as HTMLElement;
    expect(parentBRow).toBeTruthy();

    const parentBReplyEditor = parentBRow.nextElementSibling as HTMLElement;        
    const parentBChildren = parentBReplyEditor
      ? (parentBReplyEditor.nextElementSibling as HTMLElement)
      : (parentBRow.nextElementSibling as HTMLElement); 

    if (parentBChildren) {
      expect(within(parentBChildren).queryByText('Child A1')).toBeNull();
    }
  });
});
