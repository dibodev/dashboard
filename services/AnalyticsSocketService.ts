import { io } from 'socket.io-client'

export default class AnalyticsSocketService {
    static socket = io(apiUrl)

    static join (domain: string) {
        this.socket.emit('join', domain)
    }
}
