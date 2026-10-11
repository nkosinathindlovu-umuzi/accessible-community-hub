// The top of every page: the clinic name and the main menu.
// The menu uses buttons because I switch pages with state, not with a router.

const pages = [
  { id: "home", label: "Home" },
  { id: "services", label: "Find a service" },
  { id: "book", label: "Book a visit" },
];

function Header({ currentPage, onNavigate }) {
  return (
    <header>
      <p className="site-name">Midlands Community Clinic</p>
      <p>Book your clinic visit online - Pietermaritzburg and surrounds</p>

      <nav aria-label="Main menu">
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <button
                type="button"
                className="nav-button"
                aria-current={currentPage === page.id ? "page" : undefined}
                onClick={() => onNavigate(page.id)}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
