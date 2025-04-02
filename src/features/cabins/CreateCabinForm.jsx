import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    // Access the client
    const queryClient = useQueryClient();

    // Mutations
    const { isLoading: isCreating, mutate } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created!");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        mutate(data);
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.max_capacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("max_capacity", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1.",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regular_price?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isCreating}
                    {...register("regular_price", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1.",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isCreating}
                    {...register("discount", {
                        required: "This field is required.",
                        validate: (value) =>
                            value < getValues().regular_price ||
                            "discount should be less than regular price.",
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isCreating}
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>

            <FormRow label="image" >
                <FileInput id="image" accept="image/*" disabled={isCreating} />
            </FormRow>

            <FormRow>
                <Button $variation="secondary" size="medium" type="reset">
                    Cancel
                </Button>
                <Button
                    disabled={isCreating}
                    $variation="primary"
                    size="medium"
                >
                    Add cabin
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
