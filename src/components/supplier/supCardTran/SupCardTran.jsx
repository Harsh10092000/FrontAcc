import "./supcardtran.scss";
import { IconUser, IconChecklist, IconSettings } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const SupCardTran = (props) => {
  const { supId, change } = useContext(UserContext);
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/sup/fetchData").then((response) => {
      setResult(response.data);
    });
  }, [change]);
  return (
    <div>
      <div>
        {result
          .filter((persons) => persons.sup_id == supId)
          .map((filteredPersons) => (
            <div key={supId}>
              <div
                className="flex justify-between space-x-6 items-center p-6"
                key={supId}
              >
                <div className="flex items-center gap-4">
                  <div className="icon2">
                    <IconUser className="text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">{filteredPersons.sup_name}</span>

                    <span className="text-slate-500 text-xs">
                      {filteredPersons.sup_number}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-6 buttons">
                    <button>
                      <IconChecklist className="w-10" />
                      Report
                    </button>
                    <button onClick={props.edit}>
                      <IconSettings />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SupCardTran;
