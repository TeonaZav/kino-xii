"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdKeyboardArrowDown } from "react-icons/md";

import {
  Input,
  Button,
  InputLabel,
  DatePicker,
  AlertMessage,
} from "@/src/components/ui";

import { useUpdateProfile } from "../hooks/useUpdateProfile";

import {
  profileSchema,
  type ProfileFormValues,
} from "@/src/lib/validation/schemas/profile.schema";

import type {
  UserProfile,
  ProfileVenue,
  ProfileValidationErrors,
} from "@/src/types/profile.types";

interface IPersonalInformationProps {
  profile: UserProfile;
  venues: ProfileVenue[];
}

const getDefaultValues = (profile: UserProfile): ProfileFormValues => ({
  fullName: profile.fullName ?? "",
  mobileNumber: profile.mobileNumber ?? "",
  dateOfBirth: profile.dateOfBirth ?? "",
  preferredVenueId: profile.preferredVenue
    ? String(profile.preferredVenue.id)
    : "",
});

const PersonalInformation = ({
  profile,
  venues,
}: IPersonalInformationProps) => {
  const { mutateAsync, isPending } = useUpdateProfile();

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const methods = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
    defaultValues: getDefaultValues(profile),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isValid },
  } = methods;

  useEffect(() => {
    reset(getDefaultValues(profile), {
      keepDirtyValues: true,
    });
  }, [profile, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    setGeneralError(null);
    setSuccess(false);

    try {
      await mutateAsync({
        fullName: values.fullName,
        mobileNumber: values.mobileNumber,
        dateOfBirth: values.dateOfBirth,
        preferredVenueId: values.preferredVenueId
          ? Number(values.preferredVenueId)
          : null,
      });

      reset(values);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response?.data as
          | {
              message?: string;
              errors?: ProfileValidationErrors;
            }
          | undefined;

        if (response?.errors) {
          Object.entries(response.errors).forEach(([field, messages]) => {
            if (!(field in getDefaultValues(profile))) return;

            const message = Array.isArray(messages) ? messages[0] : messages;

            if (message) {
              setError(field as keyof ProfileFormValues, {
                type: "server",
                message,
              });
            }
          });
        }

        setGeneralError(
          response?.message ?? "Unable to save your profile. Please try again.",
        );

        return;
      }

      setGeneralError("Something went wrong. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full max-w-220 flex-col gap-4.5"
        onChange={() => {
          setSuccess(false);
          setGeneralError(null);
        }}
      >
        {success && (
          <AlertMessage variant="success">
            Profile updated successfully.
          </AlertMessage>
        )}
        {generalError && (
          <AlertMessage variant="error">{generalError}</AlertMessage>
        )}
        <Input
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="Enter your full name"
          disabled={isPending}
        />

        <div className="flex flex-col gap-1">
          <Input
            id="email"
            label="Email"
            type="email"
            value={profile.email}
            readOnly
            className="cursor-not-allowed"
          />

          <p className="text-xs text-secondary">
            Set at registration and cannot be changed
          </p>
        </div>

        <Input
          id="mobileNumber"
          name="mobileNumber"
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          placeholder="599 123 456"
          disabled={isPending}
        />

        <DatePicker
          name="dateOfBirth"
          label="Date of birth"
          placeholder="Select your date of birth"
          maxDate={new Date()}
          disabled={isPending}
        />

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="preferredVenueId"
            hasError={!!errors.preferredVenueId}
          >
            Preferred Venue (Optional)
          </InputLabel>

          <div className="relative">
            <select
              id="preferredVenueId"
              {...register("preferredVenueId")}
              disabled={isPending}
              className="h-12 w-full appearance-none rounded-xl bg-card px-5 pr-12 text-xs font-semibold text-primary outline-none transition-all duration-300 hover:bg-raised focus:border-disabled"
            >
              <option value="">Select preferred venue</option>

              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>

            <MdKeyboardArrowDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-secondary" />
          </div>

          {errors.preferredVenueId && (
            <p className="text-xs font-medium text-error">
              {errors.preferredVenueId.message}
            </p>
          )}
        </div>

        <div className="pt-3">
          <Button
            type="submit"
            disabled={isPending || !isDirty || !isValid}
            isLoading={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalInformation;
