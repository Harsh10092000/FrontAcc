import { IconChecklist, IconSettings, IconUser } from "@tabler/icons-react";
import "./cardtran.scss";
import { useContext, useState ,useEffect} from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const CardTran = (props) => {
  const { userId ,change} = useContext(UserContext);
  const [result,setResult]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/api/auth/fetch").then((response)=>{
      setResult(response.data)
    })
  },[change])
  return (
    <div>
      <div>
        {result
          .filter((persons) => persons.cust_id == userId)
          .map((filteredPersons) => (
            <div className="flex justify-between space-x-6 items-center p-6" key={userId}>
              <div className="flex items-center gap-4">
                <div className="icon2">
                  <IconUser className="text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl">{filteredPersons.cust_name}</span>

                  <span className="text-slate-500 text-xs">{filteredPersons.cust_number}</span>
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
          ))}
      </div>
    </div>
  );
};

export default CardTran;
