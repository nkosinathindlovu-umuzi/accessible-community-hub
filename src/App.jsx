import { useState, useRef, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./components/HomePage.jsx";
import ServicesPage from "./components/ServicesPage.jsx";
import BookingPage from "./components/BookingPage.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";

// The page titles. I change document.title when the page changes so a screen
// reader user hears which page they are on.
const pageTitles = {
  home: "Home",
  services: "Find a service",
  book: "Book a visit",
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [booking, setBooking] = useState(null);

  // the page heading that gets focus when the page changes
  const headingRef = useRef(null);
  const lastPage = useRef(currentPage);

  useEffect(() => {
    document.title = pageTitles[currentPage] + " - Midlands Community Clinic";

    // only move focus when the page really changed, not when the app first loads
    if (lastPage.current !== currentPage) {
      lastPage.current = currentPage;
      if (headingRef.current) {
        headingRef.current.focus();
      }
    }
  }, [currentPage]);

  function goToPage(pageId) {
    // if they use the menu to book, they have not picked a service yet
    if (pageId === "book") {
      setSelectedService(null);
    }
    setCurrentPage(pageId);
  }

  function bookService(service) {
    setSelectedService(service);
    setCurrentPage("book");
  }

  function findMoreServices() {
    setBooking(null);
    setCurrentPage("services");
  }

  return (
    <>
      {/* "inert" switches the whole page off while the popup is open, so
          neither the keyboard nor a screen reader can get to it */}
      <div inert={booking !== null}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <Header currentPage={currentPage} onNavigate={goToPage} />

        <main id="main-content" tabIndex={-1}>
          {currentPage === "home" && <HomePage headingRef={headingRef} onNavigate={goToPage} />}
          {currentPage === "services" && <ServicesPage headingRef={headingRef} onBook={bookService} />}
          {currentPage === "book" && (
            <BookingPage
              key={selectedService ? selectedService.id : "none"}
              headingRef={headingRef}
              selectedService={selectedService}
              onBooked={setBooking}
            />
          )}
        </main>

        <Footer />
      </div>

      {booking && (
        <ConfirmModal booking={booking} onClose={() => setBooking(null)} onFindMore={findMoreServices} />
      )}
    </>
  );
}

export default App;
