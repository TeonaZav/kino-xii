"use client";

import { useMemo } from "react";

import useSessionsFilterOptions from "../../hooks/useSessionsFilterOptions";
import FilterCheckbox from "./FilterCheckbox";
import FilterSection from "./FilterSection";
import FilterFooter from "./FilterFooter";

import { Card, SessionsFiltersSkeleton, Slider } from "@/src/components/ui";
import { SessionDateButton } from "@/src/features/shared";
import { getNextSevenDays, parseTimeBandLabel } from "@/src/lib/utils/helpers";

const SessionsFilters = () => {
  const {
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
  } = useSessionsFilterOptions();

  const dates = useMemo(() => getNextSevenDays(), []);

  if (isLoading) {
    return <SessionsFiltersSkeleton />;
  }

  if (isError || !filterOptions || !availableFormats) {
    return null;
  }

  const { venues, languages, timeBands } = filterOptions;

  const selectedDate = filters.date ?? dates[0]?.value;

  return (
    <Card className="flex w-full flex-col p-6">
      <h3 className="text-lg font-extrabold text-primary">Filters</h3>

      <FilterSection title="Venue">
        {venues.map((venue) => (
          <FilterCheckbox
            key={venue.id}
            checked={selectedVenues.includes(venue.slug)}
            onChange={() => toggleVenue(venue.slug)}
          >
            <span className="font-semibold text-primary">{venue.name}</span>
            <span className="text-xs text-secondary"> · {venue.city}</span>
          </FilterCheckbox>
        ))}
      </FilterSection>

      <FilterSection title="Date">
        <Slider
          items={dates}
          getKey={(item) => item.value}
          slidesPerView={6.45}
          spaceBetween={6}
          renderItem={(item) => (
            <SessionDateButton
              day={item.day}
              date={item.date}
              value={item.value}
              isSelected={selectedDate === item.value}
              onSelect={setDate}
            />
          )}
        />
      </FilterSection>

      <FilterSection title="Format">
        {availableFormats.map((format) => (
          <FilterCheckbox
            key={format.id}
            checked={selectedFormats.includes(format.slug)}
            onChange={() => toggleFormat(format.slug)}
          >
            <span className="font-semibold text-primary">{format.name}</span>
          </FilterCheckbox>
        ))}
      </FilterSection>

      <FilterSection title="Language">
        {languages.map((language) => (
          <FilterCheckbox
            key={language.id}
            checked={selectedLanguages.includes(language.slug)}
            onChange={() => toggleLanguage(language.slug)}
          >
            <span className="font-semibold text-primary">{language.name}</span>
          </FilterCheckbox>
        ))}
      </FilterSection>

      <FilterSection title="Time of Day">
        {timeBands.map((timeBand) => {
          const { title, description } = parseTimeBandLabel(timeBand.label);

          return (
            <FilterCheckbox
              key={timeBand.id}
              checked={selectedBands.includes(timeBand.id)}
              onChange={() => toggleBand(timeBand.id)}
            >
              <span className="font-semibold text-primary">{title}</span>

              {description && (
                <span className="font-normal text-secondary">
                  {" "}
                  · {description}
                </span>
              )}
            </FilterCheckbox>
          );
        })}
      </FilterSection>

      <FilterFooter
        activeFilterCount={activeFilterCount}
        onClear={clearFilters}
      />
    </Card>
  );
};

export default SessionsFilters;
