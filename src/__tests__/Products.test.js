import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Products from '../pages/Products/Products';
import { useInfiniteQuery } from 'react-query';

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useInfiniteQuery: jest.fn(),
}));

const mockProducts = [
  { _id: '1', title: 'Product 1', category: 'Rings' },
  { _id: '2', title: 'Product 2', category: 'Necklaces' },
  { _id: '3', title: 'Product 3', category: 'Bracelets' },
];

describe('Products component', () => {
  test('renders product cards', () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [mockProducts] },
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'success',
    });

    render(
      <MemoryRouter> 
        <Products />
      </MemoryRouter>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
