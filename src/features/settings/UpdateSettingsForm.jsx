import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
    const {
        isLoading,
        error,
        settings: {
            min_booking_length,
            max_booking_length,
            max_guests_per_booking,
            breakfast_price,
        } = {},
    } = useSettings();

    const { isUpdating, updateSetting } = useUpdateSetting();

    if (isLoading) return <Spinner />;

    if (error) return <span>Error: {error.message}</span>;

    const handleUpdate = (e, field, curValue) => {
        const {value} = e.target;
        console.log(curValue, value)
        if (!value || value === curValue.toString()) return;
        updateSetting({[field]: value})
    }
 
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    defaultValue={min_booking_length}
                    onBlur={(e) => handleUpdate(e, "min_booking_length", min_booking_length)}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isUpdating}
                    defaultValue={max_booking_length}
                    onBlur={(e) => handleUpdate(e, "max_booking_length", max_booking_length)}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isUpdating}
                    defaultValue={max_guests_per_booking}
                    onBlur={(e) => handleUpdate(e, "max_guests_per_booking", max_guests_per_booking)}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isUpdating}
                    defaultValue={breakfast_price}
                    onBlur={(e) => handleUpdate(e, "breakfast_price", breakfast_price)}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
