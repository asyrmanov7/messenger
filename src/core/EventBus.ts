type EventListeners = (...args: any[]) => void

class EventBus {
    private listeners: {[event: string]: EventListeners[] } = {};

    on (event: string, callback: EventListeners): void {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)
    }

    off (event: string, callback: EventListeners): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события ${event}`)
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback)
    }

    emit(event: string, ...args: any[]) {
        if (this.listeners[event]) {
            throw new Error(`Нет события ${event}`)
        }

        this.listeners[event].forEach((listener) => listener(...args))
    }
}

export default EventBus
