import { CSVLink } from "react-csv";

function ExportButton({ children, data, extraClassName, fileName }) {
  return (
    <CSVLink filename={fileName} data={data} className={`${extraClassName}`}>
      {children}
    </CSVLink>
  );
}
export default ExportButton;
