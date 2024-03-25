class StateMachine {
    constructor(initialState) {
        this.state = initialState;
    }
    
    transitionTo(state) {
        if (this.state === state) {
            return;
        }
        this.state = state;
    }
    currentState() {
        return this.state;
    }
}