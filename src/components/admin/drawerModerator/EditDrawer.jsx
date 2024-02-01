import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const EditModerator = (props) => {
  const { changeChange } = useContext(UserContext);
  const [formState, setFormState] = useState({
    // creating the new form objec with predefined values
    id: props.data.mod_id,
    name: props.data.mod_name,
    email: props.data.mod_access,
    permission: "",
    inventory: "",
    Bills: "",
  });

  const handleSubmission = () => {
    // handle submission function for submission
    axios
      .put("http://localhost:8000/api/ad/updateModerator", formState)
      .then((res) => {
        console.log("Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    {
      props.draw();
    }
  };

  const handleSubmit = (e) => {
    // handle submit function for input
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-5 text-xl m-8 w-[19vw] ">
      <TextField
        label="Name"
        size="small"
        variant="outlined"
        required
        value={formState.name}
        name="name"
        onChange={handleSubmit}
      />
      <TextField
        label="Email"
        size="small"
        variant="outlined"
        value={formState.email}
        name="email"
        onChange={handleSubmit}
      />

      <FormLabel>
        <div className="font-semibold text-[18px] pt-[20px]">Permission</div>
      </FormLabel>

      <div className="ml-16 mt-[2px]">
        <RadioGroup defaultValue={props.data.mod_permission} name="radio1">
          <FormControlLabel
            value="Option_1"
            control={<Radio size="small" />}
            label="Option 1"
            onClick={(e) => {
              setFormState({
                ...formState,
                permission: "Permission 1 granted ",
              });
            }}
          />

          <FormControlLabel
            value="Option_2"
            control={<Radio size="small" />}
            label="Option 2"
            onClick={(e) => {
              setFormState({
                ...formState,
                permission: "Permission 1 granted ",
              });
            }}
          />

          <FormControlLabel
            value="Option_3"
            control={<Radio size="small" />}
            label="Option 3"
            onClick={(e) => {
              setFormState({
                ...formState,
                permission: "Permission 1 granted ",
              });
            }}
          />
        </RadioGroup>
      </div>

      <FormLabel>
        <div className="font-semibold text-[18px]">Inventory</div>
      </FormLabel>

      <div className="ml-16 mt-[2px]">
        <RadioGroup defaultValue={props.inventory} name="radio1">
          <FormControlLabel
            value="Option_1"
            control={<Radio size="small" />}
            label="Option 1"
            onClick={(e) => {
              setFormState({
                ...formState,
                inventory: "Permission 1 granted ",
              });
            }}
          />

          <FormControlLabel
            value="Option_2"
            control={<Radio size="small" />}
            label="Option 2"
            onClick={(e) => {
              setFormState({
                ...formState,
                inventory: "Permission 1 granted ",
              });
            }}
          />

          <FormControlLabel
            value="Option_3"
            control={<Radio size="small" />}
            label="Option 3"
            onClick={(e) => {
              setFormState({
                ...formState,
                inventory: "Permission 1 granted ",
              });
            }}
          />
        </RadioGroup>
      </div>

      <motion.div whileTap={{ scale: 0.97 }}>
        <motion.button
          className="py-2 my-24 text-lg border-2 shadow-sky-400  mt-36 w-full text-center bg-slate-300/50 rounded-lg"
          onClick={handleSubmission}
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
};
export default EditModerator;
