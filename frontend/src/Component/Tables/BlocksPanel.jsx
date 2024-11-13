import BlocksTable from "./TableSubComponents/Blocks/BlocksTable";
import TableButton from "./TableSubComponents/TableButton";
import CreateBlock from "../Block/CreateBlock";
import UpdateBlock from "../Block/UpdateBlock";
import useModal from "../../Hooks/Modal/useModal";

const BlocksPanel = () => {
    const { modal, setModal } = useModal();

    return (
        <>
        <section className={'flex justify-end'}>
        <TableButton text={"Add Block"} onClick={() => setModal('showCreateBlock', true)} />
        </section>
        <section className={"relative overflow-x-auto mx-4 rounded-lg border shadow-sm"}>
            <BlocksTable/>
        </section>
        {modal('showCreateBlock') && 
        <CreateBlock
        onClick={() => setModal('showCreateBlock', false)}
        />
        }
        {modal('showUpdateBlock') &&
        <UpdateBlock
        onClick={() => setModal('showUpdateBlock', false)}
        />
        }
        </>
    );
    };

export default BlocksPanel;