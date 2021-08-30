module.exports = {

    date(){
        var today = new Date();
        return (today.getDate()) + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear());
    },

    time(){
        var today = new Date();
        return (today.getHours()) + ":" + (today.getMinutes()) + ":" + (today.getSeconds());
    }
}