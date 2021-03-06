/*
MIT License

Copyright (c) 2016 Russian Rebouças

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict';
module.exports = function (promises) {

  if (!Array.isArray(promises)) {
    throw new Error('First argument need to be an array of Promises');
  }

  return new Promise((resolve, reject) => {

    let count = 0;
    let results = [];

    const iterateeFunc = (previousPromise, currentPromise) => {
      return previousPromise
        .then(function (result) {
          if (count++ !== 0) results = results.concat(result);
          return currentPromise(result, results, count);
        })
        .catch((err) => {
          return reject(err);
        });
    }

    promises = promises.concat(() => Promise.resolve());

    promises
    .reduce(iterateeFunc, Promise.resolve(false))
    .then(function (res) {
      resolve(results);
    })

  });
};