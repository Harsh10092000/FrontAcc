import React, { useEffect } from "react";

const HsnCode = (props) => {
    useEffect(() => {
        console.log("props.searchValue : ", props.searchValue)
    }, [props.searchValue])
  return (
    <div>
      {props.searchValue !== null && (props.searchValue !== "") === true && 
      props.hsnCodes
        .filter(
          (code) =>
            code.hsn_code.toString().startsWith(props.searchValue) ||
            code.hsn_desc.startsWith(props.searchValue)
        )
        .map((hsnItem) => (
          <div
            key={hsnItem.hsn_code}
            className="flex card-sec"
            onClick={() => {
              handleAddHsnCode(item.item_id);
              handleHsnChange(
                item.item_id,
                hsnItem.hsn_code,
                hsnItem.hsn_desc,
                hsnItem.igst,
                hsnItem.cgst,
                hsnItem.sgst
              );
            }}
          >
            
            <div className="gst-card-text cursor-pointer hover:bg-slate-100 p-3 rounded">
              <div className="flex gap-6 pb-4">
                <h2 className=" rounded bg-slate-300 px-6 py-1 ">
                  {hsnItem.hsn_code}
                </h2>
                <h2 className=" rounded bg-slate-300 px-4 py-1 ">
                  {hsnItem.igst + "% GST"}
                </h2>
              </div>
              <p>{hsnItem.hsn_desc}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HsnCode;
