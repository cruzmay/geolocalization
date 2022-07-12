//variables, query selectors

const dropdown = document.querySelector(".locations__dropdown");
const locationSelector = document.querySelector(".locations_selector");
const dropboxSelector = document.querySelector(".box__selector");
const dropdownOpened = document.querySelector(".locations__box");
const dropdownList = document.querySelector("ul");
const dropdownItems = document.querySelectorAll("li");
const tableHeader = document.querySelector(".upper_menu");
const mobileTableHeader = document.querySelector(".mobile_menu");
const table = document.querySelector(".desktop_table");
const mobileTable = document.querySelector(".mobile_table");
const upperTitle = document.querySelector(".upper_service__title");

let currrentPos = [];
let loading = true;

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

const services = [
  {
    service: "Urgent Care",
    id: 1,
  },
  {
    service: "Primary Care",
    id: 2,
  },
  {
    service: "Emergency Care",
    id: 3,
  },
  {
    service: "Family Medicine",
    id: 4,
  },
  {
    service: "COVID-19 Testing",
    id: 5,
  },
  {
    service: "Virtual Care",
    id: 6,
  },
  {
    service: "Mental Health Meds & More",
    id: 7,
  },
  {
    service: "Mental Health Talk Therapy",
    id: 8,
  },
  {
    service: "Women’s Health",
    id: 9,
  },
  {
    service: "Dermatology",
    id: 10,
  },
  {
    service: "Orthopedics",
    id: 11,
  },
  {
    service: "Podiatry",
    id: 12,
  },
  {
    service: "Physical Therapy",
    id: 13,
  },
  {
    service: "Sports Physicals",
    id: 14,
  },
  {
    service: "Chiropractic",
    id: 15,
  },
  {
    service: "X-Ray & Imaging",
    id: 16,
  },
];
//create UI

//generate dropdown menu items
const createDropdownItem = (city) => {
  const li = document.createElement("li");
  const liHtml = `<a>${city}</a>
  <i class="icon_hide"><img src="./assets/SVG/available.svg" alt="location selected"/></i>`;
  li.innerHTML = liHtml;
  dropdownList.append(li);
  return li;
};

//generate table headers
const createTableHeader = (city, tableHeader) => {
  const th = document.createElement("th");
  const thHTML = `${city}`;
  th.innerHTML = thHTML;
  tableHeader.childNodes[3].append(th);
};
//generate title
const serviceLineTitle = (header) => {
  const tr = document.createElement("tr");
  header.append(tr);
  const serviceLine = document.createElement("th");
  serviceLine.setAttribute("class", "upper_service__title");
  serviceLine.innerText = "Service Line";
  tr.appendChild(serviceLine);
};
//create Rows
const creaTableRows = (data, filteredLocations, last, table) => {
  const tr = document.createElement("tr");
  const trHTML = `<td class="service_line__title">${data.service}</td>`;
  tr.innerHTML = trHTML;
  tr.setAttribute("class", "serv_row");
  table.append(tr);
  filteredLocations.forEach((city) => createColumns(city, data, last));
};

//create Columns width conditionals to highlight available services
const createColumns = (locations, services, last) => {
  let servicesRows = document.querySelectorAll(".serv_row");
  const td = document.createElement("td");
  td.setAttribute("align", "center");
  //conditionals so it will higlighted depending the case
  if (locations.services.includes(services.id) && services.id !== 1) {
    td.setAttribute("class", "highlighted_item");
  }
  if (locations.services.includes(services.id) && services.id === 1) {
    td.setAttribute("class", "highlighted_item_start");
  }
  if (locations.services.includes(services.id) && services.id === last) {
    td.setAttribute("class", "highlighted_item_end");
  }
  if (
    locations.services.includes(services.id) &&
    !locations.services.includes(services.id + 1) &&
    services.id !== last
  ) {
    td.setAttribute("class", "highlighted_item_end");
  }
  if (
    locations.services.includes(services.id) &&
    !locations.services.includes(services.id - 1) &&
    services.id !== 1
  ) {
    td.setAttribute("class", "highlighted_item_start");
  }
  if (
    locations.services.includes(services.id) &&
    !locations.services.includes(services.id + 1) &&
    !locations.services.includes(services.id - 1)
  ) {
    td.setAttribute("class", "highlighted_item_isolate");
  }

  const tdHTML = `<div><img src=${
    locations.services.includes(services.id)
      ? "./assets/SVG/available.svg"
      : "./assets/SVG/noAvaliable.svg"
  } alt="${
    locations.services.includes(services.id)
      ? services.service + " available in " + locations.city
      : services.service + " no available in " + locations.city
  }" /></div>`;
  td.innerHTML = tdHTML;
  Object.values(servicesRows).forEach((data) => data.append(td));
};

//create locations dropdowns
locations.forEach((data) => createDropdownItem(data.city));

//create table
serviceLineTitle(tableHeader);
locations.forEach((data) => createTableHeader(data.city, tableHeader));
services.forEach((data) =>
  creaTableRows(data, locations, services.length, table)
);

// Geolocalization

const getCoords = (pos) => {
  const coord = pos.coords;
  currrentPos.push(coord);
  loading = false;

  const near = locations
    .map((data) => {
      const distance =
        Math.abs(currrentPos[0].latitude - data.lat) +
        Math.abs(currrentPos[0].longitude - data.long);
      return {
        ...data,
        distance: parseInt(distance * 100 * 0.62137),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  console.log(near);
};

// navigator.geolocation.getCurrentPosition(getCoords);

//activate unactivate dropdown

dropdown.addEventListener("click", (e) => {
  dropdownOpened.classList.toggle("show_dropdown");
  const li = document.querySelectorAll("li");
  const selected = Object.values(li).find(
    (data) => data.innerText === locationSelector.innerText
  );
  Object.values(li)
    .filter((data) => data.innerText !== locationSelector.innerText)
    .forEach((data) => data.childNodes[2].removeAttribute("style"));
  selected?.childNodes[2].setAttribute("style", "display: block");
});

dropdownList.addEventListener("click", (e) => {
  Object.values(mobileTable.children).forEach((data) => data.remove());

  if (e.target.innerText !== "Choose Location") {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const thTitle = document.createElement("th");
    const thLocation = document.createElement("th");
    thLocation.innerText = e.target.innerText;
    thead.setAttribute("class", "upper_menu mobile_menu");
    thTitle.setAttribute("class", "upper_service__title");
    thTitle.innerText = "Service Line";
    mobileTable.append(thead);
    thead.append(tr);
    tr.append(thTitle);
    tr.append(thLocation);

    serviceLineTitle(mobileTableHeader);
    const findLocation = locations.find(
      (data) => data.city === e.target.innerText
    );
    locationSelector.childNodes[1].innerText = findLocation?.city;
    const filteredLocations = locations.filter(
      (data) => data.city === findLocation.city
    );
    filteredLocations.forEach((data) =>
      createTableHeader(data.city, mobileTableHeader)
    );
    services.forEach((data) =>
      creaTableRows(data, filteredLocations, services.length, mobileTable)
    );
  }

  //add shadow on mobile
  const intersectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio <= 0) {
      document.querySelector(".mobile_menu").classList.add("shadow");
    } else {
      document.querySelector(".mobile_menu").classList.remove("shadow");
    }
  });
  intersectionObserver.observe(document.querySelector(".mobile_menu"));
});

// add menu shadow on desktop
const intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries[0].intersectionRatio <= 0) {
    document.querySelector(".desktop_menu").classList.add("shadow");
  } else {
    document.querySelector(".desktop_menu").classList.remove("shadow");
  }
});
intersectionObserver.observe(document.querySelector(".desktop_menu"));
