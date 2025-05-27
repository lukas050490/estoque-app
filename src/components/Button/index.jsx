import { ButtonCentral } from "./styles";



const Button = ({children, ...rest}) => {
    return (
        <ButtonCentral  as="button" {...rest}>{children}</ButtonCentral>
    )
}

export default Button;