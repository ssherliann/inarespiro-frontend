import { render, screen} from '@testing-library/react';

import Basket from '../pages/Basket/Basket';
import { BasketProvider } from '../contexts/BasketContext';

describe('Basket component', () => {
  test('renders with empty cart message when there are no items', () => {

    render(
      <BasketProvider>
        <Basket />
      </BasketProvider>
    );
    
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });
});

