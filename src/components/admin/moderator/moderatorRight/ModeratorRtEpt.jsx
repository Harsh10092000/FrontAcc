import bckgnd from "../../../../assets/character.png";

export const ModeratorRtEpt = () => {
  return (
    <div className=" flex flex-col  items-center w-full justify-center h-[100vh] bg-slate-100">
      <img src={bckgnd} className="opacity-75 w-120 h-80" />
      <div className="text-2xl text-slate-400 pt-20">
        No Moderator Selected{" "}
      </div>
    </div>
  );
};

export default ModeratorRtEpt;
