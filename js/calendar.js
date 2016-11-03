---
---

var clndr = {};

$( function() {

  moment.lang('fr');

var events = [
  {% for event in site.events %}
  { date: '{{event.date | date: "%F"}}', {% if event.end_date %} endDate: '{{event.end_date}}',{% endif %} title: '{{event.title}}', location: '{{event.place}}', url: '{{event.link}}' },
  {% endfor %}
  ];


clndr = $('#full-clndr').clndr({
    template: $('#full-clndr-template').html(),
    events: events,
    forceSixRows: true
  });

  $('#mini-clndr').clndr({
    template: $('#mini-clndr-template').html(),
   events: events,
    clickEvents: {
      click: function(target) {
        if(target.events.length) {
          var daysContainer = $('#mini-clndr').find('.days-container');
          daysContainer.toggleClass('show-events', true);
          $('#mini-clndr').find('.x-button').click( function() {
            daysContainer.toggleClass('show-events', false);
          });
        }
      }
    },
    adjacentDaysChangeMonth: true,
    forceSixRows: true,
    selectedDate: null,
  });

});