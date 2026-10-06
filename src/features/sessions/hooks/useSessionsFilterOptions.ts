"use client";

import { useEffect, useMemo } from "react";

import useSessionsFilters from "./useSessionsFilters";
import { useSessionFilterOptionsData } from "./queries/useSessionFilterOptionsData";

const useSessionsFilterOptions = () => {
  const {
    data: filterOptions,
    isLoading,
    isError,
  } = useSessionFilterOptionsData();

  const {
    filters,
    activeFilterCount,
    toggleVenue,
    toggleFormat,
    toggleLanguage,
    toggleBand,
    setFormats,
    setDate,
    clearFilters,
  } = useSessionsFilters();

  const selectedVenues = filters.venues ?? [];
  const selectedFormats = filters.formats ?? [];
  const selectedLanguages = filters.languages ?? [];
  const selectedBands = filters.bands ?? [];

  const availableFormats = useMemo(() => {
    if (!filterOptions) {
      return undefined;
    }

    if (!selectedVenues.length) {
      return filterOptions.formats;
    }

    const selectedVenueData = filterOptions.venues.filter((venue) =>
      selectedVenues.includes(venue.slug),
    );

    const availableSlugs = new Set(
      selectedVenueData.flatMap((venue) =>
        venue.formats.map((format) => format.slug),
      ),
    );

    return filterOptions.formats.filter((format) =>
      availableSlugs.has(format.slug),
    );
  }, [filterOptions, selectedVenues]);

  useEffect(() => {
    if (!availableFormats || !selectedFormats.length) {
      return;
    }

    const availableSlugs = new Set(
      availableFormats.map((format) => format.slug),
    );

    const validSelectedFormats = selectedFormats.filter((slug) =>
      availableSlugs.has(slug),
    );

    if (validSelectedFormats.length !== selectedFormats.length) {
      setFormats(validSelectedFormats);
    }
  }, [availableFormats, selectedFormats, setFormats]);

  return {
    filterOptions,
    isLoading,
    isError,

    filters,
    activeFilterCount,

    selectedVenues,
    selectedFormats,
    selectedLanguages,
    selectedBands,

    availableFormats,

    toggleVenue,
    toggleFormat,
    toggleLanguage,
    toggleBand,

    setDate,
    clearFilters,
  };
};

export default useSessionsFilterOptions;
