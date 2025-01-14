import React from "react";

const Reported = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>Name</th>
            <td>
              <button className="btn">Detials</button>
            </td>
            <td>
              <button className="btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reported;
