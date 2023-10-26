import * as React from "react";


const Invoive = (props) => {
    
  const totalRate = props.invoiceItems
  .reduce(function (prev, current) {
    return prev + +current.in_discount_price * current.in_qty;
  }, 0);

  const totalTax = props.invoiceItems
  .reduce(function (prev, current) {
    return prev + +current.in_gst_amt * current.in_qty;
  }, 0);

 
  return (
    // <div classNameNameName="container" ref={pdfRef}>
    <div classNameNameName="container">
      <div className="invoice-wrapper" id="print-area">
        <div className="invoice">
          <div className="invoice-container">
            <div className="invoice-head">
              <div className="invoice-head-top">
                <div className="invoice-head-top-left text-start">
                  <img src="" />
                </div>
                <div className="invoice-head-top-right text-end">
                  <h3>Invoice</h3>
                </div>
              </div>
              <div className="hr"></div>
              <div className="invoice-head-middle">
                <div className="invoice-head-middle-left text-start">
                  <p>
                    <span className="text-bold">Date</span>: {props.filteredDate}
                  </p>
                </div>
                <div className="invoice-head-middle-right text-end">
                  <p>
                    <span className="text-bold">Invoice No:</span>16789
                  </p>
                </div>
              </div>
              <div className="hr"></div>
              <div className="invoice-head-bottom">
                <div className="invoice-head-bottom-left">
                    
                        <ul>
                        <li className="text-bold">Invoiced To:</li>
                        <li>{props.custData.cust_name}</li>
                        <li>{props.custData.cust_flat}, {props.custData.cust_area}</li>
                        <li>{props.custData.cust_city}, {props.custData.cust_pin}</li>
                        <li>{props.custData.cust_state}</li>
                      </ul>
                    
                  
                </div>
                <div className="invoice-head-bottom-right">
                  <ul className="text-end">
                    <li className="text-bold">Pay To:</li>
                    <li>Koice Inc.</li>
                    <li>2705 N. Enterprise</li>
                    <li>Orange, CA 89438</li>
                    <li>contact@koiceinc.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="overflow-view">
              <div className="invoice-body">
                <table>
                  <thead>
                    <tr>
                      <td className="text-bold">Service</td>
                      <td className="text-bold">Description</td>
                      <td className="text-bold">Rate</td>
                      <td className="text-bold">Discount/Unit</td>
                      <td className="text-bold">QTY</td>
                      <td className="text-bold">Total Rate</td>
                      <td className="text-bold">Total Tax</td>
                      <td className="text-bold">Amount</td>
                    </tr>
                  </thead>
                  {props.invoiceItems.map((item, index) => (
                         <tbody>
                         <tr>
                           <td>{item.in_items}</td>
                           <td>Creating a website design</td>
                           <td>₹ {item.in_sale_price}</td>
                           <td>₹ {item.in_discount_value}</td>
                           <td>{item.in_qty}</td>
                           <td>{item.in_discount_price * item.in_qty}</td>
                           <td>{(item.in_gst_amt * item.in_qty).toFixed(2)}</td>
                           <td className="text-end">₹ {(item.in_qty * (item.in_discount_price + item.in_gst_amt)).toFixed(2)}</td>

                         </tr>
                         
                       </tbody>
                  ))}
                  
                </table>
                <div className="invoice-body-bottom">
                  <div className="invoice-body-info-item border-bottom">
                    <div className="info-item-td text-end text-bold">
                      Sub Total:
                    </div>
                    <div className="info-item-td text-end">₹ {totalRate}</div>
                  </div>
                  <div className="invoice-body-info-item border-bottom">
                    <div className="info-item-td text-end text-bold">Tax:</div>
                    <div className="info-item-td text-end">₹ {totalTax}</div>
                  </div>
                  <div className="invoice-body-info-item">
                    <div className="info-item-td text-end text-bold">
                      Total:
                    </div>
                    <div className="info-item-td text-end">₹ {totalRate + totalTax}</div>
                  </div>
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

export default Invoive;