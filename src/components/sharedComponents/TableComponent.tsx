/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/css/table.css";

export interface tableRowProps {
  [key: string]: any;
}

const Table = ({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: tableRowProps[];
}) => {
  return (
    <div className="saas-lab-table-container">
      <table role="table" className="saas-lab-table" aria-label={caption}>
        <thead>
          <tr role="row">
            {headers.map((header) => (
              <th key={header} scope="col" role="columnheader">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cell) => (
            <tr role="row" key={cell["s.no"]}>
              <td>{cell["s.no"]}</td>
              <td>{cell["amt.pledged"] || "-"}</td>
              <td>{cell["percentage.funded"] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
