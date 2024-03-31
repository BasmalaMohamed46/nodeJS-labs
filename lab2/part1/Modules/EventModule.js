
class eventModule {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback();
            }); 
        } else {
            console.log(`No event handler found for event: ${eventName}`);
        }
    }
}

module.exports = eventModule;
