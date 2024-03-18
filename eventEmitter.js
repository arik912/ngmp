class EventEmitter {
  constructor() {
      this.listeners = {};
  }

  addListener(eventName, fn) {
      return this.on(eventName, fn);
  }

  on(eventName, fn) {
      if (!this.listeners[eventName]) {
          this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(fn);
      return this;
  }

  removeListener(eventName, fn) {
      return this.off(eventName, fn);
  }

  off(eventName, fn) {
      if (!this.listeners[eventName]) {
          return this;
      }

      if (!fn) {
          delete this.listeners[eventName];
          return this;
      }

      const index = this.listeners[eventName].indexOf(fn);
      if (index !== -1) {
          this.listeners[eventName].splice(index, 1);
      }
      return this;
  }

  once(eventName, fn) {
      const wrapper = (...args) => {
          fn.apply(this, args);
          this.off(eventName, wrapper);
      };
      return this.on(eventName, wrapper);
  }

  emit(eventName, ...args) {
      if (!this.listeners[eventName]) {
          return false;
      }
      for (const listener of this.listeners[eventName]) {
          listener.apply(this, args);
      }
      return true;
  }

  listenerCount(eventName) {
      return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
      return this.listeners[eventName] || [];
  }
}
export default EventEmitter;