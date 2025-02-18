import { useState } from "react";
// components
import BasicLayout from "@/components/layouts/BasicLayout";
import Pagination from "@/components/sharedComponents/PaginationComponent";
import Table, {
  tableRowProps,
} from "@/components/sharedComponents/TableComponent";
import Loading from "@/components/sharedComponents/Loading";
// hooks
import { useFetchWithAbort } from "@/hooks/useFetch";
import { TABLE_HEADERS } from "@/utils/helper";
// utils
import { API_PATH, BASE_API_URL, ITEM_PER_PAGE, STEP } from "@/utils/constant";

const SaasLabsTablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, error, paginatedData, fetchedData } = useFetchWithAbort(
    `${BASE_API_URL}/${API_PATH}`,
    currentPage
  );

  const activeHandler = (page: number | null) => {
    setCurrentPage(page || 1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BasicLayout>
      <div className="table-container">
        <Table
          caption="Saas Lab Table"
          headers={TABLE_HEADERS}
          rows={paginatedData as tableRowProps[]}
        />
        <Pagination
          size={fetchedData?.length || 0}
          step={STEP}
          itemsPerPage={ITEM_PER_PAGE}
          onClickHandler={activeHandler}
        />
      </div>

      {error && (
        <small data-testid="error" className="error">
          Error: {error.message}
        </small>
      )}
    </BasicLayout>
  );
};

export default SaasLabsTablePage;
