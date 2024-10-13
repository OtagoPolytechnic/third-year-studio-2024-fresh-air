import { NavLink } from 'react-router-dom';
import { useGetBlockList } from '../../Hooks/Blocks/useGetBlockList';

export const Homepage = () => {
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
  const blocks = useGetBlockList(`${apiKey}/api/v1/blocks`);

  return (
    <>
      {blocks.items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {blocks.items.map((block) => (
            <div
              key={block.blockName}
              className="flex justify-center text-gray-900"
            >
              <li>
                <NavLink
                  to={`${block.blockName}`}
                  className="link"
                  data-cy={block.blockName}
                >
                  {block.blockName}
                </NavLink>
              </li>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
