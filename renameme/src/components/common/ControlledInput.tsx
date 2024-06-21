import {
  type ChangeEvent,
  type InputHTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

// https://stackoverflow.com/questions/46000544/react-controlled-input-cursor-jumps
function ControlledInput({ autoFocus, value, onChange, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [cursor, setCursor] = useState<number | null>(autoFocus && value?.toString().length || null)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCursor(e.target.selectionStart)
    onChange?.(e)
  }, [onChange])

  useLayoutEffect(() => {
    if (!inputRef.current) return

    inputRef.current.setSelectionRange(cursor, cursor)
  }, [cursor, value])

  return (
    <input
      ref={inputRef}
      autoFocus={autoFocus}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  )
}

export default ControlledInput
