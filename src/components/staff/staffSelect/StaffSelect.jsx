import character from "../../../assets/character.png";

const StaffSelect = () => {
  return (
    <div className="h-[100vh - 87px] flex flex-col justify-center items-center w-full bg-slate-100 gap-5">
      <img src={character} alt="" className=" w-96" />
      <p className="font-semibold text-xl">No Staff Selected</p>
    </div>
  );
};

export default StaffSelect;
