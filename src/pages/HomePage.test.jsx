import HomePage from './HomePage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('HomePage', () => {
  let user;
  let inputElement;

  beforeEach(() => {
    render(<HomePage />);
    user = userEvent.setup();
    inputElement = screen.getByRole('textbox', { name: 'New task' });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('renders the title', () => {
    const title = screen.getByRole('heading', { name: 'Todo List' });
    expect(title).toBeInTheDocument();
  });

  test('renders the input', () => {
    expect(inputElement).toBeInTheDocument();
  });

  test('allows us to add a todo item', async () => {
    await user.type(inputElement, 'buy milk');
    await user.type(inputElement, '{Enter}');
    const todoItem = screen.getByRole('listitem', { text: 'buy milk' });
    expect(todoItem).toBeInTheDocument();
  });

  test('allows us to delete a todo item', async () => {
    await user.type(inputElement, 'buy choc');
    await user.type(inputElement, '{Enter}');

    await user.type(inputElement, 'buy magazine');
    await user.type(inputElement, '{Enter}');

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete todo' });
    await user.click(deleteButtons[0]);

    const todoItems = screen.queryAllByRole('listitem');
    expect(todoItems).toHaveLength(1);
  });
});
