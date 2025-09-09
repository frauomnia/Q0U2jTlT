// tests/comments/integration/comments.delete.test.tsx
import { render, screen, within, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Comments } from '../../../components/Comments/Comments';

// Helpers
const rootTextarea = () => screen.getAllByPlaceholderText(/add a comment/i).pop()!;
const rootPostBtn = () => screen.getAllByRole('button', { name: /add a new comment/i }).pop()!;

function getRowByText(text: string): HTMLElement {
  const el = screen.getByText(text);
  const row = el.closest('div.cursor-pointer') as HTMLElement | null;
  if (!row) throw new Error(`Row not found for: ${text}`);
  return row;
}

// The delete onClick is bound to the <svg> (TrashIcon), not the button.
// So we must click the SVG inside the button within the row.
async function clickDeleteInRow(row: HTMLElement) {
  // Try to find the button, then its svg child
  const btn = within(row).getByRole('button'); // the small delete button at row’s right
  const svg = btn.querySelector('svg');
  if (!svg) throw new Error('TrashIcon <svg> not found inside delete button');
  await userEvent.click(svg as unknown as HTMLElement);
}

async function addRoot(text: string) {
  await userEvent.type(rootTextarea(), text);
  await userEvent.click(rootPostBtn());
  await screen.findByText(text);
}

async function addReplyUnder(parentText: string, childText: string) {
  const row = getRowByText(parentText);
  await userEvent.click(row); // opens inline reply editor beneath the row
  const editor = row.nextElementSibling as HTMLElement;
  const box = within(editor).getByPlaceholderText(/add a comment/i);
  await userEvent.type(box, childText);
  await userEvent.click(within(editor).getByRole('button', { name: /add a new comment/i }));
  await screen.findByText(childText);
}

describe('<Comments /> delete flows (no testids)', () => {
  it('deletes a child reply without removing the parent', async () => {
    render(<Comments />);

    // Arrange: Parent A with a child, plus another parent to disambiguate
    await addRoot('Parent A');
    await addRoot('Parent B');
    await addReplyUnder('Parent A', 'Child A1');

    // Act: delete the child under Parent A
    const childRow = getRowByText('Child A1');
    await clickDeleteInRow(childRow);

    // Assert: child gone, Parent A still present
    await waitForElementToBeRemoved(() => screen.queryByText('Child A1'));
    expect(screen.getByText('Parent A')).toBeInTheDocument();
    expect(screen.getByText('Parent B')).toBeInTheDocument();
  });

  it('deletes a root comment (with no children)', async () => {
    render(<Comments />);

    await addRoot('Lonely Parent');
    const row = getRowByText('Lonely Parent');

    await clickDeleteInRow(row);
    await waitForElementToBeRemoved(() => screen.queryByText('Lonely Parent'));

  });
});
