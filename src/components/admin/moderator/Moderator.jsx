import { useState, useContext } from "react";
import ModeratorLeft from "./moderatorLeft/ModeratorLeft";
import ModeratorRight from "./moderatorRight/ModeratorRight";
import ModeratorRtEpt from "./moderatorRight/ModeratorRtEpt";
import { UserContext } from "../../../context/UserIdContext";

const Moderator = () => {
  const { modId } = useContext(UserContext);
  return (
    <div className="flex">
      <div className="w-full">
        <ModeratorLeft />
      </div>
      {modId != 0 ? (
        <div className="w-full">
          <ModeratorRight />
        </div>
      ) : (
        <div className="w-full">
          <ModeratorRtEpt />
        </div>
      )}
    </div>
  );
};

export default Moderator;
