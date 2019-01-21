const questions = [
  {
    question: 'What is React?',
    id: 1,
    possibleOptions: [
      {
        name: 'A JavaScript library',
        id: 11,
      },
      {
        name: 'CSS preprocessor',
        id: 12,
      },
      {
        name: 'Language that compiles to CoffeeScript',
        id: 13,
      },
    ],
  },
  {
    question: 'Who made React?',
    id: 2,
    possibleOptions: [
      {
        name: 'Google',
        id: 21,
      },
      {
        name: 'Twitter',
        id: 22,
      },
      {
        name: 'Facebook',
        id: 23,
      },
    ],
  },
  {
    question: 'What is React used for?',
    id: 3,
    possibleOptions: [
      {
        name: 'Adding variables to CSS',
        id: 31,
      },
      {
        name: 'Building web apps',
        id: 32,
      },
      {
        name: 'Making websites cloud-ready',
        id: 33,
      },
    ],
  },
  {
    question: 'What is special about React?',
    id: 4,
    possibleOptions: [
      {
        name: "It brings HTML6 features to today's browsers",
        id: 41,
      },
      {
        name: 'Virtual DOM',
        id: 42,
      },
      {
        name: 'Database integration',
        id: 43,
      },
    ],
  },
  {
    question: 'Which language is this?',
    id: 5,
    image: './image-questions/5.png',
    possibleOptions: [
      {
        name: 'JavaScript',
        id: 51,
      },
      {
        name: 'CoffeeScript',
        id: 52,
      },
      {
        name: 'JSX',
        id: 53,
      },
    ],
  },
  {
    question: 'What does this component do?',
    id: 6,
    image: './image-questions/6.png',
    possibleOptions: [
      {
        name: 'Prints "Hello World!"',
        id: 61,
      },
      {
        name: 'Prints "Hello", followed by the name attribute that was passed when initializing the component',
        id: 62,
      },
      {
        name: 'Prints the numbers from 1 to 10.',
        id: 63,
      },
    ],
  },
  {
    question: 'What does this code do?',
    id: 7,
    image: './image-questions/7.png',
    possibleOptions: [
      {
        name: "Provides an initial value for the component's state",
        id: 71,
      },
      {
        name: 'Tells how many times the component should be focused',
        id: 72,
      },
      {
        name: 'Seeds a random number generator',
        id: 73,
      },
    ],
  },
  {
    question: 'What does this code do?',
    id: 8,
    image: './image-questions/8.png',
    possibleOptions: [
      {
        name: 'Initializes a new UL component, and generates LI components for each entry in the items array property.',
        id: 81,
      },
      {
        name: 'Initializes a Google Map for every location in the items array',
        id: 82,
      },
      {
        name: "It won't work",
        id: 83,
      },
    ],
  },
];

const answers = [
  {
    id: 1,
    answer: 11,
  },
  {
    id: 2,
    answer: 23,
  },
  {
    id: 3,
    answer: 32,
  },
  {
    id: 4,
    answer: 42,
  },
  {
    id: 5,
    answer: 53,
  },
  {
    id: 6,
    answer: 62,
  },
  {
    id: 7,
    answer: 71,
  },
  {
    id: 8,
    answer: 81,
  },
];

export {
  answers,
  questions,
};
