import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure jest-dom matchers are available
import BlocksTable from '../Component/Tables/TableSubComponents/Blocks/BlocksTable';
import { useGetBlockList } from '../Hooks/Blocks/useGetBlockList';
import useSortableData from '../Hooks/Tables/useSortableTable';
import BlocksTableBody from '../Component/Tables/TableSubComponents/Blocks/BlocksTableBody';
import { tableHeadersBlocks } from '../utils/constants/constants';

// Mock hooks and constants
jest.mock('../Hooks/Blocks/useGetBlockList');
jest.mock('../Hooks/Tables/useSortableTable');
jest.mock('../Component/Sensor/UpdateSensorSubComponents/UpdateButton', () => ({
  UpdateButton: ({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  ),
}));
jest.mock('../Component/Tables/TableSubComponents/TableItem', () => ({
  __esModule: true,
  default: ({ item }) => <td>{item}</td>,
}));

describe('BlocksTable', () => {
  it('should render "No blocks found" when there is no data', () => {
    useGetBlockList.mockReturnValue({ blocks: [], apiError: null });
    useSortableData.mockReturnValue({ sortedData: [], onSort: jest.fn(), sortConfig: {} });

    render(<BlocksTable />);

    // Inspect the output using screen.debug() for troubleshooting
    screen.debug();

    expect(screen.getByText('No blocks found')).toBeInTheDocument();
  });

  it('should display error message when apiError exists', () => {
    useGetBlockList.mockReturnValue({ blocks: [], apiError: 'Error loading blocks' });
    useSortableData.mockReturnValue({ sortedData: [], onSort: jest.fn(), sortConfig: {} });

    render(<BlocksTable />);

    // Inspect the output using screen.debug() for troubleshooting
    screen.debug();

    expect(screen.getByText('Error: Error loading blocks')).toBeInTheDocument();
  });

  it('should render table when there is data and no error', () => {
    const mockBlocks = [{ id: 1, blockName: 'Block 1' }];
    useGetBlockList.mockReturnValue({ blocks: mockBlocks, apiError: null });
    useSortableData.mockReturnValue({ sortedData: mockBlocks, onSort: jest.fn(), sortConfig: {} });

    render(<BlocksTable />);

    // Inspect the output using screen.debug() for troubleshooting
    screen.debug();

    // Check if table headers and body are rendered
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Block 1')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});

describe('BlocksTableBody', () => {
  it('should render tbody and rows for each tableField item', () => {
    const mockTableFields = [
      { id: 1, blockName: 'Block 1' },
      { id: 2, blockName: 'Block 2' },
    ];

    render(<BlocksTableBody tableFields={mockTableFields} />);

    // Inspect the output using screen.debug() for troubleshooting
    screen.debug();

    // Ensure tbody is rendered and there are rows for each item
    expect(screen.getByRole('rowgroup')).toBeInTheDocument();
    mockTableFields.forEach((field) => {
      expect(screen.getByText(field.blockName)).toBeInTheDocument();
    });
  });

  it('should render the "Delete" button for each row', () => {
    const mockTableFields = [{ id: 1, blockName: 'Block 1' }];
    render(<BlocksTableBody tableFields={mockTableFields} />);

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();

    // You can also simulate a click if needed
    fireEvent.click(deleteButton);
    // Check for the desired effect (for instance, an alert or some other interaction)
  });
});
