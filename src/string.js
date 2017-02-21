// load package date-util
require('../libs/sugar-date')

module.exports = (pluginContext) => {
    return {
        respondsTo: (query) => {
            return query.match(/./)
        },
        search: (query = '', env = {}) => {
            // trim & convert to lowercase query string
            query = query.toLowerCase().trim();

            // default settings
            let timestampUnit = 'seconds';

            // override timestamp unit
            if (env['timestampUnit'] && env['timestampUnit'] == 'milliseconds') {
                timestampUnit = 'milliseconds';
            }

            // create Sugar Date
            var sugarDate = Sugar.Date.create(query);

            // check if valid date
            if (!Sugar.Date.isValid(sugarDate)) {
                return Promise.reject();
            }

            // set timestamp format
            let timestampFormat = timestampUnit == 'milliseconds' ? '{x}' : '{X}';

            // set timestamp
            const ts = Sugar.Date.format(sugarDate, timestampFormat, {fromUTC: true});

            // return results
            return new Promise((resolve, reject) => {
                resolve([
                    {
                        icon: 'fa-clock-o',
                        title: ts,
                        subtitle: `Select to copy the timestamp in ${timestampUnit}.`,
                        value: ts,
                    }
                ])
            })
        }
    }
}
