import { NavLink } from 'react-router-dom';
import { useGetBlockList } from '../../Hooks/Blocks/useGetBlockList';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const Homepage = () => {
  const { blocks } = useGetBlockList(`${apiKey}/api/v1/blocks`);

  return (
    <>
      {blocks && (
        <div className="grid justify-items-center grid-cols-3 md:grid-cols-2 md:justify-items-stretch md:mx-2 lg:grid-cols-4 gap-4 mt-4">
          {blocks.map((block) => (
            <NavLink
              to={`${block.blockName}`}
              className="link"
              data-cy={block.blockName}
            >
              <div
                key={block.blockName}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
              >
                <li className="text-center">{block.blockName}</li>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};
