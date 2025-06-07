import { render, screen } from '@testing-library/react';
import { CategoryListItem } from '../CategoryListItem';

describe('CategoryListItem', () => {
  const props = {
    icon: 'icon.svg',
    title: 'Test Title',
    description: 'Test description text',
  };

  test('рендерится без ошибок', () => {
    render(<CategoryListItem {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  test('отображает иконку с корректным src', () => {
    render(<CategoryListItem {...props} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', props.icon);
  });
});
