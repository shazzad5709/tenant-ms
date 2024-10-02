// create some mock house servicing bill data

export const bills = [
  {
    id: 1,
    service: 'Electricity',
    amount: 100,
    date: '2021-01-01',
    due: '2021-01-10',
    paid: false,
    payDate: '',
    billingPeriod: '2021-01-01 to 2021-01-31'
  },
  {
    id: 2,
    service: 'Water',
    amount: 50,
    date: '2021-01-01',
    due: '2021-01-10',
    paid: true,
    payDate: '2021-01-05',
    billingPeriod: '2021-01-01 to 2021-01-31'
  },
  {
    id: 3,
    service: 'Internet',
    amount: 75,
    date: '2021-01-01',
    due: '2021-01-10',
    paid: false,
    payDate: '',
    billingPeriod: '2021-01-01 to 2021-01-31'
  },
  {
    id: 4,
    service: 'Gas',
    amount: 25,
    date: '2021-01-01',
    due: '2021-01-10',
    paid: true,
    payDate: '2021-01-05',
    billingPeriod: '2021-01-01 to 2021-01-31'
  }
];