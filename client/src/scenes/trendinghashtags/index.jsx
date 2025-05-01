import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTrendingHashtags } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const TrendingHashtags = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3, minWidth: 60 },
    {
      field: "hashtag",
      headerName: "Hashtag",
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: "postCount",
      headerName: "Posts Using Hashtag",
      flex: 1,
      minWidth: 160,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Top 11 Trending Hashtags on LinkedIn" />
      <Box
        m="40px auto 0 auto"
        height="70vh"
        width="100%"
        maxWidth="800px"
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
          rows={mockDataTrendingHashtags}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default TrendingHashtags;
