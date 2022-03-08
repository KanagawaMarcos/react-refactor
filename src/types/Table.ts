
import {User} from './User'

interface ITableProps<T> {
    users: User[]
    usersPerPage: number
    sortLambda?: ((a: T, b: T) => number) | undefined
}

export default ITableProps