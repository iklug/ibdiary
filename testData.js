
export const exampleDay = {
    date: '2024-02-07',
    user: '65c697792d46be2d941f64fe',
    events: [
      {
        startTime: '0800',
        endTime: '0900',
        title: 'Brush Teeth',
        recurring: false,
        recursEvery: null
      },
      {
        startTime: '1000',
        endTime: '1100',
        title: 'Use Restroom',
        recurring: false,
        recursEvery: null
      },
      {
        startTime: '1400',
        endTime: '1400',
        title: 'Pee Sitting Down',
        recurring: false,
        recursEvery: null
      }
    ],
    food: [
      {
        startTime: '1200',
        endTime: '1200',
        title: 'Sandwich',
        recurring: false,
        recursEvery: null
      }
    ],
    medication: [
      {
        startTime: '1300',
        endTime: '1400',
        title: 'Remicade',
        recurring: true,
        recursEvery: 28
      }
    ],
    symptoms: [{title: 'nausea'}, {title: 'rectal bleeding'}, {title: 'abdominal pain', startTime: '1600'}],
    reflection: {
        body: 'You know today was a pretty good day. My stress levels were low and even though I bled out of my booty hole, I do not think that is a huge deal',
        stress: 4,
        emotion: 'Happy'
    }
  }

export const exampleUser = {
    email: 'example@email.com',
    hash: '123456789',
    salt: '987654321',
    personal: {
        firstName: 'Ian',
        lastName: 'Klug',
        preferredName: 'El Tigre',
        pronouns: 'he/him',
        birthday: '1993-03-11',
    },
    medical: {
        diagnosis: 'UC',
        yearOfDiagnosis: '2016',
        currentMedication: ['Remicade', 'Mesalamine'],
        pastMedication: ['Humira'],
        primaryPhysician: 'Dr. Dennis Hardcock',
        primaryGastro: 'Dr. Denise Softbottom',
        allergies: ['Eggs', 'Adhesives'],
    },
    preferences: {
        color: 'blue',
        darkMode: false,
        '24hourClock': true,
    }
}
