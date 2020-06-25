import { ENDPOINT } from '../pages/timer/[id]'

export async function postTimer (intervalsJson) {
    return await fetch(`${ENDPOINT}/timer/new`, {
        method: 'POST',
        data: intervalsJson
    })
}