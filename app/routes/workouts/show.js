import Route from '@ember/routing/route'
import Ember from 'ember'
import { inject as service } from '@ember/service'

export default Route.extend({
  workouts: service(),
  routines: service(),
  flashMessages: service(),
  combinedResponse: {},

  actions: {
    updateWorkoutsEntry (entry) {
      // console.log('entry in show.js is ', entry)
      this.get('workouts').updateWorkoutsEntry(entry)
      .then(() => this.refresh())
      .then(() => {
        this.get('flashMessages')
          .success('Successfully updated entry.')
      })
      .catch(() => {
        this.get('flashMessages')
          .danger('There was a problem. Please try again.')
      })
    },
    cancel () {
      this.transitionTo('workouts.view')
    }
  },

  model (params) {
    const routinesResponse = this.get('routines').getRoutinesEntries()
    console.log('routinesResponse is ', routinesResponse)
    const workoutsResponse = this.get('workouts').getWorkoutsEntry(params.workout_id)
    console.log('workoutsResponse is ', workoutsResponse)
    return Ember.RSVP.hash({
      routines: routinesResponse,
      workout: workoutsResponse
    })
  }
})
  // beforeModel () {
  //   const routinesResponse = this.get('routines').getRoutinesEntries()
  //   console.log('routinesResponse is ', routinesResponse)
  //   return routinesResponse
  //   .then((result) => {
  //     console.log('routines result is', result)
  //     console.log('result.routines is ', result.routines)
  //     // result.exposure.updated_at = result.exposure.updated_at.slice(0, -5).split('T').join('  ')
  //     return result.routines
  //   })
  // },
  //
  // model (params) {
  //   console.log('params is ', params)
  //   const workoutResponse = this.get('workouts').getWorkoutsEntry(params.workout_id)
  //   console.log('workoutResponse is ', workoutResponse)
  //   return workoutResponse
  //   .then((result) => {
  //     console.log('workouts result is ', result)
  //     console.log('result.workout is ', result.workout)
  //     return result.workout
  //   })
  //   .catch(() => {
  //     this.get('flashMessages')
  //     .danger('There was a problem. Please try again.')
  //   })
  // }
