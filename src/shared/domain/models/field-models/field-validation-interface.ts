export default interface FieldValidationInterface {
    value: string
    type: string

    is_valid(): boolean
}