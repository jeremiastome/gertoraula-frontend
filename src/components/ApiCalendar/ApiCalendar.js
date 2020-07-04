import config from "../../auth_config.json";

export const ApiCalendar = {

    nuevoEvento : (data, emails) => {
        var gapi = window.gapi;
        console.log(JSON.stringify(data)); 
    
        const attendees = [];
        emails.forEach(obj => attendees.push({'email' : obj.email}));
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: config.API_KEY,
            clientId: config.CLIENT_ID,
            discoveryDocs: config.DISCOVERY_DOCS,
            scope: config.SCOPES,
          })
    
          gapi.client.load('calendar', 'v3', () => console.log('load'))          
          gapi.auth2.getAuthInstance().signIn()
          .then(() => {
            var event = {
              'summary': data.titulo,
              'description': data.description,
              'start': {
                'dateTime': formatDateTime(new Date(data.fechaInicio)),
                'timeZone': 'America/Argentina/Buenos_Aires'
              },
              'end': {
                'dateTime': formatDateTime(new Date(data.fechaFin)),
                'timeZone': 'America/Argentina/Buenos_Aires'
              },
              'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=1'
              ],
              'attendees': attendees,
              'reminders': {
                'useDefault': false,
                'overrides': [
                  {'method': 'email', 'minutes': 24 * 60},
                  {'method': 'popup', 'minutes': 10}
                ]
              }
            }    
            var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
            })
    
            request.execute(event => {
              console.log('request')
              console.log(event)
              window.open(event.htmlLink)
            })
          })
        })
    }

    
}

const formatDateTime = adateTime => {
    console.log('Format adateTime');
    //'yyyy-MM-ddTHH:mm:ss+hh:mm'
    return adateTime.getFullYear()+
        "-"+("0" + (adateTime.getMonth() + 1)).slice(-2)+
        "-"+("0" + adateTime.getDate()).slice(-2) +
        "T"+("0" + adateTime.getHours()).slice(-2)+
        ":"+("0" + adateTime.getMinutes()).slice(-2)+
        ":"+("0" + adateTime.getSeconds()).slice(-2)+
        "-03:00";
}
