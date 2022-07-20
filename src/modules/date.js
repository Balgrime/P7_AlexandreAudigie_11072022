
    export function format(date){
        var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
        date = new Date().toLocaleDateString([], options);
    }