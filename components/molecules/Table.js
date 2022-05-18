import React from "react";
import style from "../../styles/table.module.css";
import PropTypes from "prop-types";

Table.defaultProps = {
  headKeys: [],
  tableData: [{}],
  displayHead: false,
  displayComponent: false,
  selfDisplayComponent: false,
  showTableContainerHeader: false,
};
Table.propTypes = {
  headKeys: PropTypes.array,
  tableData: PropTypes.array.isRequired,
  displayHead: PropTypes.bool,
  showTableContainerHeader: PropTypes.bool,
};

/**
 * @headKeys  Array of table head
 * @tableData Array of table data
 * @selfDisplayComponent Bool if component should render custom comp
 * @returns React component
 */
function Table({
  headKeys,
  tableData,
  displayHead,
  displayComponent,
  selfDisplayComponent,
  children,
}) {
  const tableHead = headKeys.map((keyValue, i) => <th key={i}>{keyValue}</th>);
  const tableBody = tableData.map((data, i) => {
    const mapKeys = headKeys.map(({ headKeyValue }, j) => (
      <td key={j}>{data[headKeyValue]}</td>
    ));
    return <tr key={i}>{mapKeys}</tr>;
  });
  return (
    <div className={style.table_container}>
      {children && (
        <div className={style.table_container_header}>{children}</div>
      )}

      <table className={style.table}>
        {displayHead && (
          <thead>
            <tr>{tableHead}</tr>
          </thead>
        )}
        <tbody>{selfDisplayComponent ? displayComponent : tableBody}</tbody>
      </table>
    </div>
  );
}

export default Table;
