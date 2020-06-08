const events = {
  ID1: {
    ID: 'ID1',
    team1: 'Спартак',
    team2: 'ЦСКА',
    place: 'Лужники',
    date: new Date(Date.now() - 2 * 86400000),
  },
  ID2: {
    ID: 'ID2',
    team1: 'Рубин',
    team2: 'Динамо',
    place: 'Казань Арена',
    date: new Date(Date.now() - 1 * 86400000),
  },
  ID3: {
    ID: 'ID3',
    team1: 'Зенит',
    team2: 'Челси',
    place: 'Стэмфорд',
    date: new Date(Date.now()),
  },
  ID4: {
    ID: 'ID4',
    team1: 'Барселона',
    team2: 'Ливерпуль',
    place: 'Энфилд',
    date: new Date(Date.now() + 1 * 86400000),
  },
  ID5: {
    ID: 'ID5',
    team1: 'Реал Мадрид',
    team2: 'Милан',
    place: 'Камп Ноу',
    date: new Date(Date.now() + 2 * 86400000),
  },
};

const eventIDs = ['ID1', 'ID2', 'ID3', 'ID4', 'ID5'];
const eventsLength = eventIDs.length;

const MONTHS = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}


const _pad = (n) => {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
};
const getTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${_pad(hours)}:${_pad(minutes)}`;
};

let currentIndex = 2;

const hex0 = $('#one');
const hex1 = $('#two');
const hex2 = $('#three');
const hex3 = $('#four');
const hex4 = $('#five');

const teamFirst = $('.team1');
const teamSecond = $('.team2');

const getEventByID = (ID) => events[ID];
const getEventByIndex = (index) => getEventByID(eventIDs[index]);


const render0 = () => {
  if (currentIndex >= 2) {
    console.log('0 is rendered');
    hex0.css('opacity', '1');
    const event = getEventByIndex(currentIndex - 2);
    const { date } = event;
    hex0.children()[0].innerText = date.getDate();
    hex0.children()[1].innerText = MONTHS[date.getMonth()];
  } else {
    console.log('0 isn\'t rendered');
    hex0.css('opacity', '0');
  }
}

const render1 = () => {
  if (currentIndex >= 1) {
    console.log('1 is rendered');
    hex1.css('opacity', '1');
    const event = getEventByIndex(currentIndex - 1);
    const { date } = event;
    hex1.children()[0].innerText = date.getDate();
    hex1.children()[1].innerText = MONTHS[date.getMonth()];
  } else {
    console.log('1 isn\'t rendered');
    hex1.css('opacity', '0');
  }
}

const render2 = () => {
  console.log('2 is rendered');
  hex2.css('opacity', '1');
  const event = getEventByIndex(currentIndex);
  const { date, place, team1, team2 } = event;
  hex2.children()[0].innerText = place;
  hex2.children()[1].innerText = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  hex2.children()[2].innerText = `${getTime(date)}`;
  teamFirst.children()[0].innerText = team1;
  teamSecond.children()[0].innerText = team2;
}

const render3 = () => {
  if (currentIndex < eventsLength - 1) {
    console.log('3 is rendered');
    hex3.css('opacity', '1');
    const event = getEventByIndex(currentIndex + 1);
    const { date } = event;
    hex3.children()[0].innerText = date.getDate();
    hex3.children()[1].innerText = MONTHS[date.getMonth()];
  } else {
    console.log('3 isn\'t rendered');
    hex3.css('opacity', '0');
  }
}

const render4 = () => {
  if (currentIndex < eventsLength - 2) {
    console.log('4 is rendered');
    hex4.css('opacity', '1');
    const event = getEventByIndex(currentIndex + 2);
    const { date } = event;
    hex4.children()[0].innerText = date.getDate();
    hex4.children()[1].innerText = MONTHS[date.getMonth()];
  } else {
    console.log('4 isn\'t rendered');
    hex4.css('opacity', '0');
  }
}

const renderHexs = () => {
  console.log(currentIndex);
  render0();
  render1();
  render2();
  render3();
  render4();
};

renderHexs();
$('.items').on('wheel', throttle(function(e) {
  e.preventDefault();
  if (e.originalEvent.deltaY > 0) {
    console.log('up');
    if (currentIndex > 0) {
      currentIndex--;
      renderHexs();
    }
  } else if (e.originalEvent.deltaY < 0) {
    console.log('down');
    if (currentIndex < eventsLength - 1) {
      currentIndex++;
      renderHexs();
    }
  }
}, 400));

$('.item-outer').on('click',function(e) {
  if(e.target.id == 'one' || $(e.target).parent()[0].id == 'one') {
    currentIndex = currentIndex-2;
      renderHexs();
  }
  else if(e.target.id == 'two' || $(e.target).parent()[0].id == 'two' ) {
    currentIndex = currentIndex-1;
      renderHexs();
  }

  else if(e.target.id == 'three' || $(e.target).parent()[0].id == 'three') {
    currentIndex = currentIndex;
      renderHexs();
  }

  else if(e.target.id == 'four' || $(e.target).parent()[0].id == 'four') {
    currentIndex = currentIndex+1;
      renderHexs();
  }

  else if(e.target.id == 'five' || $(e.target).parent()[0].id == 'five') {
    currentIndex = currentIndex+2;
      renderHexs();
  }
});

