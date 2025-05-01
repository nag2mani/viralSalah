import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTrendingPosts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const TrendingPosts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3, minWidth: 60 },
    {
      field: "title",
      headerName: "Post Title",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "niche",
      headerName: "Niche",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "likes",
      headerName: "Likes",
      flex: 0.7,
      minWidth: 90,
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 0.7,
      minWidth: 90,
    },
    {
      field: "shares",
      headerName: "Shares",
      flex: 0.7,
      minWidth: 90,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Top 11 Trending Posts on LinkedIn" />
      <Box
        m="40px auto 0 auto"
        height="75vh"
        width="100%"
        maxWidth="1200px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataTrendingPosts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default TrendingPosts;
