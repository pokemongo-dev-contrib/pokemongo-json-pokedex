import '../lib/helper';
import _ from 'lodash';

function FormatName(name, drop){
    return _.chain(name)
        .split('_')
        .drop(drop)
        .value()
        .map((part) => {
            return part.toLowerCase().capitalizeFirstLetter();
        })
        .join(' ');
}
module.exports = FormatName;