import { useState } from "react";
import ServiceCard from "./ServiceCard.jsx";
import { services, categories, branches } from "../data/services.js";

// The "Find a service" page: a search box, a filter section that opens and
// closes, and the list of services.
// The ARIA bits I have to keep up to date as the person clicks:
//  - the "Filters" button has aria-expanded (true when the panel is open)
//  - each type button has aria-pressed (true when it is switched on)

function ServicesPage({ headingRef, onBook }) {
  const [searchText, setSearchText] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chosenTypes, setChosenTypes] = useState([]);
  const [chosenBranch, setChosenBranch] = useState("");

  // switch a type on if it is off, and off if it is on
  function toggleType(typeId) {
    if (chosenTypes.includes(typeId)) {
      setChosenTypes(chosenTypes.filter((id) => id !== typeId));
    } else {
      setChosenTypes([...chosenTypes, typeId]);
    }
  }

  function clearFilters() {
    setSearchText("");
    setChosenTypes([]);
    setChosenBranch("");
  }

  // work out which services to show
  const shownServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchText.toLowerCase()) ||
      service.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = chosenTypes.length === 0 || chosenTypes.includes(service.category);
    const matchesBranch = chosenBranch === "" || service.branch === chosenBranch;
    return matchesSearch && matchesType && matchesBranch;
  });

  const howMany = shownServices.length;
  const countText = howMany + (howMany === 1 ? " service found" : " services found");

  return (
    <div>
      {/* tabIndex -1 so the app can move focus here when the page changes */}
      <h1 ref={headingRef} tabIndex={-1}>
        Find a clinic service
      </h1>

      <section aria-labelledby="search-heading">
        <h2 id="search-heading">Search and filter</h2>

        <form role="search" aria-label="Search services" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="search-box">Search for a service</label>
            <input
              type="search"
              id="search-box"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-describedby="search-help"
            />
            <span id="search-help" className="help-text">
              For example: blood pressure, vaccination, baby. The list updates as you type.
            </span>
          </div>
        </form>

        <h3 className="accordion-heading">
          <button
            type="button"
            id="filters-button"
            className="accordion-button"
            aria-expanded={filtersOpen}
            aria-controls="filters-panel"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            Filters
            <span aria-hidden="true">{filtersOpen ? " (hide)" : " (show)"}</span>
          </button>
        </h3>

        <div id="filters-panel" role="group" aria-labelledby="filters-button" hidden={!filtersOpen}>
          <fieldset>
            <legend>Type of service</legend>
            <div className="button-row">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="toggle-button"
                  aria-pressed={chosenTypes.includes(category.id)}
                  onClick={() => toggleType(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="branch-filter">Branch</label>
            <select
              id="branch-filter"
              value={chosenBranch}
              onChange={(e) => setChosenBranch(e.target.value)}
            >
              <option value="">All branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="button-plain" onClick={clearFilters}>
            Clear search and filters
          </button>
        </div>
      </section>

      <section aria-labelledby="results-heading">
        <h2 id="results-heading">Services</h2>

        {/* polite so it does not cut off what the screen reader is already saying */}
        <p role="status" aria-live="polite" className="result-count">
          {countText}
        </p>

        {howMany === 0 && <p>No services match. Try clearing the search and filters.</p>}

        <ul className="service-list">
          {shownServices.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} onBook={onBook} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ServicesPage;
