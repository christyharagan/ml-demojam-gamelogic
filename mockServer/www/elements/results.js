Polymer({
  is: 'marklogic-results',
  properties: {
    rankings: Object,

    rows: {
      type: Array,
      readOnly: true,
      notify: true
    },

    columns: {
      type: Array,
      readOnly: true,
      notify: true
    }
  },
  observers: [
    'onResults(rankings)'
  ],
  onResults: function() {
    if (this.rankings) {
      var rows = []
      var columns = []
      var self = this
      for (var i = this.rankings.length - 1; i >= 0; i--) {
        var ranking = this.rankings[i]
        columns.push(ranking[0])
        rows.push(ranking[1])
      }
      // this.rankings.forEach(function(ranking) {
      // })
      this.notifyPath('rows', [rows])
      this.notifyPath('columns', columns)
    }
  }
})
