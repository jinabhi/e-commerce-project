import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AddAndEditIcon } from "../../..";
import {
  actionFormatter,
  Breadcrumb,
  DataTable,
  getText,
  ListingHeader,
  ManageCmsForm,
  MetaTags,
  ModalComponent,
  PageHeader,
  SweetAlert,
} from "../../../../../components";

import routesMap from "../../../../../routeControl/adminRoutes";
import { commonServices, HowItWorksServices } from "../../../../../services";
import {
  logger,
  modalNotification,
  readMoreTextShow,
  stringToHTML,
} from "../../../../../utils";

function HowItWorks() {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [readDescription, setReadDescription] = useState("");
  const [rowData, setRowData] = useState();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [tableLoader, setTableLoader] = useState(false);
  const [initialData, setInitialData] = useState();
  const param = useParams();
  const [rowId, setRowId] = useState();

  const getHowItWorksData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {};
      const res = await HowItWorksServices.getHowItWorksService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setState(data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getHowItWorksData();
  }, []);

  const getHowItWorksEditerData = async (id) => {
    try {
      const res = await commonServices.getManageCmsModuleService(id);
      const { success, data } = res;
      if (success) {
        setInitialData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getHowItWorksEditerData(param.id);
  }, []);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let bodyData = {
        description: values.description,
      };
      const res = await commonServices.updateManageCmsService(
        bodyData,
        param.id
      );
      const { success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message: t("text.howItWorks.updateMessage"),
        });
        navigate(routesMap.MANAGE_CMS.path);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const onCancel = () => {
    navigate(routesMap.MANAGE_CMS.path);
  };

  const deleteHowItWorks = async (id) => {
    setLoading(true);
    try {
      const res = await HowItWorksServices.deleteHowItWorksService(id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        getHowItWorksData();
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const onHandleShow = () => {
    setShow(true);
  };

  const onConfirmAlert = () => {
    setLoading(false);
    deleteHowItWorks(rowId);
    setIsAlertVisible(false);
    return true;
  };

  const showAddEditModal = (data) => {
    setAddMore(true);
    setRowData(data);
  };
  const closeAddEditModal = () => {
    setAddMore(false);
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          onHandleShow();
          setReadDescription(row.description);
        },
      },
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-edit",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          showAddEditModal(row);
        },
      },
      {
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setRowId(row.id);
        },
      },
    ];

    return optionsArr;
  };

  const columns = [
    {
      dataField: "title",
      text: t("text.howItWorks.title"),
    },
    {
      dataField: "description",
      text: t("text.common.description"),
      formatter: (cell, row) => readMoreTextShow(getText(row?.description)),
    },

    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "nk-tb-col-tools text-right nosort sorting_disabled",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.child.dashboard"),
    },
    {
      path: routesMap.MANAGE_CMS.path,
      name: t("text.manageCms.pageTitle"),
    },
    {
      path: "#",
      name: t("text.howItWorks.pageTitle"),
    },
  ];

  return (
    <>
      <MetaTags title={t("text.howItWorks.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.howItWorks.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <ManageCmsForm
        onSubmit={onSubmit}
        loading={loading}
        onCancel={onCancel}
        initialData={initialData}
      />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <h3 className="title  ">{t("text.howItWorks.editIconSection")}</h3>

          <ListingHeader
            heading={t("text.howItWorks.addMoreIcon")}
            btnText={t("text.howItWorks.addMoreIcon")}
            onHandleShow={(e) => {
              e.preventDefault();
              showAddEditModal();
            }}
            btnArray={["create"]}
          />
        </div>
      </div>
      <div className="col-12">
        <div className="common-table table-responsive">
          <DataTable
            tableData={state}
            tableColumns={columns}
            pagination={false}
            header={false}
            bordered
            tableLoader={tableLoader}
          />
        </div>
      </div>
      <ModalComponent
        show={show}
        extraClassName="modal-md"
        onHandleCancel={() => {
          setShow(false);
        }}
        title={t("text.howItWorks.icon")}
      >
        <p className="text-break">{stringToHTML(readDescription)}</p>
      </ModalComponent>

      <ModalComponent
        show={addMore}
        onHandleCancel={() => closeAddEditModal()}
        title={
          rowData?.id
            ? t("text.howItWorks.editIconSection")
            : t("text.howItWorks.addMoreIcon")
        }
      >
        <AddAndEditIcon
          onHandleHide={() => closeAddEditModal()}
          rowData={rowData}
          getHowItWorksData={getHowItWorksData}
        />
      </ModalComponent>

      <SweetAlert
        reverseButtons
        title={t("text.howItWorks.delete")}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        cancelButtonText={t("text.common.no")}
        confirmButtonText={t("text.common.yes")}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        onConfirmAlert={() => onConfirmAlert()}
      />
    </>
  );
}

export default HowItWorks;
