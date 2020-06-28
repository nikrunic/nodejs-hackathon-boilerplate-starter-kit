import { ENDPOINT } from '../pages/timer/[id]'

export function postTimer (intervalsJson, redirectToTimer) {
    return fetch(`${ENDPOINT}/get-timer/`, {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        data: JSON.stringify(intervalsJson)
    }).then(data => redirectToTimer(data.id))
}