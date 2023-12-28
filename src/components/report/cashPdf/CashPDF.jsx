import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IconFileTypePdf } from "@tabler/icons-react";

const CashPDF = (props) => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF("p", "mm");
      doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        heightLeft -= pageHeight;
      }
      doc.save("Cash.pdf");
    });
  };
  return (
    <div className="p-3">
      <button
        className="flex items-center gap-2 p-2 rounded bg-slate-100 hover:bg-rose-400 hover:text-white mb-2"
        onClick={downloadPDF}
      >
        <IconFileTypePdf />
        Download PDF
      </button>
      <div className="border border-slate-300 p-4 h-full" ref={pdfRef}>
        <div className="flex justify-between">
          <div className="text-3xl font-bold">Calinfo</div>
          <div className="text-right text-2xl">Cash Report</div>
        </div>
        <div className="border border-slate-300 rounded-md mt-4 flex gap-32 p-4 text-lg">
          <div className="totalin flex flex-col gap-5">
            <div className="font-semibold">Transactions</div>
            <div>{props.data.length}</div>
          </div>
          <div className="totalout flex flex-col gap-5">
            <div className="font-semibold">Receive</div>
            <div className="text-green-600">₹ {props.pay.toFixed(2)}</div>
          </div>
          <div className="netbalance flex flex-col gap-5">
            <div className="font-semibold">Net Balance</div>
            <div className="text-red-600">₹ {props.receive.toFixed(2)}</div>
          </div>
        </div>
        <div className="my-2 font-semibold text-lg text-slate-700">
          No of Entries :
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  In
                </th>
                <th scope="col" className="px-6 py-3">
                  Out
                </th>
                <th scope="col" className="px-6 py-3">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((item, index) => (
                <tr className="bg-white border-b " key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.cash_date}
                  </th>
                  <td className="px-6 py-4">
                    {" "}
                    ₹ {item.receive_sum ? item.receive_sum : "0"}
                  </td>
                  <td className="px-6 py-4">
                    ₹ {item.pay_sum ? item.pay_sum : "0"}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    ₹ {item.receive_sum - item.pay_sum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="font-semibold text-center mt-2 text-slate-700">
          Report Generated : {new Date().toDateString()} at{" "}
          {new Date().toTimeString().slice(0, 8)}
        </div>
      </div>
    </div>
  );
};

export default CashPDF;
