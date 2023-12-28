import { IconChecklist, IconSettings, IconUser } from "@tabler/icons-react";
import "./cardtran.scss";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { Skeleton } from "@mui/material";
const CardTran = (props) => {
  const { userId, change, parties } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchDataUsingId/${userId}`)
      .then((response) => {
        setResult(response.data);
        setSkeleton(false);
      });
  }, [change , userId]);

  
  //var parties = "1";
  return (
    <div>
      <div>
        {skeleton ? (
          <div
            className="flex justify-between space-x-6 items-center p-6"
            key={userId}
          >
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
                <button >
                  <IconChecklist className="w-10" />
                  Report
                </button>
                <button >
                  <IconSettings />
                </button>
              </div>
            </div>
          </div>
        ) : (
          
              <div
                className="flex justify-between space-x-6 items-center p-6"
                key={userId}
              >
                <div className="flex items-center gap-4">
                  <div className="icon2">
                    <IconUser className="text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">{result[0].cust_name}</span>

                    <span className="text-slate-500 text-xs">
                      {result[0].cust_number}
                    </span>
                  </div>
                </div>
                <div>

                {parties === 3 ?  
                  <div className="flex items-center gap-6 buttons ">
                    <button >
                      <IconChecklist className="w-10" />
                      Report
                    </button>
                    <button onClick={props.edit} >
                      <IconSettings />
                    </button>
                  </div>
                  : <div className="flex items-center gap-6 buttons ">
                  <button disabled className="hover:!bg-slate-200 !border-none flex gap-1 cursor-not-allowed !text-slate-400 bg-slate-200">
                    <IconChecklist className="w-10" />
                    Report
                  </button>
                  <button onClick={props.edit} disabled className=" hover:!bg-slate-200 !border-none flex gap-1 !text-slate-400 bg-slate-200 cursor-not-allowed" >
                    <IconSettings />
                  </button>
                </div> }
                </div>
              </div>
            
        )}
      </div>
    </div>
  );
};

export default CardTran;
