import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataCreators } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Creators = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3, minWidth: 60 },
    {
      field: "name",
      headerName: "Creator",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "niche",
      headerName: "Niche",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "followers",
      headerName: "Followers",
      flex: 0.7,
      minWidth: 120,
    },
    {
      field: "posts",
      headerName: "Posts",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "engagementRate",
      headerName: "Engagement Rate",
      flex: 0.7,
      minWidth: 130,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Top 11 Creators In Your Niche" />
      <Box
        m="40px auto 0 auto"
        height="75vh"
        width="100%"
        maxWidth="1200px" // limit width for desktop
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none", // hide footer
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
          rows={mockDataCreators}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default Creators;
