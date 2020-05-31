const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
//movieselect.value is string to change it to number 1.ass + 2.parseint()

populateUI();
let ticketprice = +movieSelect.value;

function setMoviedata(movieindex, movieprice) {
  localStorage.setItem("selectedmovieindex", movieindex);
  localStorage.setItem("selectedmovieprice", movieprice);
}

//update total and count
function updateSelectedCount() {
  const selectedseats = document.querySelectorAll(".row .seat.selected");
  //  gives a nodelist-convert to array using spread and map throgh this
  const seatsIndex = [...selectedseats].map(function (seat) {
    //find index of seat from all seats
    return [...seats].indexOf(seat);
  });
  //   console.log(seatsIndex);
  //STORE IN LOCAL STORAGE NOW
  //key,value ppair both string and seatsInde is an array therefore wrap in stringify
  localStorage.setItem("selectedseats", JSON.stringify(seatsIndex));

  //local storage-save the selected seats such that on refreshing page they arent lost
  //selected seat returns a nodelist of all same eleemtns thus we store the indexes in an array
  //COPY SLECTED SEATS IN AN ARRAY
  //MAP THROUGH ARRAY
  //RETURN A NEW ARRAY INDEXES

  const selectedseatscount = selectedseats.length;
  //   console.log(selectedseatscount);
  count.innerText = selectedseatscount;
  total.innerText = selectedseatscount * ticketprice;
}

//get data from local storage and populate UI
function populateUI() {
  //we get it in string form,want it back in an array therefore parse
  const selectedseats = JSON.parse(localStorage.getItem("selectedseats"));
  //now if there are seats in the local storage we wanna loop through them and add selected class to them
  if (selectedseats !== null && selectedseats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedseats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedmovieindex = localStorage.getItem("selectedmovieindex");
  if (selectedmovieindex !== null) {
    movieSelect.selectedIndex = selectedmovieindex;
  }
}

//MOVIE SELECT EVENT-change krenge theregore change event fires off
movieSelect.addEventListener("change", function (e) {
  ticketprice = +e.target.value;

  //save name and price too in local storage
  setMoviedata(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

//SEAT CLICK EVENT
//on clicking on seat change it to selected
//do this either by looping through seats using for each or
//easier way-add on container and then when we click make sure its a seat then add
container.addEventListener("click", (e) => {
  //check if it is a seat or not,and if it is occupied or not then add event
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //.add can also be used but then on unselecting it does not delete the class
    e.target.classList.toggle("selected");
    //update total and count now
    updateSelectedCount();
  }
});

//initial count and total set
updateSelectedCount();
