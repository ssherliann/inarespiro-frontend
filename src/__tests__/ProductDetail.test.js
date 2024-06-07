import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useBasket } from '../contexts/BasketContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useQuery: jest.fn(),
}));

jest.mock('../contexts/BasketContext', () => ({
    useBasket: jest.fn(),
}));

describe('ProductDetail', () => {
    const mockProduct = {
        _id: '1',
        title: 'Test Product',
        price: '100',
        description: 'This is a test product',
        photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
    };

    const mockAddToBasket = jest.fn();
    const mockUseBasket = {
        addToBasket: mockAddToBasket,
        items: [],
    };

    beforeEach(() => {
        useParams.mockReturnValue({ product_id: '1' });
        useBasket.mockReturnValue(mockUseBasket);
    });

    test('renders loading state', () => {
        useQuery.mockReturnValue({ isLoading: true });

        render(
            <MemoryRouter>
                <ProductDetail />
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders error state', () => {
        useQuery.mockReturnValue({ isLoading: false, isError: true });

        render(
            <MemoryRouter>
                <ProductDetail />
            </MemoryRouter>
        );

        expect(screen.getByText(/error: failed to load product/i)).toBeInTheDocument();
    });

    test('renders product details', async () => {
        useQuery.mockReturnValue({ isLoading: false, isError: false, data: mockProduct });

        render(
            <MemoryRouter>
                <ProductDetail />
            </MemoryRouter>
        );

        expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        expect(screen.getByText(`${mockProduct.price}$`)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
        expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    });

    test('handles "Add to Basket" button click', async () => {
        useQuery.mockReturnValue({ isLoading: false, isError: false, data: mockProduct });

        render(
            <MemoryRouter>
                <ProductDetail />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/add to cart/i));

        expect(mockAddToBasket).toHaveBeenCalledWith(mockProduct, undefined);
    });

    test('renders product photos', () => {
        useQuery.mockReturnValue({ isLoading: false, isError: false, data: mockProduct });

        render(
            <MemoryRouter>
                <ProductDetail />
            </MemoryRouter>
        );

        mockProduct.photos.forEach((_photo, index) => {
            const photos = screen.getAllByAltText(`Photo ${index + 1}`);
            photos.forEach(photo => {
                expect(photo).toBeInTheDocument();
            });
        });
    });
});
