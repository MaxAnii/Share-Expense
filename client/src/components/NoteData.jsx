import React from "react";

const NoteData = (props) => {
  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-target={`#myModal${props.noteid}`}
        data-bs-toggle="modal"
      >
        Open
      </button>

      <div
        className="modal fade"
        id={`myModal${props.noteid}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {props.name.toUpperCase()}
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div class="input-group mb-3 input-group-lg">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Reason Expense made for"
                    />

                    <input
                      type="number"
                      class="form-control"
                      placeholder="Amount you spend"
                      aria-label="Server"
                    />
                  </div>
                  <button type="submit" class="btn btn-dark">
                    Submit
                  </button>
                </form>
                <hr></hr>

                <div className="total-expense mb-3 ">
                  <div>This month's expense </div>
                  <div>1324</div>
                </div>

                <hr></hr>
                <h5>All Expenses</h5>
              </div>
              <div className="overflow-table">
                <table class="table table-striped table-borderless">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr className="data-row">
                      <td className="date-cell">2023-30-07</td>
                      <td className="reason-cell ">
                        dfgsdfg fdsgdfsgdsfg sdfgsbsfd ghsbsh{" "}
                      </td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr className="data-row">
                      <td className="date-cell">Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteData;
