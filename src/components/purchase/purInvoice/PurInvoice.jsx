import { useRef, useEffect, useContext, useState } from "react";
import html2canvas from "html2canvas";
import "./purinvoice.scss";
import { IconDownload } from "@tabler/icons-react";
import jsPDF from "jspdf";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
const PurInvoice = () => {
  const { purchaseId, change, accountId } = useContext(UserContext);
  const pdfRef = useRef();
  const [purchaseDataById, setPurchaseDataById] = useState({
    purchaseId: "",
    sup_cnct_id: 0,
    purchase_amt: "",
    amtDue: "",
  });
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  const [acct, setAcct] = useState([]);
  const [purchaseRightTranData, setPurchaseRightTranData] = useState([]);
  const [supData, setSupData] = useState([]);
  const [img, setImg] = useState({
    imgLink: "",
    act_name: "",
  });
  const [payOutData , setPayOutData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/purchase/fetchDataByIdAndPayOutId/${purchaseId}`)
      .then((response) => {
        setPurchaseDataById({
          ...purchaseDataById,
          purchaseId: response.data[0].purchase_id,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt: response.data[0].purchase_amt,
          //amtDue: response.data[0].purchase_amt_due,
        });
        setPayOutData(response.data)
      });
    
    // axios
    //   .get(import.meta.env.VITE_BACKEND + `/api/purchase/fetchDataById/${purchaseId}`)
    //   .then((response) => {
    //     purchaseDataById({
    //       ...data,
    //       purchaseId: response.data[0].purchase_id,
    //       sup_cnct_id: response.data[0].sup_cnct_id,
    //       purchase_amt: response.data[0].purchase_amt_paid,
    //       amtDue: response.data[0].purchase_amt_due,
    //     });
    //   });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/purchase/fetchPurchaseTran/${purchaseId}`)
      .then((response) => {
        setPurchaseRightTranData(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${accountId}`)
      .then((res) => {
        setAcct(res.data);
        setImg({
          ...img,
          imgLink: res.data[0].business_logo,
          act_name: res.data[0].business_name,
        });
      });
  }, [change, purchaseId]);

  const totalAmtPaid = payOutData
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.purchase_pay_out_id) ===
        parseInt(purchaseDataById.purchaseId)
    )
    .reduce(function (prev, current) {
      return prev + +current.purchase_amt_paid;
    }, 0);

    
  useEffect(() => {
    axios
    .get(
        import.meta.env.VITE_BACKEND +
          `/api/sup/fetchSup/${purchaseDataById.sup_cnct_id}`
      )
      .then((response) => {
        setSupData(response.data);
      });
  }, [purchaseDataById]);
  const totalRate = purchaseRightTranData.reduce(function (prev, current) {
    return prev + +current.purchase_item_disc_price * current.purchase_item_qty;
  }, 0);

  const totalTax = purchaseRightTranData.reduce(function (prev, current) {
    return prev + +current.purchase_item_gst_amt * current.purchase_item_qty;
  }, 0);
  const date = new Date();
  return (
    <div className="container">
      <div className="flex p-2 items-center justify-around gap-32">
        <h1 className="text-3xl  mt-2">Invoice</h1>
        <button
          className="p-1 flex items-center gap-2 rounded text-blue-600 hover:text-white hover:bg-blue-600"
          style={{
            border: "1px solid rgb(37, 99, 235)",
            transition: "all 400ms ease-in-out",
          }}
          onClick={downloadPDF}
        >
          <IconDownload />
          Download PDF
        </button>
      </div>

      <div className="invoice-wrapper" id="print-area" ref={pdfRef}>
        <div className="invoice">
          <div className="invoice-container">
            <div className="invoice-head">
              <div className="invoice-head-top">
                <div className="invoice-head-top-left text-start">
                  <img
                    src={
                      import.meta.env.VITE_BACKEND + "/account/" + img.imgLink
                    }
                  />
                </div>
                <div className="invoice-head-top-right text-end">
                  <h3>{img.act_name}</h3>
                </div>
              </div>
              <div className="hr"></div>
              <div className="invoice-head-middle">
                <div className="invoice-head-middle-left text-start">
                  <p>
                    <span className="text-bold">Date </span>:
                    {date.toDateString().slice(3)}
                  </p>
                </div>
                <div className="invoice-head-middle-right text-end">
                  <p>
                    <span className="text-bold">Invoice No:</span>
                    {date.toLocaleDateString().split("/")}
                    {purchaseDataById.purchasesId}
                  </p>
                </div>
              </div>
              <div className="hr"></div>
              <div className="invoice-head-bottom">
                <div className="invoice-head-bottom-left">
                  {supData.map((item, index) => (
                    <ul key={index} className="text-left">
                      <li className="text-bold">
                        Invoiced To:{" " + item.sup_name}
                      </li>
                      <li>{item.sup_sflat + "," + item.sup_sarea}</li>
                      <li>{item.sup_scity + "," + item.sup_spin}</li>
                      <li>{item.sup_sstate}</li>
                    </ul>
                  ))}
                </div>
                <div className="invoice-head-bottom-right">
                  {acct.map((item, index) => (
                    <ul className="text-end" key={index}>
                      <li className="text-bold">
                        Pay To:{" " + item.business_name}
                      </li>

                      <li></li>
                      <li>
                        {item.business_address.split(",")[0] +
                          "," +
                          item.business_address.split(",")[1]}
                      </li>
                      <li>
                        {item.business_address.split(",")[2]},
                        {item.business_address.split(",")[3]}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="invoice-body">
                <table>
                  <thead>
                    <tr>
                      <td className="text-bold">SNo.</td>
                      <td className="text-bold">Service</td>
                      <td className="text-bold">Rate</td>
                      <td className="text-bold">Discount/Unit</td>
                      <td className="text-bold">QTY</td>
                      <td className="text-bold">Total Rate</td>
                      <td className="text-bold">Total Tax</td>
                      <td className="text-bold">Amount</td>
                    </tr>
                  </thead>

                  <tbody>
                    {purchaseRightTranData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.purchase_item_name}</td>
                        <td>₹ {item.purchase_item_price}</td>
                        <td>
                          {item.purchase_item_disc_unit
                            ? item.purchase_item_disc_unit
                            : "-"}
                        </td>
                        <td>{item.purchase_item_qty}</td>
                        <td>
                          ₹
                          {(
                            item.purchase_item_disc_price * item.purchase_item_qty
                          ).toFixed(2)}
                        </td>
                        <td>
                          {(
                            item.purchase_item_gst_amt * item.purchase_item_qty
                          ).toFixed(2)}
                        </td>
                        <td>
                          ₹
                          {item.purchase_item_qty *
                            (
                              parseFloat(item.purchase_item_disc_price) +
                              parseFloat(
                                item.purchase_item_gst_amt
                                  ? item.purchase_item_gst_amt
                                  : 0
                              )
                            ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="invoice-body-bottom">
                  <div className="invoice-body-info-item border-bottom">
                    <div className="info-item-td text-end text-bold">
                      Sub Total:
                    </div>
                    <div className="info-item-td text-end">
                      ₹ {totalRate.toFixed(2)}
                    </div>
                  </div>
                  <div className="invoice-body-info-item border-bottom">
                    <div className="info-item-td text-end text-bold">Tax:</div>
                    <div className="info-item-td text-end">
                      ₹ {totalTax.toFixed(2)}
                    </div>
                  </div>
                  <div className="invoice-body-info-item border-bottom">
                    <div className="info-item-td text-end text-bold">
                      Total Amount:
                    </div>
                    <div className="info-item-td text-end">
                      ₹ {(totalRate + totalTax).toFixed(2)}
                    </div>
                  </div>

                  {totalAmtPaid !== 0 ? (
                    <>
                      <div className="invoice-body-info-item border-bottom">
                        <div className="info-item-td text-end text-bold">
                          Amount Paid:
                        </div>
                        <div className="info-item-td text-end">
                          ₹ {totalAmtPaid}
                        </div>
                      </div>

                      <div className="invoice-body-info-item">
                        <div className="info-item-td text-end text-bold">
                          Balance Due:
                        </div>
                        <div className="info-item-td text-end">
                          ₹ {parseFloat(purchaseDataById.purchase_amt - totalAmtPaid).toFixed(2)}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="invoice-foot text-center">
              <p>
                <span className="text-bold text-center">NOTE:&nbsp;</span>This
                is computer generated receipt and does not require physical
                signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurInvoice;
