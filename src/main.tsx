import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Container from "./components/layout/Container";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SideBar from "./components/layout/SideBar";
import View from "./components/layout/View";
import "./index.css";
import Wrapper from "./components/layout/Wrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Container>
          <SideBar />
          <View />
        </Container>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  </StrictMode>
);
