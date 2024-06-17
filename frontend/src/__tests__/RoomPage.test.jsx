import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RoomPage } from '../Component/Pages/RoomPage';

describe('RoomPage component', () => {
  beforeAll(() => {
    // Mocking the global fetch function to return mocked data
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () => {
          if (url.includes('/api/v1/devices')) {
            return Promise.resolve({
              data: [
                {
                  room_number: 'D201',
                  dev_eui: '00D3C59800BDD352',
                },
              ],
            });
          } else if (url.includes('/api/v1/rooms/latest')) {
            return Promise.resolve({
              data: { co2: 2040 },
            });
          }
        },
      })
    );
  });

  test('renders CO2 room data correctly', async () => {
    // Render the RoomPage component within a MemoryRouter that has route parameter
    render(
      <MemoryRouter initialEntries={['/rooms/D201']}>
        <Routes>
          <Route path="/rooms/:roomNumber" element={<RoomPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the CO2 element to be rendered and check if it is in the document
    await waitFor(() => {
      const co2Element = screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === 'CO2 Level is 2040';
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      });
      expect(co2Element).toBeInTheDocument();
    });
  });
});
