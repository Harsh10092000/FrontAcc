import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { IconFileSpreadsheet } from "@tabler/icons-react";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="flex items-center gap-2 p-2 rounded bg-slate-100 hover:bg-emerald-600 hover:text-white"
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      <IconFileSpreadsheet />
      Download Excel
    </button>
  );
};
