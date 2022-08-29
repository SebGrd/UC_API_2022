// I could a created a less permissive function for the image url, but I decided to stick with that for this exercise.
function validateUrl(string) {
    const url = require('url');
    try {
        new url.URL(string);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = { validateUrl };