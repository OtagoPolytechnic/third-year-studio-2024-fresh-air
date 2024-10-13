import { NavLink } from 'react-router-dom';
import { useGetBlockList } from '../../Hooks/Blocks/useGetBlockList';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const Homepage = () => {
  const {blocks} = useGetBlockList(`${apiKey}/api/v1/blocks`);

  return (
    <>
      {blocks && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {blocks.map((block) => (
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
