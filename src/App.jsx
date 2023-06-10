import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; //Run npm install react-router-dom@6.2.1 +If you're getting a dependency error and it won't let you install it, add --force to override npm and install it anyway.
import Details from "./Details";

const App = () => {
  return (
    <div>
      <ThemeContext.Provider value={theme}>
    <StrictMode>
      <BrowserRouter>
        {/*anytime you use link tag it should be inside your browser router */}
        <header>
          <Link to="/">Adopt Me!</Link>
          {/*when clicking the adobt me logo it will return the user to the home page*/}
          {/* as long as you're doing internal links
          to your website use Links instead of (a) tags */}
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          {/*id part is a */}
          varaible
          <Route path="/" element={<SearchParams />} />
          {/* / is the home page */}
        </Routes>
      </BrowserRouter>
    </StrictMode>
    </ThemeContext.Provider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
