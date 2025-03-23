export default interface FieldValidation {
    value: string
    type: string

    is_valid(): boolean
}