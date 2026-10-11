"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import SearchResultItem from "./SearchResultItem";
import { useSearchMovies } from "../sessions/hooks/useSearchMovies";

import { Icon } from "@/src/components/ui";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: movies = [],
    isLoading,
    isFetching,
    isError,
    isDebouncing,
  } = useSearchMovies(query);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  const isSearching = hasQuery && (isDebouncing || isLoading || isFetching);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClear = () => {
    setQuery("");
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative xl:w-95">
      <div
        className="
          flex h-10 items-center gap-3
          rounded-full border border-white/10
          bg-white/15 px-4 
          transition-colors
          focus-within:border-white/30
        "
      >
        <Icon type="Search" className="size-5 shrink-0 text-primary" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          placeholder="Search films and live events"
          aria-label="Search films and live events"
          aria-expanded={isOpen}
          autoComplete="off"
          className="
            min-w-0 flex-1 bg-transparent
            text-xs text-primary outline-none
            placeholder:text-secondary
          "
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="
              flex size-7 shrink-0 items-center
              justify-center rounded-full
              bg-white/10 text-secondary
              transition-colors hover:text-primary
            "
          >
            <span className="text-lg leading-none">×</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="
            absolute top-full right-0 z-60 mt-2
            w-full min-w-80 overflow-hidden
            rounded-2xl border border-white/5
            bg-page p-5 shadow-2xl
          "
        >
          {!hasQuery ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-card">
                <Icon type="Popcorn" className="size-6 text-primary" />
              </div>

              <h3 className="text-sm font-semibold text-primary">
                What do you want to watch?
              </h3>

              <p className="text-sm text-secondary">Search by movie title</p>

              <Link
                href="/sessions"
                onClick={closeSearch}
                className="mt-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-raised"
              >
                Browse all sessions
              </Link>
            </div>
          ) : isSearching ? (
            <div className="flex min-h-40 items-center justify-center text-sm text-secondary">
              Searching...
            </div>
          ) : isError ? (
            <div className="flex min-h-40 items-center justify-center text-sm text-secondary">
              Unable to search movies. Please try again.
            </div>
          ) : movies.length > 0 ? (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-secondary uppercase">
                  Films & Events
                </span>

                <span className="text-xs text-secondary">
                  {movies.length} {movies.length === 1 ? "result" : "results"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {movies.slice(0, 6).map((movie) => (
                  <SearchResultItem
                    key={movie.id}
                    movie={movie}
                    onSelect={closeSearch}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-card">
                <Icon type="Search" className="size-6 text-primary" />
              </div>

              <h3 className="text-sm font-semibold text-primary">
                No results for &ldquo;{trimmedQuery}&rdquo;
              </h3>

              <p className="text-sm text-secondary">
                Check the spelling or try another film or live event.
              </p>

              <Link
                href="/sessions"
                onClick={closeSearch}
                className="mt-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-raised"
              >
                Browse all sessions
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
