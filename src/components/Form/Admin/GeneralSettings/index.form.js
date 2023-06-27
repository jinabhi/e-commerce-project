import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { Input as TextInput, CommonButton, CustomCheckbox } from "../../..";
import validation from "./validation";

function GeneralSettingForm({
  onSubmit,
  show,
  editGeneral,
  cancelEdit,
  loading,
  formRef,
  initialValues,
  promotionVideoChecked,
  setPromotionVideoChecked,
}) {
  const { t } = useTranslation();
  useEffect(() => {}, [promotionVideoChecked, initialValues]);

  function preventKeys(e) {
    if (
      e.keyCode === 189 ||
      e.keyCode === 187 ||
      e.keyCode === 190 ||
      e.keyCode === 110 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 69
    ) {
      e.preventDefault();
    }
  }
  return (
    <>
      {" "}
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validation()}
        onSubmit={onSubmit}
        innerRef={formRef}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form>
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category-name">
                      {t("text.generalSetting.tax")}
                    </label>
                    <div className="form-control-wrap">
                      <TextInput
                        className="form-control"
                        type="number"
                        name="tax"
                        disabled={!show}
                        variant="standard"
                        placeholder={t("text.generalSetting.enterAmount")}
                        setFieldValue={props.handleChange}
                        onKeyDown={(e) => {
                          preventKeys(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mt-4">
                    <div className=" form-control-wrap">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <label
                            className="form-label mt-2 mb-0"
                            htmlFor="category-name"
                          >
                            {t("text.generalSetting.creditPoints1")}
                          </label>
                        </div>
                        <span className="px-3 mt-2">=</span>
                        <span
                          className="px-1 mt-2"
                          style={{ fontSize: "16px" }}
                        >
                          &#x20B9;
                        </span>
                        <div className="w-100 mt-1">
                          <TextInput
                            className="form-control"
                            type="number"
                            name="credit_point"
                            disabled={!show}
                            variant="standard"
                            placeholder={t(
                              "text.generalSetting.creditPerPoints"
                            )}
                            setFieldValue={props.handleChange}
                            onKeyDown={(e) => {
                              preventKeys(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category-name">
                      {t("text.generalSetting.minQuantityOfProduct")}
                    </label>
                    <div className="form-control-wrap">
                      <TextInput
                        className="form-control"
                        type="number"
                        name="minimum_quantity_product"
                        disabled={!show}
                        variant="standard"
                        placeholder={t("text.generalSetting.enterQuantity")}
                        setFieldValue={props.handleChange}
                        onKeyDown={(e) => {
                          preventKeys(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category-name">
                      {t("text.generalSetting.commission")}
                    </label>
                    <div className="form-control-wrap">
                      <TextInput
                        className="form-control"
                        type="number"
                        name="commission"
                        disabled={!show}
                        variant="standard"
                        placeholder={t("text.generalSetting.enterCommission")}
                        setFieldValue={props.handleChange}
                        onKeyDown={(e) => {
                          preventKeys(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <CustomCheckbox
                        className="custom-control-input"
                        type="checkbox"
                        id="checkbox"
                        name="promotion_video"
                        setFieldValue={props.handleChange}
                        disabled={!show}
                        onChange={(e) => {
                          props.setFieldValue(
                            "promotion_video",
                            e.target.checked
                          );
                          setPromotionVideoChecked(e.target.checked);
                        }}
                        checked={promotionVideoChecked}
                      >
                        <label
                          className="custom-control-label form-label"
                          htmlFor="checkbox"
                        >
                          {t("text.generalSetting.promotionalVideo")}
                        </label>
                      </CustomCheckbox>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                {show ? (
                  <>
                    <div className="mt-4 text-right">
                      <CommonButton
                        variant="outline-primary mr-2"
                        loading={loading}
                        onClick={cancelEdit}
                      >
                        {t("text.common.cancel")}
                      </CommonButton>

                      <CommonButton
                        extraClassName="btn btn-primary"
                        type="submit"
                        loading={loading}
                        htmlType="submit"
                      >
                        {t("text.common.update")}
                      </CommonButton>
                    </div>
                  </>
                ) : (
                  <CommonButton
                    onClick={() => editGeneral()}
                    extraClassName="btn btn-primary"
                    type="button"
                    loading={loading}
                    htmlType="submit"
                  >
                    {t("text.common.edit")}
                  </CommonButton>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default GeneralSettingForm;
