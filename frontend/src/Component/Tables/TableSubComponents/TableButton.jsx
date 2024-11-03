import { UpdateButton } from '../../Sensor/UpdateSensorSubComponents/UpdateButton';

const TableButton = ({text, onClick}) => {
  return (
    <>
      <section className={'flex justify-end items-center mt-4 mr-4 mb-2'}>
        <UpdateButton
          style={'px-4 py-2 text-white bg-blue-500 hover:bg-sky-500 rounded-lg'}
          type={'button'}
          text={text}
          onClick={onClick}
        />
      </section>
    </>
  );
};

export default TableButton;
