import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '..';

describe('Input', () => {
  it('marks required fields with an asterisk', () => {
    render(<Input label="Recipe name" required />);

    expect(screen.getByText('*')).toHaveClass('input-required-marker');
    expect(screen.getByLabelText('Recipe name *')).toBeRequired();
  });

  it('does not mark optional fields with an asterisk', () => {
    render(<Input label="Recipe description" />);

    expect(screen.getByLabelText('Recipe description')).toBeInTheDocument();
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
});
