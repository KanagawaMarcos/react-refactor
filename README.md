# React Table

## Setting Up

From the project folder, run using `yarn`:

```bash
$ yarn install
$ yarn dev
```

Using `npm`:

```bash
$ npm install
$ ./node_modules/.bin/concurrently 'npm run server-start' 'npm run client-start'
```

Go to `http://localhost:3000` to see the client application.

## Overview

We'd like for you to create a **reusable** table component and replace the unordered list in `App.tsx` with the new table. Because we are not expecting you to handle styling, `Table.tsx` includes various imports that you may want to use. These components are for UI only and do not have functionality.

Your table should (in order of importance):
- be able to render different kinds of data
- have pagination, with the ability for a developer to define the page size
- be able to filter, with the ability for a developer to pass in comparator functions for each column
- have sorting, both ascending and descending

Note: It is not expected that you complete all three functions by the end of the exercise. In fact, we encourage you to focus on quality, clean code, and readability more than the volume of work.

## Guidelines

- At work, you have the ability to use the entire internet to solve problems. You may use whatever you need during this exercise to aid your work.
- Focus on the functionality of your table, not styling.
- An additional model `User` is included. While you do not have to create the table for this, it is provided to give extra context into what we'd like for the `Table` component to do.

## Submitting
- Please create a branch off of the `main` branch called `solution-{your-last-name}`.
- Make sure you commit your changes as if you would be submitting a pull request.
- Zip the directory and email it to [recruiting@sisudata.com](mailto:recruiting@sisudata.com?subject=Contractor%20project%20submission%20from%20{FIRST_NAME}%20{LAST_NAME})
