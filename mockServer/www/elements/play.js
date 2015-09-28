var StatementKind = {
  PROPOSITION: 0,
  NEGATION: 1,
  AND: 2,
  OR: 3,
  IMPLIES: 4
}

Polymer({
  is: 'marklogic-play',
  properties: {
    answers: Array,

    premises: Array,

    selectedAnswer: Object,

    isCorrect: Boolean,

    formattedPremises: {
      type: Array,
      readOnly: true,
      notify: true
    },

    formattedAnswers: {
      type: Array,
      readOnly: true,
      notify: true
    },

    guess: {
      type: Array,
      readOnly: true,
      notify: true
    },

    answeredCorrectly: {
      type: Boolean,
      readOnly: true,
      notify: true
    },

    hasAnswered: {
      type: Boolean,
      readOnly: true,
      notify: true
    }
  },
  observers: [
    'onAnswers(answers)',
    'onPremises(premises)',
    'onIsCorrect(isCorrect)'
  ],
  onAnswers: function() {
    this.notifyPath('formattedAnswers', formatAnswers(this.answers))
  },
  onPremises: function() {
    function formatStatement(statement) {
      switch (statement.kind) {
        case StatementKind.PROPOSITION:
          return statement.proposition
        case StatementKind.NEGATION:
          return '! (' + formatStatement(statement.a) + ')'
        case StatementKind.AND:
          return formatStatement(statement.a) + ' & ' + formatStatement(statement.b)
        case StatementKind.OR:
          return formatStatement(statement.a) + ' | ' + formatStatement(statement.b)
        case StatementKind.IMPLIES:
          return formatStatement(statement.a) + ' => ' + formatStatement(statement.b)
      }
    }

    this.notifyPath('formattedPremises', this.premises.map(formatStatement))
  },
  onIsCorrect: function() {
    if (this.isCorrect) {
      this.notifyPath('answeredCorrectly', true)
    } else {
      this.notifyPath('answeredIncorrectly', true)
    }
  },
  submit: function() {
    this.notifyPath('hasAnswered', true)
    this.notifyPath('guess', [this.selectedAnswer.id])
  }
})
