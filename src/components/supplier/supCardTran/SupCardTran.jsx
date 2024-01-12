import "./supcardtran.scss";
import { IconUser, IconChecklist, IconSettings } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
const SupCardTran = (props) => {
  const { supId, change, accountId, parties } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchData/${accountId}`)
      .then((response) => {
        setResult(response.data);
        setSkeleton(false);
      });
  }, [change]);
  return (
    <div>
      <div>
        {skeleton ? (
          <div className="flex justify-between space-x-6 items-center p-6">
            <div className="flex items-center gap-4">
              <Skeleton
                variant="rounded"
                width={65}
                height={65}
                animation="wave"
              />

              <div className="flex flex-col gap-4">
                <span className="text-xl">
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={20}
                    animation="wave"
                  />
                </span>

                <span className="text-slate-500 text-xs">
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={20}
                    animation="wave"
                  />
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-6 buttons">
                <button disabled={parties === 3 ? false : true}>
                  <IconChecklist className="w-10" />
                  Report
                </button>
                <button
                  onClick={props.edit}
                  disabled={parties === 3 ? false : true}
                >
                  <IconSettings />
                </button>
              </div>
            </div>
          </div>
        ) : (
          result
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
                      <span className="text-xl">
                        {filteredPersons.sup_name}
                      </span>

                      <span className="text-slate-500 text-xs">
                        {filteredPersons.sup_number}
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* <div className="flex items-center gap-6 buttons">
                      <button disabled={parties === 3 ? false : true }>
                        <IconChecklist className="w-10" />
                        Report
                      </button>
                      <button onClick={props.edit} disabled={parties === 3 ? false : true }>
                        <IconSettings />
                      </button>
                    </div> */}
                    {parties === 3 ? (
                      <div className="flex items-center gap-6 buttons ">
                        <Link to="/supReport">
                          <button>
                            <IconChecklist className="w-10" />
                            Report
                          </button>
                        </Link>

                        <button onClick={props.edit}>
                          <IconSettings />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-6 buttons ">
                        <button disabled className="cursor-not-allowed">
                          <IconChecklist className="w-10" />
                          Report
                        </button>
                        <button
                          onClick={props.edit}
                          disabled
                          className=" cursor-not-allowed"
                        >
                          <IconSettings />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default SupCardTran;
