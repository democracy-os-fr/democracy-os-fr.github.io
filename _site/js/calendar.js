var clndr = {};

$( function() {

  moment.lang('fr');

var events = [
  
  { date: '2016-05-18',  endDate: '', title: 'Nous serons au Ouishare Fest, et vous?', location: '', url: 'http://2016.ouisharefest.com/' },
  
  { date: '2016-09-09',  endDate: '', title: 'Mozilla', location: '', url: '' },
  
  { date: '2016-09-16',  endDate: '', title: 'Nous serons au Hackathon 4, et vous?', location: '', url: '' },
  
  { date: '2016-10-18',  endDate: '2016-10-19', title: 'Soutenez le projet #39', location: 'Docks Pullman, St Denis', url: 'https://budgetparticipatif.paris.fr/bp/jsp/site/Portal.jsp?document_id=2495&portlet_id=158' },
  
  { date: '2016-11-17',  endDate: '', title: 'Hackathon ODN N°5', location: 'Docks Pullman, St Denis', url: 'http://opendemocracynow.net/hackathons/hackathon5' },
  
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