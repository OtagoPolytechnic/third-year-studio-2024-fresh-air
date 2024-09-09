// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import { RoomPage } from '../Component/Pages/RoomPage';
// import WS from 'jest-websocket-mock'; 
// import { WebSocketContext } from '../Context/WebSocketContext'; 

// describe('RoomPage component with WebSocket', () => {
//   let server;

//   beforeEach(() => {
//     server = new WS('ws://localhost:1234');
//   });

//   afterEach(() => {
//     WS.clean();
//   });

//   test('renders CO2 room data correctly with WebSocket', async () => {
//     const mockSocket = { send: jest.fn() };
    
//     const MockWebSocketProvider = ({ children }) => (
//       <WebSocketContext.Provider value={{ socket: mockSocket }}>
//         {children}
//       </WebSocketContext.Provider>
//     );

//     global.fetch = jest.fn((url) => {
//       if (url.includes('/api/v1/devices')) {
//         return Promise.resolve({
//           json: () => Promise.resolve({
//             data: [
//               {
//                 room_number: 'D201',
//                 dev_eui: '00D3C59800BDD352',
//               },
//             ],
//           }),
//         });
//       } else if (url.includes('/api/v1/rooms/latest/00D3C59800BDD352')) {
//         return Promise.resolve({
//           json: () => Promise.resolve({
//             data: { co2: 2040 },
//           }),
//         });
//       }
//       return Promise.reject(new Error('Not Found'));
//     });

//     render(
//       <MemoryRouter initialEntries={['/rooms/D201']}>
//         <MockWebSocketProvider>
//           <Routes>
//             <Route path="/rooms/:roomNumber" element={<RoomPage />} />
//           </Routes>
//         </MockWebSocketProvider>
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       const co2Element = screen.getByText((content, element) => {
//         const hasText = (node) => node.textContent === 'CO2 Level is 2040';
//         const nodeHasText = hasText(element);
//         const childrenDontHaveText = Array.from(element.children).every(
//           (child) => !hasText(child)
//         );
//         return nodeHasText && childrenDontHaveText;
//       });
//       expect(co2Element).toBeInTheDocument();
//     });
//   });
// });
