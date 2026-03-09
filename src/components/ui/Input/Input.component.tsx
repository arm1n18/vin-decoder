import * as React from "react"
import "./Input.css"

interface InputProps extends Partial<React.ComponentProps<"input">>  {
  className?: string;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, ...props }, ref) => {
    const classes = `input ${className ?? ''} ${disabled ? "disabled" : ""}`

    return (
      <input
        ref={ref}
        className={classes}
        {...props}
      />
    )
  }
)

export default Input