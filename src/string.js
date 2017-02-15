// load package date-util
require('date-util')

// default in seconds
const defaultTimestampUnit = 'seconds';

// custom time string formats
const translateCustomTime = {
  "now": "+0 days",
  "today": "+0 days",
  "yesterday": "-1 day",
  "tomorrow": "+1 day",
  "day after tomorrow": "+2 days"
}


module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return query.match(/[a-zA-z\s]/)
    },
    search: (query, env = {}) => {
      return new Promise((resolve, reject) => {
        // set timestamp unit
        var timestampUnit = defaultTimestampUnit;

        // update timestamp unit to milliseconds
        if (env['timestampUnit'] && env['timestampUnit'] == 'milliseconds') {
          timestampUnit = 'milliseconds';
        }

        // convert search query to lowercase to match with custom time strings
        query = query.toLowerCase().trim();

        // try to translate custom time strings
        query = translateCustomTime[query] || query;

        // get divider based on timestampUnit
        var divider = timestampUnit == 'seconds' ? 1000 : 1;

        // create Date object
        var date = new Date().strtotime(query);

        // get timestamp from string
        var timestamp = Math.floor(date.getTime() / divider);

        // get timestamp from string without time
        var timestampStartDay = Math.floor(date.setHours(0,0,0,0) / divider);

        // set timestamp
        const value = timestamp;

        // set timestamp start of the day
        const valueStart = timestampStartDay;

        resolve([
          {
            icon: 'fa-clock-o',
            title: value,
            subtitle: 'Timestamp: select to copy to clipboard.',
            value: value,
          },
          {
            icon: 'fa-clock-o',
            title: valueStart,
            subtitle: 'Timestamp start of the day: select to copy to clipboard.',
            value: valueStart,
          }
        ])
      })
    },
  }
}
