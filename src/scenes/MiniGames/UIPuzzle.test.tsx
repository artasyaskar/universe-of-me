import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UIPuzzle from './UIPuzzle';

const mockSortableContext = vi.fn(({ children }) => <>{children}</>);

vi.mock('@dnd-kit/sortable', async () => {
  const actual = await vi.importActual('@dnd-kit/sortable');
  return {
    ...actual,
    useSortable: () => ({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: null,
      transition: null,
    }),
    SortableContext: mockSortableContext,
  };
});

describe('UIPuzzle', () => {
  it('should maintain referential integrity of items on re-render', () => {
    // A stateful parent component to trigger re-renders in UIPuzzle
    const TestWrapper = () => {
      const [count, setCount] = React.useState(0);
      return (
        <div>
          <button onClick={() => setCount(count + 1)}>Rerender</button>
          <UIPuzzle />
        </div>
      );
    };

    const { getByText } = render(<TestWrapper />);

    // Before the fix, UIPuzzle re-creates initialItems on every render.
    // We can check this by inspecting the props passed to SortableContext.
    
    // First render
    const firstRenderProps = mockSortableContext.mock.calls[0][0];
    const firstRenderItems = firstRenderProps.items;

    // Trigger a re-render
    fireEvent.click(getByText('Rerender'));

    // Second render
    const secondRenderProps = mockSortableContext.mock.calls[1][0];
    const secondRenderItems = secondRenderProps.items;

    // With the fix, the icon objects should be the same instance.
    // Without the fix, they would be different instances.
    expect(firstRenderItems[0].icon).toBe(secondRenderItems[0].icon);
    expect(firstRenderItems[1].icon).toBe(secondRenderItems[1].icon);
    expect(firstRenderItems[2].icon).toBe(secondRenderItems[2].icon);
  });
});
