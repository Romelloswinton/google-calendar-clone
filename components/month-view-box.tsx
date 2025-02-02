{
  visibleEvents.map((event: CalendarEventType, index) => (
    <EventRenderer key={event.id} events={[event]} />
  ));
}
