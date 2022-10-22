import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PackageList from "./pages/PackageList";
import SinglePackage from "./pages/SinglePackage";
import NoMatch from "./pages/NoMatch";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4db6ac",
    },
    secondary: {
      main: "#6a1b9a",
    },
    background: {
      paper: "#caa4d2",
      default: "#67e2ce",
    },
    text: {
      primary: "rgba(7,12,8,0.87)",
      secondary: "rgba(53,59,37,0.54)",
    },
  },
});
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile">
              <Route
                path="/profile/package/:trackingNumber"
                element={<SinglePackage />}
              />
              <Route exact path="/profile/packages" element={<PackageList />} />
              <Route exact path="" element={<Profile />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
