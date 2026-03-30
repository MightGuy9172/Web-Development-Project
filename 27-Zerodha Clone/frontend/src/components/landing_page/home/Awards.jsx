import largeBroker from "@/assets/largestBroker.svg";
import pressLogo from "@/assets/pressLogos.png";

function Awards() {
  return (
    <div className="container p-5 mt-5 ">
      <div className="row">
        <div className="col-6 p-5">
          <img src={largeBroker} alt="largest-broker" />
        </div>
        <div className="col-6 p-5 mt-3">
          <h1>Largest Stock Broker in India.</h1>
          <p className="mb-5">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Future and Options</p>
                </li>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Currency derivatives</p>
                </li>
                <li>
                  <p>Bonds</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
              </ul>
            </div>
            <img src={pressLogo} alt="press-logo" style={{ width: "90%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
