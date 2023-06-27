import { useState } from "react";
import { Tag } from "antd";
import { useField } from "formik";

const { CheckableTag } = Tag;

function AntTags({ tagsData, name, ...rest }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    helpers.setValue(nextSelectedTags);
  };

  return (
    <>
      {tagsData.map((tag) => (
        <CheckableTag
          // className="customCheckbox-input customCheckbox-label d-flex align-items-center"
          name={name}
          key={tag}
          checked={selectedTags.indexOf(tag.id) > -1}
          onChange={(checked) => handleChange(tag.id, checked)}
        >
          <div className="form-group customCheckbox">
            <label
              htmlFor={tag.name}
              className="customCheckbox-label  d-flex align-items-center"
            >
              <span>
                <img
                  src={tag.categoryImageUrl}
                  alt="category img"
                  width="25px"
                />
              </span>
              {tag.name}
            </label>
          </div>
        </CheckableTag>
      ))}
    </>
  );
}

export default AntTags;
