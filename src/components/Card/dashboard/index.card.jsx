import React from "react";
import { Card } from "../../Antd";
import "./style.scss";

function DashboardCard(props) {
  const { title, loading, data, icon } = props;
  return (
    <div className="col-3 mx-3">
      <Card
        title={title}
        bordered={false}
        loading={loading}
        className="dashboard-card"
      >
        <p>
          {icon} {data}
        </p>
      </Card>
    </div>
  );
}

export default DashboardCard;
