// create program that adds up time in office
// make time seacrh more accurate by including event name
// fails if ending event is before start event

// should run each night at midnight on the calendar by setting a trigger
// trigger set for 2300 each night
function main() {
 var calendar_name = 'Work';
 var event_names = 'work';
 var date_to_process = new Date();       // today is new Date() maybe I should use yesterday in the early morning
 var search_term_enter = 'entered';      // should actually be work or uni or something
 var search_term_exit = 'exited';
 var i=0;                                // counter
 var event_title_to_create = 'Working at Capsicum Office';
 
 // get calendar matching name
 var calendar_var = get_calendar(calendar_name);    //process_calendar_information(calendar_name);
 
 // get events from calendar matching words
 var matching_enter_events = get_events_for_day(calendar_var, date_to_process, search_term_enter);
 var matching_exit_events = get_events_for_day(calendar_var, date_to_process, search_term_exit);
 
 // does not work for overnight
 while (matching_enter_events.length>i && matching_exit_events.length>i){
  calendar_var.createEvent(event_title_to_create, matching_enter_events[i].getStartTime(), matching_exit_events[i].getStartTime());
  Logger.log('Event created called '+event_title_to_create+' from '+matching_enter_events[i].getStartTime() +' to '+matching_exit_events[i].getStartTime());
  i++;

 }

 // delete time stamps
 if (matching_enter_events.length == matching_exit_events.length && matching_exit_events.length>0){
   i=matching_enter_events.length-1;
   while (i>-1){
     matching_enter_events[i].deleteEvent();
     matching_exit_events[i].deleteEvent();
     Logger.log('time stamps deleted');
   
     i--;
   }
 }
}

// gets the calendar
function get_calendar(calendar_name){
 var calendars = CalendarApp.getCalendarsByName(calendar_name);
 if (calendars.length==1){
     Logger.log('You got 1 calendar named %s',calendars[0].getName());
 } else {
   Logger.log('You got multiple calendars');
   Logger.log('Found %s matching calendars.', calendars.length);
 }
 // returns 1 calendar
 return calendars[0];
}

// get the events for that day
function get_events_for_day(calendar_var, date_to_process, search_term){
 // Determines how many events are happening today and contain the term "meeting".
 var matching_events = calendar_var.getEventsForDay(date_to_process, {search: search_term});
 Logger.log('You got %s event[s]', matching_events.length);
 Logger.log('The event[s] is called:');
 var i=0;
 while(matching_events.length>i){
   Logger.log(matching_events[i].getTitle() + ' which occurred at time ' + matching_events[i].getStartTime());
   i++;
 }
 return matching_events;
}



// delete start and exit timestamp

// logger event deleted
