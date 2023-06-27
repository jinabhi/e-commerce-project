import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { SellerMedia } from "../../../../apiEndPoints";
import {
  GradientButton,
  UploadDragger,
  SellerBreadcrumb,
} from "../../../../components";
import routesMap from "../../../../routeControl/sellerRoutes";
import { logger, modalNotification } from "../../../../utils";
import { SellerProductServices } from "../../../../services";
import config from "../../../../config";

function AddSellerProduct() {
  const [loading, setLoading] = useState(false);
  // const [sampleFileUrl, setSampleFileUrl] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Dynamic link for sample file will be implemented in future

  // const getSampleFileUrl = async () => {
  //   try {
  //     let response = await SellerProductServices.getSampleFileUrl();
  //     if (response.success) {
  //       setSampleFileUrl(response.data);
  //     }
  //   } catch (error) {
  //     logger(error);
  //   }
  // };

  // useEffect(() => {
  //   getSampleFileUrl();
  // }, []);

  const validation = () =>
    yup.object().shape({
      basePath: yup
        .string()
        .required(t("validation.sellerProductDetails.csvFile")),
    });

  const initialValues = {
    basePath: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let response = await SellerProductServices.bulkUploadProduct({
        ...values,
      });
      if (response.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        setLoading(false);
        navigate(routesMap.PRODUCTS.path);
      } else {
        modalNotification({
          type: "error",
          message: response?.message || "Upload failed",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  };

  const breadCrumb = [
    {
      name: t("text.sellerProductDetails.product"),
      path: routesMap.PRODUCTS.path,
    },
    { name: t("text.sellerProductDetails.bulkUploadProducts"), path: "#" },
  ];

  return (
    <main className="main-content addProduct pb">
      <div className="container">
        <SellerBreadcrumb breadcrumb={breadCrumb} />
        <section className="pb">
          <div className="addProduct_inner bg-850 p-30 radius-20">
            <div className="d-flex flex-wrap flex-sm-nowrap  align-items-center justify-content-between mb-3">
              <h5 className="addProduct_heading mb-0 w-100">
                {t("text.sellerProductDetails.uploadFile")}
              </h5>
              <a
                download
                target="_blank"
                // href={sampleFileUrl}
                href={`${config.BULK_UPLOAD_FILE}public/sample/product/product_sample.csv`}
                rel="noreferrer"
                className="btn btn-primary-outline d-inline-flex align-items-center flex-shrink-0 mt-2 mt-sm-0"
              >
                <em className="icon-download" />{" "}
                {t("text.sellerProductDetails.exampleCsv")}
              </a>
            </div>
            <div className="addProduct_bulkupload">
              <Formik
                initialValues={{ ...initialValues }}
                validationSchema={validation()}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {(props) => (
                  <Form>
                    <div className="drag-area mb-20">
                      <UploadDragger
                        name="basePath"
                        setFieldValue={props.handleChange}
                        apiEndPoints={SellerMedia.bulkUploadFile}
                      >
                        <div className="icon">
                          <em className="icon-bulk-upload" />
                        </div>
                        <p className="text-center">
                          <span>{t("text.sellerProductDetails.dropFile")}</span>{" "}
                          <br />
                          {t("text.common.or")}{" "}
                          <label>{t("text.sellerProductDetails.browse")}</label>
                        </p>
                      </UploadDragger>
                    </div>
                    <GradientButton
                      type="submit"
                      className="btn btn-primary btn-gradiant w-100 mt-3"
                      loading={loading}
                    >
                      {t("text.sellerProductDetails.upload")}
                    </GradientButton>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AddSellerProduct;
