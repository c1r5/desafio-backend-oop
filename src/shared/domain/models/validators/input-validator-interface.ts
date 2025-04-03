export default interface InputValidatorInterface {
    value: string
    type: string

    is_valid(): boolean
}