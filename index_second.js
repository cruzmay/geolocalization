let locations = [
  {
    city: "Portland",
    lat: 45.516022,
    long: -122.681427,
    order: 1,
    services: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  },
  {
    city: "Eugene",
    lat: 144.052071,
    long: -123.086754,
    order: 2,
    services: [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 14],
  },
  {
    city: "Salem",
    lat: 44.942898,
    long: -123.035095,
    order: 3,
    services: [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 14],
  },
  {
    city: "Vancouver",
    lat: 45.635513,
    long: -122.557831,
    order: 4,
    services: [1, 2, 3, 4, 5, 6, 7, 14],
  },
  {
    city: "Seattle",
    lat: 47.606209,
    long: -122.332069,
    order: 4,
    services: [1, 2, 3, 4, 5, 6, 7, 9, 13, 14, 15, 16],
  },
  {
    city: "Denver/Boulder",
    lat: 39.739235,
    long: -104.99025,
    order: 6,
    services: [1, 2, 5, 6, 14],
  },
  {
    city: "Boise/Meridian",
    lat: 43.615021,
    long: -116.202316,
    order: 5,
    services: [1, 2, 5, 6, 14],
  },
];
const tableContainer = document.querySelector(".table__content");

const createTable = () => {
  const table = document.createElement("table");
  const tableHTML = `
        <thead class="upper_menu">
          <th class="upper_service__title">Service Line</th>
        </thead>`;
  table.innerHTML = tableHTML;
  tableContainer.append(table);
};
createTable();

const tableHeader = document.querySelector(".upper_menu");

const createTableHeader = (city, tableHeader) => {
  const th = document.createElement("th");
  const thHTML = `${city}`;
  th.innerHTML = thHTML;
  tableHeader.childNodes[1].appendChild(th);
};

locations.forEach((data) => createTableHeader(data.city, tableHeader));
