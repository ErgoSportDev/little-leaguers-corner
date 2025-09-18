import { useState, useEffect, useCallback, useRef } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/react-big-calendar.css'
import moment from 'moment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import supabase from "../supabase-client";
import { ChevronRight, ChevronLeft } from "lucide-react";

const EventCalendar = () => {

  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [esemenyek, setEsemenyek] = useState([]);
  const [singleEvents, setSingleEvents] = useState([]);
  const [recurringEvents, setRecurringEvents] = useState([]);

  const currentYear = moment().year();
  const today = moment();
  let oneMonthBefore = moment().subtract(1, 'months').format('YYYY-MM-DD');
  const endOfSummerDate = moment(`${currentYear}-10-31T23:50:00`);
  const endOfWinterDate = moment(`${currentYear}-03-31T23:50:00`);
  let isSummerSchedule = ""

  const containerRef = useRef(null);
  const scrollRef = useRef({});
  const clickRef = useRef(null)
  let prevID = null;

  const localizer = momentLocalizer(moment)

  moment.locale('hu', {
    week: {
      dow: 1,
      doy: 1,
    },
    longDateFormat: {
      LT: 'HH:mm',         // Time
      LTS: 'HH:mm:ss',     // Time with seconds
      L: 'YYYY.MM.DD.',    // Short date
      LL: 'YYYY. MMMM D.', // Long date
      LLL: 'YYYY. MMMM D. HH:mm',
      LLLL: 'YYYY. MMMM D., dddd HH:mm',
    },
    weekdays: [
      'Vasárnap', 'Hétfő', 'Kedd', 'Szerda',
      'Csütörtök', 'Péntek', 'Szombat'
    ],
    weekdaysShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
    weekdaysMin: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
    months: [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ],
    monthsShort: [
      'Jan', 'Feb', 'Márc', 'Ápr', 'Máj', 'Jún',
      'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'
    ]
  });

  const culture = {
    week: 'Hét',
    work_week: 'Munka Hét',
    day: 'Nap',
    month: 'Hónap',
    previous: 'Előző',
    next: 'Következő',
    today: 'Ma',
    agenda: 'Napirend',

    showMore: (total) => `+${total} esem...`,
  }

  useEffect(() => {
    determineSchedule()
  }, []);

  useEffect(() => {
    fetchTodos();
    fetchRecurring();
  }, []);

  useEffect(() => {
    let finalFormArr = singleEvents.concat(recurringEvents) //concatanate single and recurring events into one array
    finalFormArr.sort((a, b) => a.start - b.start); //needs to be sorted so the cards show up in correct order
    setEsemenyek(finalFormArr)
  }, [recurringEvents, singleEvents]);

  //determines if it is summer schedule or winter and sets the isSummerSchedue STRING ‼‼‼
  const determineSchedule = () => {
    if (today.isBefore(endOfSummerDate) && today.isAfter(endOfWinterDate)) {
      isSummerSchedule = "TRUE"
    } else {
      isSummerSchedule = "FALSE"
    }
  }

  //fetching events from supabase
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("Events")
      .select("*")
      .gte('start', oneMonthBefore)
      .order('start', { ascending: true });
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setSingleEvents(createDate(data))
    }
  };

  //fetching recurring events from supabase
  const fetchRecurring = async () => {
    const { data, error } = await supabase
      .from("RecurringEvents")
      .select("*")
      .eq("summer_schedule", isSummerSchedule)
      .order('start', { ascending: true });
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setRecurringEvents(addRecurringTrainings(data))
    }
  };

  //expands the recurring events till the end of the given schedule
  const addRecurringTrainings = (data) => {
    let recurringEvents = [];
    let currentScheduleEnd = moment()

    if (isSummerSchedule == "TRUE") {
      currentScheduleEnd = endOfSummerDate
    } else {
      if (endOfSummerDate.isBefore(today)) {
        currentScheduleEnd = endOfWinterDate.add(1, 'year'); //1 year added since displaying recurring events would not work
      } else {
        currentScheduleEnd = endOfWinterDate
      }
    }

    //for each event, add weekly recurrences until endDateTime
    data.forEach(e => {
      let startMoment = moment(e.start);
      let endMoment = moment(e.end);

      while (startMoment.isBefore(currentScheduleEnd) && endMoment.isBefore(currentScheduleEnd)) {
        if (startMoment.isBefore(oneMonthBefore)) {
          startMoment.add(7, 'days');
          endMoment.add(7, 'days');
        } else {
          recurringEvents.push({
            created_at: e.created_at,
            desc: e.desc,
            end: endMoment.clone().toDate(),
            id: e.id + startMoment.clone().toDate().toString(),
            location: e.location,
            start: startMoment.clone().toDate(),
            title: e.title
          });

          startMoment.add(7, 'days'); // add one week for next occurrence
          endMoment.add(7, 'days');
        }
      }
    });

    return recurringEvents;
  }

  //converting to date so the cards display it correctly
  const createDate = (event_data) => {
    event_data.forEach((e) => {
      e.start = new Date(e.start)
      e.end = new Date(e.end)
    })

    return event_data;
  }

  //used for the event cards
  const scrollToElement = (id) => {
    if (prevID != null) {
      scrollRef.current[prevID].classList.remove("border-red-400")
    }

    const container = containerRef.current;
    const item = scrollRef.current[id];

    item.classList.add("animate-bounce")
    item.classList.add("border-red-400")

    setTimeout(() => {
      item.classList.remove('animate-bounce');
    }, 1500);

    if (container && item) {
      container.scrollTo({
        top: item.offsetTop - container.offsetTop,
        behavior: 'smooth'
      })
    }
    prevID = id;
  };

  const SameDayOrNot = (start, end) => {
    return moment(start).isSame(moment(end), 'day')
  }

  //calendar handler functions
  const customEventPropGetter = (event) => {
    let newStyle = {
      color: 'white',
      borderRadius: "5px",
      // border: "border: 0px solid blue",
      border: "none",
      backgroundColor: "" // Initialize the backgroundColor property
    };

    if (event.location.includes('Leányfalu')) {
      newStyle.backgroundColor = "rgba(220,38,38)";
      return { style: newStyle };
    }
    else if (event.location.includes('Tahitótfalu')) {
      newStyle.backgroundColor = "#3786c9";
      return { style: newStyle };
    }
    else {
      newStyle.backgroundColor = "#904ba1";
      return { style: newStyle };
    }
  };

  const onSelectEvent = useCallback((calEvent) => {
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      setView('day');
      setDate(new Date(calEvent.start))
      scrollToElement(calEvent.id)
    }, 100)
  }, [])

  function CustomToolbar(props) {
    return (
      <div>
        <span className="w-full inline-grid grid-cols-1 place-items-center">
          <span>
            <button onClick={() => props.onView('month')} className="hover:bg-gray-200 text-gray-500 font-medium py-2 px-4 rounded inline-flex items-center">
              <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
              </svg>
              <span>Hónap</span>
            </button>
            <button onClick={() => props.onView('day')} className="hover:bg-gray-200 text-gray-500 font-medium py-2 px-4 rounded inline-flex items-center">
              <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
              <span>Nap</span>
            </button>
          </span>
        </span>
        <span className="w-full inline-grid grid-cols-3 gap-5">
          <span>
            <button type="button" className="place-self-end hover:bg-gray-200 text-gray-500 rounded-md" onClick={() => props.onNavigate('PREV')}>
              <ChevronLeft />
            </button>
          </span>
          <span className="text-center font-bold">
            {props.label}
          </span>
          <span className="ml-auto">
            <button type="button" className="hover:bg-gray-200 text-gray-500 rounded-md" onClick={() => props.onNavigate('NEXT')}>
              <ChevronRight />
            </button>
          </span>
        </span>
      </div >
    )
  }

  return (
    <>
      {/* bg-gray-50 */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto px-4 max-sm:px-0">
          <h2 className="text-3xl font-bold text-center mb-12">Közelgő Események</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Calendar
                localizer={localizer}
                messages={culture}
                events={esemenyek}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '32rem', minWidth: 200, maxWidth: 500 }}
                view={view}
                date={date}
                onView={setView}
                onNavigate={setDate}
                components={{
                  toolbar: CustomToolbar,
                }}
                eventPropGetter={customEventPropGetter}
                onSelectSlot={(slotInfo) => {
                  setDate(new Date(slotInfo.start));
                  setView('day');
                }}
                selectable
                onSelectEvent={onSelectEvent}
                tooltipAccessor="desc"
              />
            </div>
            <div ref={containerRef} className="space-y-4 overflow-auto h-[32rem] max-sm:mx-4">
              {esemenyek.map((event) => (
                <Card key={event.id} ref={(el) => (scrollRef.current[event.id] = el)} className="bg-white hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>
                      {SameDayOrNot(event.start, event.end)
                        ?
                        <>
                          {moment(event.start).locale('hu').format('YYYY/MM/DD')} • {moment(event.start).locale('hu').format('HH:mm')} → {moment(event.end).locale('hu').format('HH:mm')}
                        </>
                        :
                        <>
                          {moment(event.start).locale('hu').format('YYYY/MM/DD')} • {moment(event.start).locale('hu').format('HH:mm')} → {moment(event.end).locale('hu').format('YYYY/MM/DD')} • {moment(event.end).locale('hu').format('HH:mm')}
                        </>
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.desc}
                    </p>
                    <p className="text-sm text-gray-500">
                      📍 {event.location}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventCalendar;
