"use client";

import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { loginZSchema } from "@/validation";

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: loginZSchema,
        },
        onSubmit: ({ value }) => {
            console.log("value", value);
        },
    });
    return (
        <div>
            <p>Login</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.Field name="email">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;

                        return (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    Email
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                    }}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    autoComplete="off"
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
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}
