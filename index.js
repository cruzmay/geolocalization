//variables, query selectors

const dropdown = document.querySelector(".locations__dropdown");
const locationSelector = document.querySelector(".locations_selector");
const dropboxSelector = document.querySelector(".box__selector");
const dropdownOpened = document.querySelector(".locations__box");
const dropdownList = document.querySelector("ul");
const dropdownItems = document.querySelectorAll("li");
const tableHeader = document.querySelector(".upper_menu");

let currrentPos = [];
let loading = true;

const locations = [
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
  },
  {
    city: "Salem",
    lat: 44.942898,
    long: -123.035095,
    order: 3,
  },
  {
    city: "Seattle",
    lat: 47.606209,
    long: -122.332069,
    order: 4,
  },
  {
    city: "Idaho",
    lat: 43.615021,
    long: -116.202316,
    order: 5,
  },
  {
    city: "Colorado",
    lat: 39.739235,
    long: -104.99025,
    order: 6,
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
  const liHtml = `<a href="#">${city}</a>
  <i class="icon_hide"><img src="./assets/SVG/available.svg" alt="location selected"/></i>`;
  li.innerHTML = liHtml;
  dropdownList.append(li);
  return li;
};

//generate table headers
const createTableHeader = (city) => {
  const th = document.createElement("th");
  const thHTML = `${city}`;
  th.innerHTML = thHTML;
  tableHeader.childNodes[1].appendChild(th);
  return th;
};

//create locations dropdowns
locations.forEach((data) => createDropdownItem(data.city));
locations.forEach((data) => createTableHeader(data.city));

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

navigator.geolocation.getCurrentPosition(getCoords);

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
  if (e.target.innerText !== "Choose Location") {
    const findLocation = locations.find(
      (data) => data.city === e.target.innerText
    );
    locationSelector.childNodes[1].innerText = findLocation?.city;
  }
});
