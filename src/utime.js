// load package date-util
require('../libs/sugar-date')

module.exports = (pluginContext) => {
    return {
        respondsTo: (query) => {
            return true
        },
        search: (query = '', env = {}) => {
            // check if timestamp given
            let isTimestamp = !isNaN(parseFloat(query)) && isFinite(query);

            // default settings
            let outputFormat = env['outputFormat'] || '{full}';
            let timestampUnit = 'seconds';

            // override timestamp unit
            if (env['timestampUnit'] && env['timestampUnit'] == 'milliseconds') {
                timestampUnit = 'milliseconds';
            }

            // check if string or timestamp is given
            if (!isTimestamp) {
                // handle timestamp unit
                if (timestampUnit == 'seconds') {
                    // timestamp in seconds
                    outputFormat = '{X}';
                } else {
                    // timestamp in milliseconds
                    outputFormat = '{x}';
                }
            } else {
                // parse query
                query = parseFloat(query);

                // convert given timestamp in seconds to milliseconds
                if (timestampUnit == 'seconds') {
                    query *= 1000;
                }
            }

            // create Sugar Date
            var sugarDate = Sugar.Date.create(query);

            // check if valid date
            if (!Sugar.Date.isValid(sugarDate)) {
                return Promise.reject();
            }

            // set result value
            const value = Sugar.Date.format(sugarDate, outputFormat);

            // set result subtitle
            const subtitle = `Select to copy ` + (isTimestamp ? `the formatted date` : `the timestamp in ${timestampUnit}`) + `.`;

            // return results
            return new Promise((resolve, reject) => {
                resolve([
                    {
                        id: 'zazu-utime',
                        icon: 'fa-clock-o',
                        title: value,
                        subtitle: subtitle,
                        value: value,
                    }
                ])
            })
        }
    }
}
