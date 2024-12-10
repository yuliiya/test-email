import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { SidebarItem } from './SidebarItem'; // Убедитесь, что путь к компоненту корректен

const text = 'Settings';
const icon = '🔧';

const defaultProps = {
  icon: <span>{icon}</span>,
  text: text,
  expanded: false,
  isActive: false,
  onClick: vi.fn(),
};

describe('SidebarItem', () => {
  it('renders icon and text correctly when expanded', () => {
    render(<SidebarItem {...defaultProps} expanded />);
    expect(screen.getByText(icon)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('renders icon and tooltip when not expanded', () => {
    render(<SidebarItem {...defaultProps} expanded={false} />);
    expect(screen.getByText(icon)).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('shows tooltip when not expanded and hovered', async () => {
    render(<SidebarItem {...defaultProps} expanded={false} />);
    const item = screen.getByText(icon);
    fireEvent.mouseOver(item);
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  it('applies active styles when isActive is true', () => {
    render(<SidebarItem {...defaultProps} isActive />);
    const item = screen.getByText(icon).closest('li');
    expect(item).toHaveClass('text-primary-500');
  });

  it('calls onClick when clicked', () => {
    render(<SidebarItem {...defaultProps} />);
    const item = screen.getByText(icon).closest('li');
    fireEvent.click(item!);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
