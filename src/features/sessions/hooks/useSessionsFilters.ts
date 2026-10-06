"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type {
  SessionBand,
  SessionFilters,
  SessionSort,
} from "@/src/types/session.types";

const DEFAULT_SORT: SessionSort = "time_asc";

type ArrayFilterKey = "venues" | "formats" | "languages" | "bands";

const getArrayParam = (
  params: URLSearchParams,
  key: ArrayFilterKey,
): string[] => params.getAll(`${key}[]`);

const useSessionsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<SessionFilters>(() => {
    const params = new URLSearchParams(searchParams.toString());
    const page = Number(params.get("page"));

    return {
      date: params.get("date") ?? undefined,
      venues: getArrayParam(params, "venues"),
      formats: getArrayParam(params, "formats"),
      languages: getArrayParam(params, "languages"),
      bands: getArrayParam(params, "bands") as SessionBand[],
      search: params.get("search") ?? undefined,
      sort: (params.get("sort") as SessionSort) || DEFAULT_SORT,
      page: page > 0 ? page : 1,
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (update: (params: URLSearchParams) => void, resetPage = false) => {
      const params = new URLSearchParams(searchParams.toString());

      update(params);

      if (resetPage) {
        params.delete("page");
      }

      const query = params.toString();

      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const setArrayFilter = useCallback(
    (key: ArrayFilterKey, values: string[]) => {
      updateParams((params) => {
        params.delete(`${key}[]`);

        values.forEach((value) => {
          params.append(`${key}[]`, value);
        });
      }, true);
    },
    [updateParams],
  );

  const toggleArrayFilter = useCallback(
    (key: ArrayFilterKey, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = getArrayParam(params, key);

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      setArrayFilter(key, nextValues);
    },
    [searchParams, setArrayFilter],
  );

  const setDate = useCallback(
    (date: string) => {
      updateParams((params) => {
        params.set("date", date);
      }, true);
    },
    [updateParams],
  );

  const setSort = useCallback(
    (sort: SessionSort) => {
      updateParams((params) => {
        if (sort === DEFAULT_SORT) {
          params.delete("sort");
          return;
        }

        params.set("sort", sort);
      }, true);
    },
    [updateParams],
  );

  const setPage = useCallback(
    (page: number) => {
      updateParams((params) => {
        if (page <= 1) {
          params.delete("page");
          return;
        }

        params.set("page", String(page));
      });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    updateParams((params) => {
      const filterKeys: ArrayFilterKey[] = [
        "venues",
        "formats",
        "languages",
        "bands",
      ];

      filterKeys.forEach((key) => {
        params.delete(`${key}[]`);
      });

      params.delete("search");
    }, true);
  }, [updateParams]);

  const activeFilterCount =
    (filters.venues?.length ?? 0) +
    (filters.formats?.length ?? 0) +
    (filters.languages?.length ?? 0) +
    (filters.bands?.length ?? 0) +
    Number(Boolean(filters.search));

  return {
    filters,
    activeFilterCount,

    toggleVenue: (slug: string) => toggleArrayFilter("venues", slug),

    toggleFormat: (slug: string) => toggleArrayFilter("formats", slug),

    toggleLanguage: (slug: string) => toggleArrayFilter("languages", slug),

    toggleBand: (band: SessionBand) => toggleArrayFilter("bands", band),

    setFormats: (formats: string[]) => setArrayFilter("formats", formats),

    setDate,
    setSort,
    setPage,
    clearFilters,
  };
};

export default useSessionsFilters;
