import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import _ from 'clsx'

type MonthPickerPropsType = {
  value: Date
  minValue?: Date
  maxValue?: Date
  onChange: (date: Date) => void
}

function MonthPicker({ value, minValue, maxValue, onChange }: MonthPickerPropsType) {
  const rootRef = useRef<HTMLDivElement>(null)

  const date = useMemo(() => DateTime.fromJSDate(value), [value])
  const minDate = useMemo(() => minValue ? DateTime.fromJSDate(minValue) : null, [minValue])
  const maxDate = useMemo(() => maxValue ? DateTime.fromJSDate(maxValue) : null, [maxValue])

  const [year, setYear] = useState(date.year)
  const [mode, setMode] = useState<'month' | 'year'>('month')

  const firstYear = useMemo(() => year - year % 12, [year])
  const lastYear = useMemo(() => firstYear + 11, [firstYear])
  const canPrevious = useMemo(() => !minDate || (mode === 'month' ? minDate.endOf('year').year < year : minDate.year < firstYear), [year, minDate, firstYear, mode])
  const canNext = useMemo(() => !maxDate || (mode === 'month' ? maxDate.endOf('year').year > year : maxDate.year > lastYear), [year, maxDate, lastYear, mode])

  const handlePrevious = useCallback(() => {
    setYear(y => mode === 'month' ? y - 1 : y - 12)
  }, [mode])

  const handleNext = useCallback(() => {
    setYear(y => mode === 'month' ? y + 1 : y + 12)
  }, [mode])

  const monthNodes = useMemo(() => {
    const nodes: ReactNode[] = []
    const start = DateTime.fromObject({ year, month: 1 })

    for (let i = 0; i < 12; i += 1) {
      const d = start.plus({ months: i })
      const outOfRange = !!minDate && d.diff(minDate, 'months').months < 0 || !!maxDate && d.diff(maxDate, 'months').months > 0

      nodes.push(
        <button
          key={i}
          type="button"
          className={_('px-2 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none text-xs md:text-sm', {
            'text-white bg-blue hover:text-white hover:bg-blue': d.month === date.month && d.year === date.year,
            'text-neutral-400 hover:bg-transparent dark:hover:bg-transparent cursor-not-allowed': outOfRange,
          })}
          onClick={() => onChange(d.toJSDate())}
          disabled={outOfRange}
        >
          {d.monthLong}
        </button>
      )
    }

    return nodes
  }, [year, date, minDate, maxDate, onChange])

  const yearNodes = useMemo(() => {
    const nodes = []

    const start = DateTime.fromObject({ year: firstYear, month: 1 })

    for (let i = 0; i < 12; i += 1) {
      const d = start.plus({ years: i })
      const outOfRange = !!minDate && d.diff(minDate, 'years').years < -1 || !!maxDate && d.diff(maxDate, 'years').years > 0

      nodes.push(
        <button
          key={i}
          type="button"
          className={_('px-2 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none text-sm', {
            'text-white bg-blue hover:text-white hover:bg-blue': d.year === year,
            'text-neutral-400 hover:bg-transparent dark:hover:bg-transparent cursor-not-allowed': outOfRange,
          })}
          onClick={() => {
            setYear(d.year)
            setMode('month')
          }}
          disabled={outOfRange}
        >
          {d.year}
        </button>
      )
    }

    return nodes
  }, [firstYear, year, minDate, maxDate])

  useEffect(() => {
    setYear(date.year)
  }, [date.year])

  return (
    <div
      ref={rootRef}
      className="bg-white flex flex-col border rounded overflow-hidden"
      style={{
        width: rootRef.current?.offsetWidth ?? '100%',
      }}
    >
      <div className="flex justify-between gap-4">
        {canPrevious && (
          <button
            onClick={handlePrevious}
            type="button"
            className="text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none text-sm p-2.5"
          >
            <ChevronLeft width={16} />
          </button>
        )}
        {!canPrevious && (
          <div style={{ width: 36 }} />
        )}
        {mode === 'month' && (
          <button
            onClick={() => setMode('year')}
            type="button"
            className="hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none text-sm p-2.5"
          >
            {year}
          </button>
        )}
        {mode === 'year' && (
          <button
            onClick={() => setMode('month')}
            type="button"
            className=" hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none text-sm p-2.5"
          >
            {firstYear}
            {' '}
            -
            {' '}
            {lastYear}
          </button>
        )}
        {canNext && (
          <button
            onClick={handleNext}
            type="button"
            className="text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none text-sm p-2.5"
          >
            <ChevronRight width={16} />
          </button>
        )}
        {!canNext && (
          <div style={{ width: 36 }} />
        )}
      </div>
      <div className="grid grid-cols-4">
        {mode === 'month' && monthNodes}
        {mode === 'year' && yearNodes}
      </div>
    </div>
  )
}

export default MonthPicker
