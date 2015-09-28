function formatAnswers(answers) {
  return answers.map(function (answer) {
    return {
      id: answer.id, title: answer.values.reduce(function (previousValue, currentValue) {
        return previousValue + (previousValue === '' ? '' : ' and ') + currentValue.symbol + ' is ' + (currentValue.value ? 'true' : 'false')
      }, '')
    }
  })
}
