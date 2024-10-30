import { UpdateButton } from '../../Sensor/UpdateSensorSubComponents/UpdateButton';

const TableButton = ({text}) => {
  return (
    <>
      <section className={'flex justify-end items-center mt-4 mx-4 mb-2'}>
        <UpdateButton
          style={'px-4 py-2 text-white bg-blue-500 rounded-lg'}
          type={'button'}
          text={text}
        />
      </section>
    </>
  );
};

export default TableButton;
