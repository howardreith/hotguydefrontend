import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  journal: service(),
  flashMessages: service(),
  tagName: 'form',
  classNames: ['form-horizontal'],
  entry: {},

  actions: {
    updateJournalEntry (entry) {
      console.log('entry in show.js is ', entry)
      this.get('journal').updateJournalEntry(entry)
    }
  },

  model (params) {
    const response = this.get('journal').getJournalEntry(params.journal_id)
    console.log ('response is ', response)
    return response
    .then((result) => {
      console.log('result is', result)
      console.log('result.journal_entry is ', result.journal_entry)
      return result.journal_entry
    })
    .catch(() => {
      this.get('flashMessages')
      .danger('There was a problem. Please try again.')
})
  }

  // model (params) {
  //   console.log('params is ', params)
  //   const response = this.get('journal').getJournalEntry(params.journal_id)
  //   console.log ('response is ', response)
  //   return response
  //   .then((result) => {
  //     console.log('result is ', result.journal_entry)
  //     return result.journal_entry
  //   })
  //   .then(() => {
  //     this.get('flashMessages')
  //       .success('Successfully got journal entry.')
  //   })
  //   .catch(() => {
  //     this.get('flashMessages')
  //       .danger('There was a problem. Please try again.')
  //   })
  // }
});
