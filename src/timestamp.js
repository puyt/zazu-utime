// load date-util
require('date-util')

// default output format
const defaultOutputFormat = 'dd/mm/yyyy HH:MM:ss';


module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return !isNaN(parseFloat(query)) && isFinite(query)
    },
    search: (query, env = {}) => {
      return new Promise((resolve, reject) => {
        // set output output format
        var outputFormat = env['outputFormat'] || defaultOutputFormat;

        // set multiplier for seconds
        var multiplier = query.toString().length == 10 ? 1000 : 1;

        // convert timestamp to output format
        const value = new Date(query * multiplier).format(outputFormat)

        resolve([
          {
            icon: 'fa-clock-o',
            title: value,
            subtitle: 'Select to copy to clipboard.',
            value: value,
          }
        ])
      })
    },
  }
}