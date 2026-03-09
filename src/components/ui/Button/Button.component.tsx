import { forwardRef } from "react"
import "./Button.css"

type ButtonSize = 'symbol' | 'text';
type ButtonTheme = 'primary' | 'secondary';

interface ButtonProps extends Partial<React.ComponentProps<"button">>  {
    children: React.ReactNode
    className?: string;
    size?: ButtonSize;
    theme?: ButtonTheme;
    disabled?:boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    className,
    size='text',
    theme='primary',
    disabled=false,
    ...props
}, ref) => {
    const classes = `btn ${theme} ${size} ${className ?? ''} ${disabled ? "disabled" : ""}`

    return (
        <button
            ref={ref}
            className={classes}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;