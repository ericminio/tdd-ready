let hello = new Vue({
    template:`
    <div>
        <div id="message">[[ greetings ]]</div>
        <div id="error">[[ error ]]</div>
    </div>
    `,
    delimiters: [ '[[', ']]' ],
    data: {
        greetings: '',
        error: ''
    },
    mounted: function() {
        this.fetchData()
            .then((response)=> {
                if (!response.ok) {
                    this.error = response.status + ':' + response.statusText;
                } else {
                    return response.json();
                }
            })
            .then((body)=>{
                this.greetings = body.message;
            });
    },
    methods: {
        fetchData() {
            return fetch(window.location.origin + '/hello');
        }
    }
});
