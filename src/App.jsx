import React from "react";
import ModernMainPage from "./pages/ModernMainPage";
import Review from "./pages/Review";
import Restaurant from "./pages/Restaurant";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import NewGlobalStyles from "./styles/NewGlobalStyles";
import newTheme from "./styles/newTheme";
import ModernLayout from "./component/Layout/ModernLayout";

function App() {
  return (
    <ThemeProvider theme={newTheme}>
      <NewGlobalStyles />
      <div className="App">
        <div className="Content">
          <Router>
            <ModernLayout>
              <Routes>
                <Route path="/" element={<ModernMainPage />} />
                <Route path="/restaurant/:id/review" element={<Review />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
              </Routes>
            </ModernLayout>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
