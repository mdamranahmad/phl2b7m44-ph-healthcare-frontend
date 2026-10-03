import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

const CreateScheduleForm = () => {
    const form = useForm({
        defaultValues: {
            date: "",
            startTime: "",
            endTime: "",
            meetingLink: "",
        },
        onSubmit: ({ value }) => {
            console.log(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <FieldGroup>
                <form.Field name="date">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        const selected = field.state.value
                            ? new Date(field.state.value).toISOString()
                            : undefined;

                        // console.log(selected);
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Date
                                </FieldLabel>
                                <Popover>
                                    <PopoverTrigger
                                        render={<Button variant="outline" />}
                                    >
                                        Select Date
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            selected={selected}
                                            onSelect={(date) =>
                                                // console.log(e)
                                                field.handleChange(date)
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                </form.Field>
                <form.Field name="startTime">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field className="w-32">
                                <FieldLabel htmlFor="time-picker-optional">
                                    Start Time
                                </FieldLabel>
                                <Input
                                    type="time"
                                    id="time-picker-optional"
                                    step="1"
                                    defaultValue="10:30:00"
                                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </Field>
                        );
                    }}
                </form.Field>
                <form.Field name="endTime">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field className="w-32">
                                <FieldLabel htmlFor="time-picker-optional">
                                    End Time
                                </FieldLabel>
                                <Input
                                    type="time"
                                    id="time-picker-optional"
                                    step="1"
                                    defaultValue="10:30:00"
                                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </Field>
                        );
                    }}
                </form.Field>
                <form.Field name="meetingLink">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Meeting Link
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                    }}
                                    // value={field.state.value}
                                    onBlur={field.handleBlur}
                                    autoComplete="off"
                                    aria-invalid={isInvalid}
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                </form.Field>
                {/* <form.Field name="password">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Password
                                </FieldLabel>
                                <div className="relative">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        // type="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        autoComplete="off"
                                        aria-invalid={isInvalid}
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeClosed className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                </form.Field> */}
                <Button
                    // disabled={loginPending}
                    type="submit"
                >
                    {/**button will be grayed out if disabled is true, prevent user from multiple submit */}
                    {/* {loginPending ? <Spinner>" */}
                    Submitting
                    {/* " </Spinner> : "Submit"}{" "} */}
                    {/* dynamin text inside submit box */}
                </Button>
            </FieldGroup>
        </form>
    );
};

export default CreateScheduleForm;
