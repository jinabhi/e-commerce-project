import { stringToHTML } from "../../../../utils";

export function ProductSpecification({ specificationData }) {
  return (
    <div
      className="tab-pane "
      id="specification"
      role="tabpanel"
      aria-labelledby="specification-tab"
    >
      <p className="list">{stringToHTML(specificationData || "-")}</p>
    </div>
  );
}
