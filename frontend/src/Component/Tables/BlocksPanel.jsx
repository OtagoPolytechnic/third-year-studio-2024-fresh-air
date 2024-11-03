import BlocksTable from "./TableSubComponents/Blocks/BlocksTable";
import TableButton from "./TableSubComponents/TableButton";
import CreateBlock from "../Block/CreateBlock";
import useModal from "../../Hooks/Modal/useModal";

const BlocksPanel = () => {
    const { modal, setModal } = useModal();

    return (
        <>
        <TableButton text={"Add Block"} onClick={() => setModal('showCreateBlock', true)} />
        <section className={"relative overflow-x-auto mx-4 rounded-lg border shadow-sm"}>
            <BlocksTable/>
        </section>
        {modal('showCreateBlock') && 
        <CreateBlock
        onClick={() => setModal('showCreateBlock', false)}
        />
        }
        </>
    );
    };

export default BlocksPanel;