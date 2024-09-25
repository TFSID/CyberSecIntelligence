import moment from 'moment';

/**
 * @param selector
 */
module.exports = function (selector, miliseconds) {
    miliseconds = typeof miliseconds == 'boolean' && miliseconds == true ? true : false;
    let defaultRange = $(selector).data('daterangepicker').ranges || {};
    let dateRangeFrom = 0;
    let dateRangeTo = 0;

    let defaultRangeList = Object.keys(defaultRange);
    let currRange = $(selector).data('daterangepicker').chosenLabel;

    if (typeof defaultRange[currRange] == 'object' && Array.isArray(defaultRange[currRange])) {
        dateRangeFrom = defaultRange[currRange][0] || 0;
        try {
            dateRangeFrom = dateRangeFrom.format('x');
        } catch (e) {
            dateRangeFrom = 0;
        }

        dateRangeTo = defaultRange[currRange][1] || 0;
        try {
            dateRangeTo = dateRangeTo.format('x');
        } catch (e) {
            dateRangeTo = 0;
        }
    } else {
        // Collect data from interface
        try {
            dateRangeFrom = $(selector).data('daterangepicker').startDate.toString();
            dateRangeFrom = new Date(dateRangeFrom);
            dateRangeFrom = dateRangeFrom.getTime();
        } catch (e) {
        }

        try {
            dateRangeTo = $(selector).data('daterangepicker').endDate.toString();
            dateRangeTo = new Date(dateRangeTo);
            dateRangeTo = dateRangeTo.getTime();
        } catch (e) {
        }
    }

    return {
        'from': (!miliseconds) ? dateRangeFrom / 1000 : dateRangeFrom,
        'to': (!miliseconds) ? dateRangeTo / 1000 : dateRangeTo
    };
};