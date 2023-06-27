import { stringToHTML } from "../../../../utils";

export function ProductOverView({ overViewData }) {
  return (
    <div
      className="tab-pane fade show active"
      id="overview"
      role="tabpanel"
      aria-labelledby="overview-tab"
    >
      <p className="list">{stringToHTML(overViewData || "-")}</p>
    </div>
  );
}
