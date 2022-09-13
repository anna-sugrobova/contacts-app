export type UserDataType = {
    id: string,
    name: {title: string, first: string, last: string},
    gender: string,
    location: { city: string, country: string, postcode: string },
    picture: {large: string},
    email: string,
    phone: string,
}

export type UserDataFromApiType = {
    id: {name: string, value: string},
    name: {title: string, first: string, last: string},
    gender: string,
    location: { city: string, country: string, postcode: string },
    picture: {large: string},
    email: string,
    phone: string,
}