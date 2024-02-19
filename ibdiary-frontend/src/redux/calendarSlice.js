import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        value: {'2024-1-7':{
            date: '2024-02-07',
            user: '65c697792d46be2d941f64fe',
            events: [
              {
                startTime: '1300',
                endTime: '0900',
                title: 'Brush Teeth',
                recurring: false,
                recursEvery: null,
                type: 'event',
              },
              {
                startTime: '1000',
                endTime: '1100',
                title: 'Use Restroom',
                recurring: false,
                recursEvery: null,
                type: 'event',
              }
            // ,
            //   {
            //     startTime: '0700',
            //     endTime: '1400',
            //     title: 'Pee Sitting Down',
            //     recurring: false,
            //     recursEvery: null,
            //     type: 'event',
            //   }
            // ,
            //   {
            //     startTime: '1800',
            //     endTime: '1200',
            //     title: 'Sandwich',
            //     recurring: false,
            //     recursEvery: null,
            //     type: 'food',
            //   }
            // ,
            //   {
            //     startTime: '2300',
            //     endTime: '1400',
            //     title: 'Remicade',
            //     recurring: true,
            //     recursEvery: 28,
            //     type: 'medication',
            //   }
            ,
            {title: 'nausea', type: 'symptom'}, {title: 'rectal bleeding', type: 'symptom'}, {title: 'abdominal pain', startTime: '1600', type: 'symptom'}
            ],
            reflection: {
                body: 'You know today was a pretty good day. My stress levels were low and even though I bled out of my booty hole, I do not think that is a huge deal',
                stress: 4,
                emotion: 'Happy'
            }}
          },
    },
    reducers: {
        addMonth: (state, action) => {
            state.value = [...state, action.payload]
        },
    }
});

export const {useMonth} = calendarSlice.actions;
export const selectCalendar = (state) => state.calendar.value;
export const selectDay = day => (state) => state.value[day];
export default calendarSlice.reducer;