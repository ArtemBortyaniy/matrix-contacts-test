import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { selectCount } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

export const MyPagination = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const count = useSelector(selectCount);
  const pageCount = Math.floor(count / 10) + (count % 10 > 0 ? 1 : 0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const newOffset: number = (page - 1) * 10;
    dispatch(fetchContacts(newOffset));
  };

  return count ? (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        sx={{
          "& .MuiPaginationItem-page": {
            color: "white",
            border: "1px solid white",
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            color: "black",
            background: "white",
            border: "1px solid white",
          },
        }}
        onChange={handlePageChange}
      />
    </Stack>
  ) : (
    <div></div>
  );
};
