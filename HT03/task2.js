import EventEmitter from "../eventEmitter.js";

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
      // Emit 'start' event
      this.emit('start');

      try {
          const startTime = Date.now();
          const data = await asyncFunc(...args);
          const endTime = Date.now();
          // this.emit('data', data); another approach, but need listener for data event, need ask on QA session
          this.emit('end');
          const executionTime = endTime - startTime;
          console.log(`Execution time: ${executionTime}ms`);
      } catch (error) {
          console.error('Error:', error);
          this.emit('error', error);
      }
  }
}

const fetchFromUrl = (url) => {
  return new Promise((resolve, reject) => {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
  });
}

const withTime = new WithTime();

withTime.on('start', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));
