const GET_MEALS = `
  query queryMealContents {
    data {
      timingCategory {
        iv {
          name
        }
      }
    }
  }
`;

export default GET_MEALS;
