export const getResponseShape = (response = {}, errors = [], resultCode) => {
    return {
        data: {...response},
        resultCode,
        errors
    }
}