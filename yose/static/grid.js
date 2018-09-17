var grid = Vue.extend({
    props: ['size'],
    template: `
        <div>
            <table>
                <tbody>
                    <tr v-for="line in size">
                        <td v-for="column in size" 
                            v-on:click="play(line, column)"
                            v-bind:id="'cell-'+line+'x'+column"
                            class="cell"
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data: function() {
        return {
            cells: []
        };
    },
    methods: {
        digest: function(document) {
            this.cells = document.grid;
            this.document = document;            
        },
        play: function(line, column) {
            var id = 'cell-' + line + 'x' + column; 
            var cell = this.document.getElementById(id);

            if (this.isThereOneBombAt(line, column)) {
                cell.className = 'cell lost';
                cell.innerHTML = '';
            } else {
                let count = 
                    this.isThereOneBombAt(line-1, column-1) + this.isThereOneBombAt(line-1, column) + this.isThereOneBombAt(line-1, column+1) +
                    this.isThereOneBombAt(line, column-1)                                           + this.isThereOneBombAt(line, column+1) +
                    this.isThereOneBombAt(line+1, column-1) + this.isThereOneBombAt(line+1, column) + this.isThereOneBombAt(line+1, column+1);
                count == 0 ? cell.innerHTML = '' : cell.innerHTML = count;                                  
                cell.className = 'cell safe surrounded-by-' + count;
            }
            
            return cell;
        },
        isThereOneBombAt: function(line, column) {
            if (this.cells[line-1] && this.cells[line-1][column-1] == 'bomb') {
                return 1;
            }
            return 0;
        }
    }
});


