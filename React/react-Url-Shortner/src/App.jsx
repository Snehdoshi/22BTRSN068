import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Container, Typography } from "@mui/material";
import UrlForm from "./Components/urlForm";
import UrlList from "./Components/UrlList";
import StatsPage from "./Components/StatsPage";
import RedirectHandler from "./Components/RedirectHandler";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#f50057", // pink
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: "1rem",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container className="container">
          <Typography variant="h4" align="center">
          </Typography>

          <Routes>
            <Route path="/" element={<><UrlForm /><UrlList /></>} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/:shortId" element={<RedirectHandler />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
